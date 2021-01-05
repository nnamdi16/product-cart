/**
 * DAO Data Access Object layer - functions directly connected to the database are defined, fetch data, save data from and to the database
 *
 */

const { model } = require("mongoose");
const priceSchema = require("./price.model");

priceSchema.statics = {
  createPrice: (data, cb) => {
    const productPrice = new PriceModel(data);
    productPrice.save(cb);
  },
  getPriceById: async (query, cb) => {
    return await PriceModel.findById(query).exec();
  },
  // getByName: async (query, cb) => {
  //   await PriceModel.findOne(query, cb);
  // },
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

const PriceModel = model("Price", priceSchema);
module.exports = PriceModel;
