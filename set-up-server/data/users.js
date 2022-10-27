import brcypt from "bcryptjs";
const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: brcypt.hashSync("123456", 10),
    isAdmin: true,
    avatar: "favicon.png",
    address: "24 trần cao vân,thanh khê,đà nẵng",
  },
  {
    name: "User",
    email: "User@gmail.com",
    password: brcypt.hashSync("123456", 10),
    avatar: "img01.png",
    address: "24 trần cao vân,thanh khê,đà nẵng",
  },
  {
    name: "User1",
    email: "User@gmail.com",
    password: brcypt.hashSync("123456", 10),
    avatar: "img01.png",
    address: "24 trần cao vân,thanh khê,đà nẵng",
  },
  {
    name: "User21",
    email: "User@gmail.com",
    password: brcypt.hashSync("123456", 10),
    avatar: "img01.png",
    address: "24 trần cao vân,thanh khê,đà nẵng",
  },
  {
    name: "letatchinh",
    email: "letatchinh123@gmail.com",
    password: brcypt.hashSync("123456", 10),
    avatar: "img01.png",
    address: "24 trần cao vân,thanh khê,đà nẵng",
  },
];

export default users;
