import brcypt from "bcryptjs";
const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: brcypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "User",
    email: "User@gmail.com",
    password: brcypt.hashSync("123456", 10),
  },
  {
    name: "User1",
    email: "User@gmail.com",
    password: brcypt.hashSync("123456", 10),
  },
  {
    name: "User21",
    email: "User@gmail.com",
    password: brcypt.hashSync("123456", 10),
  },
  {
    name: "letatchinh",
    email: "letatchinh123@gmail.com",
    password: brcypt.hashSync("123456", 10),
  }
];

export default users;
