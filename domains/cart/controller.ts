const { prisma } = require("../../config/prisma");
const {
  isCartAlreadyAvailable,
} = require("../../lib/cart/isCartAlreadyAvailable");

interface Cart {
  name: String;
  desc: String;
}

// Get All Carts
async function getAllCarts(req: any, res: any) {
  try {
    const carts = await prisma.cart.findMany({
      include: { products: true },
    });

    // check if user already has a cart --not implemeted yet--

    if (!carts) {
      return res.status(404).json({ message: "NO carts found!" });
    }

    res.status(200).json({ carts });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Add Cart
async function createCart(req: any, res: any) {
  try {
    const userId = Number(1);

    const { productId } = req.body;

    if (await isCartAlreadyAvailable(userId)) {
      return res.status(400).json({
        message: "User already has a cart created !",
      });
    }

    const newCart = await prisma.cart.create({
      data: {
        userId,
        products: {
          connect: {
            id: productId,
          },
        },
      },
    });

    if (!newCart) {
      return res
        .status(404)
        .json({ message: "Cart not succefully created, database ERROR!" });
    }

    res.status(200).json({ message: "Cart succefully added", data: newCart });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Update Cart
async function updateCart(req: any, res: any) {
  try {
    const cartId = Number(req.params.id);
    // const cartId = Number(1);

    const { productId } = req.body;

    const newCart = await prisma.cart.update({
      where: { id: cartId },
      data: {
        products: {
          connect: {
            id: productId,
          },
        },
      },
    });

    if (!newCart) {
      return res
        .status(404)
        .json({ message: "Cart not succefully created, database ERROR!" });
    }

    res.status(200).json({ message: "Cart succefully added", data: newCart });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Delete Cart
async function deleteCart(req: any, res: any) {
  try {
    const cartId = Number(req.params.id);

    const { productId } = req.body;

    const cart = await prisma.cart.delete({
      where: { id: cartId },
    });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not succefully deleted, database ERROR!" });
    }

    res.status(200).json({ message: "Cart succefully deleted" });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

module.exports = { getAllCarts, createCart, updateCart, deleteCart };

export {};
