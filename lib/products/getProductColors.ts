const { prisma } = require("../../config/prisma");

export async function getProductColors(productId: number) {
  const productColorIds = await prisma.QtySizeColor.findMany({
    where: { productId },
  });

  let colorIds: any = [];

  const data = productColorIds.forEach((el: any) => {
    !colorIds.includes(el.colorsId) && colorIds.push(el.colorsId);
  });
  const productColors = await prisma.colors.findMany({
    where: {
      id: { in: colorIds },
    },
  });

  return productColors;
}
