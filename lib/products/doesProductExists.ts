const { prisma } = require("../../config/prisma");

export async function doesProductExists(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
}
