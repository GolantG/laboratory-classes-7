const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (request, response) => {
  await Product.add(request.body);
  await Cart.add(request.body.name);

  response.status(STATUS_CODE.FOUND).redirect("/products/new");
};

exports.getProductsCount = () => {
  return Cart.getProductsQuantity();
};
