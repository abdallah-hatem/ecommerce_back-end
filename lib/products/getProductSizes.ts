const { prisma } = require("../../config/prisma");

export async function getProductSizes(productId: number) {
  const productSizesIds = await prisma.sizeToColors.findMany({
    where: { productId },
  });

  if (!productSizesIds) {
    console.log("Error! in getProductSizes()");
    return false;
  }

  const sizeIds = productSizesIds.map((el: any) => el.sizeId);

  const productSizes = await prisma.sizes.findMany({
    where: {
      id: { in: sizeIds },
    },
  });

  return productSizes;
}
