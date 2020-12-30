const { Schema } = require("mongoose");
const cartSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref:'Products',
      required: true
    },

    quantity: {
      type:Number,
      required: true,
    },

    productType: {
      type:String
    },

    price: {
      type: Number,
      required:true
    }
  },
  
  {
    timestamps: true
  }
);

module.exports = cartSchema;
