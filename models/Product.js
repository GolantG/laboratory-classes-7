const { getDatabase } = require("../database");
const COLLECTION_NAME = "products";

class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  static async getAll() {
    const db = getDatabase();
    return await db.collection(COLLECTION_NAME)
      .find()
      .toArray()
      .catch((error) => console.log(error));
  }

  static async add(product) {
    const db = getDatabase();
    db.collection(COLLECTION_NAME)
      .insertOne(product)
      .catch((error) => console.log(error));
  }

  static async findByName(name) {
    const db = getDatabase();
    return await db.collection(COLLECTION_NAME)
      .findOne({ name: name })
      .catch((error) => console.log(error));
  }

  static async deleteByName(name) {
    const db = getDatabase();
    return await db.collection(COLLECTION_NAME)
      .deleteOne({ name: name })
      .catch((error) => console.log(error));
  }

  static async getLast() {
    const db = getDatabase();
    const lastProduct = await db
      .collection(COLLECTION_NAME)
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray()
      .catch((error) => console.log(error));
    return lastProduct[0];
  }
}

module.exports = Product;
