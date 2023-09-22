const { prisma } = require("../../config/prisma");

export async function doesSizeExists(id: number) {
  const product = await prisma.sizes.findUnique({
    where: {
      id,
    },
  });

  return product;
}
