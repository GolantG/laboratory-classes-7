const { MongoClient } = require("mongodb");
const { DB_USER, DB_PASS } = require("./config");

let database;

async function mongoConnect(callback) {
  const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.qwdfbdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    database = client.db("shop");
    console.log("Connection to the database has been established.");
    callback();
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

function getDatabase() {
  if (!database) {
    throw new Error("No database found.");
  }
  return database;
}

module.exports = { mongoConnect, getDatabase };