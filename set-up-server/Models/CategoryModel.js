import mongoose from "mongoose";

const categotySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categotySchema);

export default Category;
