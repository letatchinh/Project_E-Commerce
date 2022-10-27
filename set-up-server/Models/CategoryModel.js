import mongoose from "mongoose";

const categotySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a category Name"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categotySchema);

export default Category;
