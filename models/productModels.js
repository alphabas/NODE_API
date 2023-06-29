const mongoose = require("mongoose");

const productSchemas = mongoose.Schema(
  {
    designation: {
      type: String,
      required: [true, "Please enter a product designation"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchemas);
module.exports = Product;
