import mongoose from "mongoose";
import AutoIncrement from 'mongoose-sequence';

const orderSchema = mongoose.Schema(
  {
    billNumber: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItem: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        images: [String],
        price: { type: Number, required: true },
        pricePure: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Paypal",
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    voucher: {
      type: Number,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    priceBill: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    watched: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(AutoIncrement(mongoose), {
  inc_field: 'billNumber',
  start_seq: 10001,
});

const Order = mongoose.model("Order", orderSchema, "Order");

Order.syncIndexes();

export default Order;