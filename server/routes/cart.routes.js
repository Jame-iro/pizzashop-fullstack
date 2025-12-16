const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authenticate = require("../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get current user's cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Cart with items }
 */
router.use(authenticate);

router.get("/cart", cartController.getCart);
router.post("/cart/add", cartController.addToCart);
router.put("/cart/item/:itemId", cartController.updateCartItem);
router.delete("/cart/item/:itemId", cartController.removeFromCart);
router.delete("/cart/clear", cartController.clearCart);

module.exports = router;
