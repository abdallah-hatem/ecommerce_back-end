import User from "../../lib/user/interfaces";
const { isUserRegistered } = require("../../lib/user/isUserRegistered");
const bcrypt = require("bcrypt");
const { prisma } = require("../../config/prisma");
const jwt = require("jsonwebtoken");

// Get Products
async function getAllProducts(req: any, res: any) {
  try {
    const products = await prisma.product.findMany({});

    if (!products) {
      return res.status(404).json({ message: "NO products found!" });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.send({ message: error });
  }
}

// Create a product
async function createProduct(req: any, res: any) {
  try {
    const { name, desc, category } = req.body;

    // find if product already exists
    // const user = await isUserRegistered(email);
    // if (user) {
    //   return res.status(409).json({ message: "User already exists" });
    // }

    const newProduct: User = await prisma.user.create({
      data: { name, desc, category },
    });

    if (!newProduct) {
      return res
        .status(401)
        .json({ message: "Product not successful created database ERROR!" });
    }

    res
      .status(201)
      .json({ message: "Product succefully added", data: newProduct });
  } catch (error) {
    res.status(401).json({
      message: "Product not successful created",
      error,
    });
    console.log(error);
  }
}

// Login
async function login(req: any, res: any) {
  const { email, password } = req.body;
  try {
    // find if email already exists
    const user = await isUserRegistered(email);
    if (!user) {
      return res.status(404).send("Error user not found. Please Signup");
    }

    // check if password is accurate
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // create token
    const { id, name } = await user;
    const maxAge = 3 * 60 * 60; // 3hrs

    const token = jwt.sign({ id, name }, process.env.TOKEN_SECRET, {
      expiresIn: maxAge,
    });

    req.session.jwt = token;

    res.status(200).json({ message: "Login successful", user: id });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error,
    });
    console.log(error);
  }
}

// Delete user
async function deleteUser(req: any, res: any) {
  const id = Number(req.params.id);

  // NOT DONE YET:  check if logged in

  try {
    const user = await prisma.user.delete({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: `no user found with id: ${id}` });
    }

    res.status(200).json({ message: "User deleted successful", user });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error,
    });
    console.log(error);
  }
}

async function getUserById(req: any, res: any) {
  const id = req.params.id;

  // NOT DONE YET:  check if logged in

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: `no user found with id: ${id}` });
    }

    res.status(200).json({ message: "Success", user });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error,
    });
    console.log(error);
  }
}

async function getCookie(req: any, res: any) {
  try {
    const cookie = req.session.jwt;

    res.status(200).json({ message: "cookie sent successfully", cookie });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  login,
  deleteUser,
  getUserById,
  getCookie,
};
