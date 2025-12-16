const { Cart, CartItem, Product } = require("../models");

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      where: { user_id: req.user.id },
      include: [
        {
          model: CartItem,
          as: "items",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });

    if (!cart) {
      cart = await Cart.create({ user_id: req.user.id });
    }

    res.status(200).send(cart);
  } catch (error) {
    console.error("getCart error:", error);
    res.status(500).send(error.message);
  }
};

exports.addToCart = async (req, res) => {
  const { product_id, quantity = 1 } = req.body;

  try {
    if (!product_id) return res.status(400).send("product_id is required");

    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).send("Product not found");

    let cart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (!cart) cart = await Cart.create({ user_id: req.user.id });

    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_id },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cart_id: cart.id,
        product_id,
        quantity,
        price_at_add: product.price,
      });
    }

    const updatedCart = await Cart.findByPk(cart.id, {
      include: [
        {
          model: CartItem,
          as: "items",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });

    res.status(200).send(updatedCart);
  } catch (error) {
    console.error("addToCart error:", error);
    res.status(500).send(error.message);
  }
};

exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  try {
    const cartItem = await CartItem.findOne({
      where: { id: itemId },
      include: [{ model: Cart, as: "cart", where: { user_id: req.user.id } }],
    });

    if (!cartItem) return res.status(404).send("Item not found in your cart");

    if (quantity <= 0) {
      await cartItem.destroy();
    } else {
      cartItem.quantity = quantity;
      await cartItem.save();
    }

    const cart = await Cart.findOne({
      where: { user_id: req.user.id },
      include: [
        {
          model: CartItem,
          as: "items",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });

    res.status(200).send(cart || { items: [] });
  } catch (error) {
    console.error("updateCartItem error:", error);
    res.status(500).send(error.message);
  }
};

exports.removeFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cartItem = await CartItem.findOne({
      where: { id: itemId },
      include: [{ model: Cart, as: "cart", where: { user_id: req.user.id } }],
    });

    if (!cartItem) return res.status(404).send("Item not found");

    await cartItem.destroy();

    const cart = await Cart.findOne({
      where: { user_id: req.user.id },
      include: [
        {
          model: CartItem,
          as: "items",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });

    res.status(200).send(cart || { items: [] });
  } catch (error) {
    console.error("removeFromCart error:", error);
    res.status(500).send(error.message);
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (cart) {
      await CartItem.destroy({ where: { cart_id: cart.id } });
    }
    res.status(200).send({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
