const { isUserRegistered } = require("../../lib/user/isUserRegistered");
const bcrypt = require("bcrypt");
const { prisma } = require("../../config/prisma");
const jwt = require("jsonwebtoken");

interface Product {
  name: String;
  desc: String;
  categoryId: number;
}

// Get Products
async function getAllProducts(req: any, res: any) {
  try {
    const products = await prisma.product.findMany({});

    if (!products) {
      return res.status(404).json({ message: "NO products found!" });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.send({ error });
    console.log(error);
  }
}

// Create a product
async function createProduct(req: any, res: any) {
  try {
    const { name, desc, categoryId } = req.body;

    // find if product already exists
    // const user = await isUserRegistered(email);
    // if (user) {
    //   return res.status(409).json({ message: "User already exists" });
    // }

    const newProduct: Product = await prisma.product.create({
      data: { name, desc, categoryId },
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
      message: "Product not successfully created",
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

module.exports = {
  getAllProducts,
  createProduct,
  deleteUser,
};
export {};
