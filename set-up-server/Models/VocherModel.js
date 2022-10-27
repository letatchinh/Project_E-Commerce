import mongoose from "mongoose";
const voucherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model("Voucher", voucherSchema);

export default Voucher;
