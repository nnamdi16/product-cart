/**
 * DAO Data Access Object layer - functions directly connected to the database are defined, fetch data, save data from and to the database
 *
 */

const { model } = require("mongoose");
const productSchema = require("./products.model");
const priceSchema = require("../price/price.model");
const PriceModel = require("../price/price.dao");

productSchema.statics = {
  createProduct: async (data, cb) => {
    let products = new ProductModel(data);
    const {_id} = products;
    const{price}  = data;
    const newPrice = new PriceModel({productId:_id, amount:price})
    const {_id:priceId} = newPrice;
    products["priceId"] = priceId;
    await Promise.all([newPrice.save(),products.save(cb)])
  },
  getProducts: async (query, cb) => {
    return await ProductModel.find(query, cb);
  },
  getProductByName: async (query, cb) => {
    return await ProductModel.findOne(query, cb);
  },

  getProductById: async (query, cb) => {
    try {
      return await ProductModel.findById(query).exec();
    } catch (error) {
      console.log(error);
    }
  },
  // update: async function(query, updateData, cb) {
  //   await HerosModel.findOneAndUpdate(
  //     query,
  //     { $set: updateData },
  //     { new: true },
  //     cb
  //   );
  // },
  // delete: async function(query, cb) {
  //   await HerosModel.findOneAndDelete(query, cb);
  // }
};

const ProductModel = model("Products", productSchema);
module.exports = ProductModel;
