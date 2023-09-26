const { prisma } = require("../../config/prisma");

export async function getProductSizes(productId: number) {
  const productSizesIds = await prisma.QtySizeColor.findMany({
    where: { productId },
  });

  let sizesIds: any = [];

  const data = productSizesIds.forEach((el: any) => {
    !sizesIds.includes(el.sizesId) && sizesIds.push(el.sizesId);
  });
  const productSizes = await prisma.sizes.findMany({
    where: {
      id: { in: sizesIds },
    },
  });

  return productSizes;
}
