import mongoose from "mongoose";
const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const Carts = mongoose.model("Carts", cartSchema);

export default Carts;
