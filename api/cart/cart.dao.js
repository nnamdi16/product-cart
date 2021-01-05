/**
 * DAO Data Access Object layer - functions directly connected to the database are defined, fetch data, save data from and to the database
 *
 */

const { model } = require("mongoose");
const cartSchema = require("./cart.model");
const {getProductById} = require('../products/products.dao');
const {getPriceById} = require('../price/price.dao');

cartSchema.statics = {
  
  addToCart: async (data, cb) => {
   try {
    const { productId, quantity }  = data;
    const product = await getProductById(productId);
    if (product) {
      const {quantityInStock,priceId} = product;
      const priceDetails = await getPriceById(priceId);
      const {amount} = priceDetails;
      console.log(amount);
      const quantityAvailable = quantityInStock - quantity;
      console.log(quantityAvailable);
      const price = amount * quantity
      const cart = new CartModel(data);
      cart["price"] = price;
      return await cart.save(cb);
    }

    return {
      error: true
    }
   } catch (error) {
     throw new Error(error);
   }
   
  },

  getCart: async (query, cb) => {
    await CartModel.find(query, cb);
  },
  // getByName: async (query, cb) => {
  //   await PriceModel.findOne(query, cb);
  // },
  updateCart: async function(query, updateData, state, cb) {
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
