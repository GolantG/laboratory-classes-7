const Product = require("./Product");
const { getDatabase } = require("../database");
const COLLECTION_NAME = "carts";

class Cart {
  constructor(userId) {
    this.userId = userId;
  }

  static async add(productName) {
    const db = getDatabase();

    const product = await Product.findByName(productName);
    if (!product) {
      console.error(`Product '${productName}' not found.`);
    }

    const existingItem = await db.collection(COLLECTION_NAME).findOne({ productName });
    if (existingItem) {
      await db.collection(COLLECTION_NAME)
        .updateOne(
          { productName },
          { $inc: { quantity: 1 } }
        );
    }else {
      await db.collection(COLLECTION_NAME)
        .insertOne({
          productName,
          product,
          quantity: 1
        });
    }
  }

  static async getItems() {
    const db = getDatabase();
    return await db.collection(COLLECTION_NAME)
      .find()
      .toArray();
  }

  static async getProductsQuantity() {
    const items = await this.getItems();

    return items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  static async getTotalPrice() {
    const items = await this.getItems();

    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  static async clearCart() {
    const db = getDatabase();
    await db.collection(COLLECTION_NAME).deleteMany({});
  }
}

module.exports = Cart;
