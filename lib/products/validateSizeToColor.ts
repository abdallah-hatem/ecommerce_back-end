const { prisma } = require("../../config/prisma");

export async function validateSizeToColor(sizeId: number, productId: number) {
  const result = await prisma.sizeToColors.findMany({
    where: {
      productId,
      sizeId,
    },
  });

  return result;
}
