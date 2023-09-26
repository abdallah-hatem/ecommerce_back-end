const { prisma } = require("../../config/prisma");

export async function getProductQty(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },

    include: { QtySizeColor: true },
  });

  let sum = 0;

  const quantity = product.QtySizeColor.forEach(
    (el: any) => (sum += el.quantity)
  );

  return sum;
}
