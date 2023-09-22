const { prisma } = require("../../config/prisma");

export async function validateCartItem(cartItemId: Number, productId: Number) {
  const cartItem = await prisma.cartItem.findMany({
    where: { id: cartItemId, productId },
  });

  return cartItem;
}
