const { prisma } = require("../../config/prisma");

export async function checkCartItem(cartItemId: Number, productId: Number) {
  const cartItem = await prisma.cartItem.findMany({
    where: { id: cartItemId, productId },
  });

  return cartItem;
}
