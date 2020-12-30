/**
 * DAO Data Access Object layer - functions directly connected to the database are defined, fetch data, save data from and to the database
 *
 */

const { model } = require("mongoose");
const cartSchema = require("./cart.model");

cartSchema.statics = {
  addToCart: (data, cb) => {
    const cart = new CartModel(data);
    cart.save(cb);
  },
  getCart: async (query, cb) => {
    await CartModel.find(query, cb);
  },
  // getByName: async (query, cb) => {
  //   await PriceModel.findOne(query, cb);
  // },
  updateCart: async function(query, updateData, cb) {
    await CartModel.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true },
      cb
    );
  },
  removeFromCart: async function(query, cb) {
    await HerosModel.findOneAndDelete(query, cb);
  }
};

const CartModel = model("Cart", cartSchema);
module.exports = CartModel;
