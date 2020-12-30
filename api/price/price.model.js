const { Schema } = require("mongoose");
const priceSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref:'Products',
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    discount: {
      type: Number,
    }
  },
  {
    timestamps: true
  }
);

module.exports = priceSchema;
