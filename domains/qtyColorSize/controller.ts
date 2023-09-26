const { prisma } = require("../../config/prisma");

// Get All QtyColorSizes
async function getAllQtyColorSizes(req: any, res: any) {
  try {
    const quantity = await prisma.qtySizeColor.findMany({
      include: { size: true, color: true },
    });

    if (!quantity) {
      return res.status(404).json({ message: "NO quantity found!" });
    }

    res.status(200).json({ quantity });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Create a size
async function addQtySizeColor(req: any, res: any) {
  try {
    const { colorsId, sizesId, quantity, productId } = req.body;

    // check if already found
    const qty = await prisma.QtySizeColor.findMany({
      where: {
        productId,
        colorsId,
        sizesId,
      },
    });

    if (qty.length > 0) {
      return res
        .status(401)
        .json({ message: "Error, already found please update" });
    }

    const newQuantity = await prisma.QtySizeColor.create({
      data: {
        productId,
        colorsId,
        sizesId,
        quantity,
      },
    });

    if (!newQuantity) {
      return res
        .status(401)
        .json({ message: "Quantity not successfully created database ERROR!" });
    }

    res.status(201).json({ message: "succefully added", data: newQuantity });
  } catch (error) {
    res.status(401).json({
      message: "Quantity not successfully created",
      error,
    });
    console.log(error);
  }
}

// // Delete size
// async function deleteSize(req: any, res: any) {
//   const id = Number(req.params.id);

//   try {
//     const size = await prisma.sizes.delete({ where: { id } });
//     if (!size) {
//       return res.status(404).send({ message: `no size found with id: ${id}` });
//     }

//     res.status(200).json({ message: "Size deleted successful", size });
//   } catch (error) {
//     res.status(400).json({
//       message: "An error occurred",
//       error,
//     });
//     console.log(error);
//   }
// }

// // Update size
// async function updateSize(req: any, res: any) {
//   try {
//     const id = Number(req.params.id);
//     const { name } = req.body;

//     const updatedSize = await prisma.sizes.update({
//       where: { id },
//       data: { name },
//     });

//     if (!updatedSize) {
//       return res
//         .status(400)
//         .json({ message: "Size not updated, database ERROR!" });
//     }

//     res.status(200).json({ message: "Size succefully updated", updatedSize });
//   } catch (error) {
//     res.send({ message: error });
//     console.log(error);
//   }
// }

module.exports = {
  getAllQtyColorSizes,
  addQtySizeColor,
  // deleteSize,
  // updateSize,
};

export {};
