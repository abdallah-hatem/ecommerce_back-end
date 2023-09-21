const { prisma } = require("../../config/prisma");

export async function isProductFoundInCart(cartId: Number, productId: Number) {
  const product = await prisma.cartItem.findMany({
    where: { cartId, productId },
  });

  return product;
}
