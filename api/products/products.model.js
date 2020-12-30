const { Schema } = require("mongoose");
const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true
    },

    productPictureUrl: {
      type:String,
      unique:false,
      required:true
    },

    productTypes: {
      type:[String],
      required:true

    },
    productCategoryId: {
      type:Schema.Types.ObjectId,
      ref:'ProductCategory'
    },

    quantityInStock: {
      type:Number,
      required:true
    },

    ratings: {
      type:Number,
      required:true,

    },

    description: {
      type: [String],
      unique: false,
      required:false
    },

    priceId: {
      type: Schema.Types.ObjectId,
      required:true
    }
  },
  {
    timestamps: true
  }
);

module.exports = productSchema;
