const { prisma } = require("../../config/prisma");

export async function isCartAlreadyAvailable(id: Number) {
  const cart = await prisma.cart.findMany({
    where: { userId: id },
  });

  return cart.length > 0;
}
