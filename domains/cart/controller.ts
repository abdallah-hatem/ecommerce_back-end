const { isProductFoundInCart } = require("../../lib/cart/isProductFoundInCart");
const { validateCartItem } = require("../../lib/cart/validateCartItem");
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
      include: { cartItem: true },
    });

    if (!carts) {
      return res.status(404).json({ message: "NO carts found!" });
    }

    res.status(200).json({ carts });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Get Cart by ID
async function getCartByUserId(req: any, res: any) {
  try {
    const id = Number(req.params.id);

    const cart = await prisma.cart.findMany({
      where: { userId: id },
      include: {
        cartItem: { include: { size: true, product: true, color: true } },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "NO cart found!" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Add Cart
async function createCart(req: any, res: any) {
  try {
    const userId = Number(req.params.id);

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

    const { productId, quantity, cartItemId } = req.body;

    const newProduct = await isProductFoundInCart(cartId, productId);
    if (newProduct.length > 0) {
      const totalQty = quantity + newProduct[0].quantity;

      // check if cartItemId and productId in the same cartItem
      const check = await validateCartItem(cartItemId, productId);
      if (check.length > 0) {
        const newCartItem = await prisma.cartItem.update({
          where: { id: cartItemId },
          data: {
            quantity: totalQty,
          },
        });

        const newCart = await prisma.cart.update({
          where: { id: cartId },
          data: {
            cartItem: {
              connect: {
                id: newCartItem.id,
              },
            },
          },
        });

        if (!newCart) {
          return res
            .status(404)
            .json({ message: "Cart not succefully created, database ERROR!" });
        }

        return res
          .status(200)
          .json({ message: "Cart succefully updated", data: newCart });
      }
      return res
        .status(404)
        .json({ message: "Cart not succefully created, database ERROR!" });
    }

    const newCartItem = await prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });

    const newCart = await prisma.cart.update({
      where: { id: cartId },
      data: {
        cartItem: {
          connect: {
            id: newCartItem.id,
          },
        },
      },
    });

    if (!newCart) {
      return res
        .status(404)
        .json({ message: "Cart not succefully created, database ERROR!" });
    }

    res
      .status(200)
      .json({ message: "Cart succefully updated", data: "newCart" });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Delete Cart
async function emptyCart(req: any, res: any) {
  try {
    const cartId = Number(req.params.id);

    const cart = await prisma.cartItem.deleteMany({
      where: { cartId },
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

// Add to cart
async function addToCart(req: any, res: any) {
  const cartId = Number(req.params.id);

  const { productId, quantity, cartItemId, sizesId, colorsId } = req.body;

  // check cartItems contains productId
  const newProduct = await isProductFoundInCart(cartId, productId);

  // if product is not in cart
  if (!(newProduct.length > 0)) {
    // add new cartItem to cartItems in Cart

    const newCartItem = await prisma.cartItem.create({
      data: {
        productId,
        quantity,
        sizesId,
        colorsId,
        cartId,
      },
    });

    const updatedCart = await prisma.cart.update({
      where: { id: cartId },
      data: {
        cartItem: {
          connect: {
            id: newCartItem.id,
          },
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Cart item succefully added", data: newCartItem });
  }

  // if product already in cart

  // check if cartItemId and productId are in the same cartItem
  const check = await validateCartItem(cartItemId, productId);
  if (!(check.length > 0)) {
    return res
      .status(400)
      .json({ message: "ERROR! cartItemId or productId is wrong" });
  }
  const totalQty = quantity + newProduct[0].quantity;

  const updateCartItem = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: {
      productId,
      quantity: totalQty,
    },
  });

  if (!updateCartItem) {
    return res
      .status(400)
      .json({ message: "Cart not succefully updated, database ERROR!" });
  }

  res
    .status(200)
    .json({ message: "Cart item succefully updated", data: updateCartItem });
}

module.exports = {
  getAllCarts,
  createCart,
  updateCart,
  emptyCart,
  getCartByUserId,
  addToCart,
};

export {};
