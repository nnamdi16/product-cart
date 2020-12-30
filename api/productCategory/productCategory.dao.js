/**
 * DAO Data Access Object layer - functions directly connected to the database are defined, fetch data, save data from and to the database
 *
 */

const { model } = require("mongoose");
const productCategorySchema = require("./productCategory.model");

productCategorySchema.statics = {
  createProductCategory: (data, cb) => {
    const hero = new ProductCategoryModel(data);
    hero.save(cb);
  },
  getProductCategory: async (query, cb) => {
    await ProductCategoryModel.find(query, cb);
  },
  getProductCategoryByName: async (query, cb) => {
    await ProductCategoryModel.findOne(query, cb);
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

const ProductCategoryModel = model("ProductCategory", productCategorySchema);
module.exports = ProductCategoryModel;
