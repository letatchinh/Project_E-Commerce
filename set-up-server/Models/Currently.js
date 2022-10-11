import mongoose from "mongoose";

const currentlySchema = mongoose.Schema(
  {
    monetaryUnit: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Currently = mongoose.model("Currently", currentlySchema);

export default Currently;
