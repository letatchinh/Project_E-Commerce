import express from "express";
import asyncHandler from "express-async-handler";
import Voucher from "../Models/VocherModel.js";
const VoucherRoutes = express.Router();
//GET ALL Voucher
VoucherRoutes.get(
  "/all",
  asyncHandler(async (req, res) => {
try {
  const voucher = await Voucher.find({})
  res.json(voucher);
} catch (error) {
  throw new Error("Not found Voucher")
}
  })
);
VoucherRoutes.get(
    "/filterId/:id",
    asyncHandler(async (req,res) => {
        try {
            const voucher = await Voucher.findById(req.params.id)
            res.json(voucher)
        } catch (error) {
            throw new Error("Not found Voucher")
        }
    })
)
export default VoucherRoutes