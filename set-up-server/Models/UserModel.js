import mongoose from "mongoose";
import brcypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    avatar: {
      type: String,
      require: true,
      default: "favicon.png",
    },
    address: {
      type: String,
      require: true,
    },
    listVoucher: [
      {
        voucher: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "Voucher",
        },
      },
    ],
    active: {
      type: Boolean,
      require: true,
      default: true,
    },
    phone: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//Login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await brcypt.compare(enterPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
