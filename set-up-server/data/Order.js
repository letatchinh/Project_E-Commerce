const orders = [
  {
    shippingAddress: {
      address: "64 trần cao vân,Tam Thuận,Thanh Khê,Đà Nẵng",
      city: "aa",
      postalCode: "POX : 12233",
      country: "aaa",
    },
    user: {
      _id: "634faf322c7dfdb4c9ee54ab",
      name: "chinh",
      email: "test4@gmail.com",
    },
    orderItem: [
      {
        name: "quan cua chinh",
        qty: 1,
        images: ["img01.png", "img02.png", "img03.png"],
        price: 0.99,
        product: "634e6650d26b0015d0cddaf2",
        _id: "634fc50e10abe9e8300a15eb",
      },
      {
        name: "quan1",
        qty: 1,
        images: ["img02.png", "img03.png", "img04.png"],
        price: 1.78,
        product: "634e76b685e7cad490162631",
        _id: "634fc50e10abe9e8300a15ec",
      },
    ],
    paymentMethod: "shipCod",
    taxPrice: 10,
    shippingPrice: 7.7,
    totalPrice: 10.47,
    isPaid: false,
    isDelivered: false,
    watched: true,
    createdAt: "2022-10-19T09:36:14.276Z",
    updatedAt: "2022-10-19T10:30:30.348Z",
    __v: 0,
    read: true,
    deliveredAt: "2022-10-19T10:30:30.327Z",
  },
];

export default orders;
