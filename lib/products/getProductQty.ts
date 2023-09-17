const { prisma } = require("../../config/prisma");

export async function getProductQty(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  const { quantity } = product;

  return quantity;
}
