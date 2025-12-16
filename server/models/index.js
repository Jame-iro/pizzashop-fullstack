const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user.model")(sequelize, Sequelize);
const Category = require("./category.model")(sequelize, Sequelize);
const Product = require("./product.model")(sequelize, Sequelize);
const Event = require("./event.model")(sequelize, Sequelize);
const Cart = require("./cart.model")(sequelize, Sequelize);
const CartItem = require("./cartItem.model")(sequelize, Sequelize);

User.associate(sequelize.models);
Category.associate(sequelize.models);
Product.associate(sequelize.models);
Event.associate(sequelize.models);
Cart.associate(sequelize.models);
CartItem.associate(sequelize.models);

module.exports = { User, Category, Product, Event, Cart, CartItem, sequelize };
