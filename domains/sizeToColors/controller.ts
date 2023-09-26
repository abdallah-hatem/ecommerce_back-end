import { doesProductExists } from "../../lib/products/doesProductExists";
import { validateSizeToColor } from "../../lib/products/validateSizeToColor";
import { doesSizeExists } from "../../lib/sizes/doesSizeExists";

const { prisma } = require("../../config/prisma");

// Get sizeToColors
async function getAllSizesToColors(req: any, res: any) {
  try {
    const sizeToColors = await prisma.sizeToColors.findMany({
      include: {
        // colors: true,
        QtySizeColor: {
          include: { sizeToColor: { include: { size: true, colors: true } } },
        },
      },
    });

    if (!sizeToColors) {
      return res.status(404).json({ message: "No sizeToColors found!" });
    }

    res.status(200).json({ sizeToColors });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Create size to colors
async function addSizeToColors(req: any, res: any) {
  try {
    const { sizeId, colors, productId } = req.body;

    // check if sizeToColor already exists
    const valid = await validateSizeToColor(sizeId, productId);
    if (valid.length > 0) {
      return res.status(401).json({
        message: "already found please update",
      });
    }

    // check if sizeId and porductId are found in the database
    const product = await doesProductExists(productId);
    const size = await doesSizeExists(sizeId);
    if (!(product && size)) {
      return res.status(404).json({
        message: "product or size doesnot exist",
      });
    }
    const newSizeToColors = await prisma.sizeToColors.create({
      data: {
        sizeId,
        productId,
        colors: {
          connect: colors.map((id: number) => ({ id })),
        },
      },
    });

    if (!newSizeToColors) {
      return res.status(401).json({
        message: "Size to colors not successfully created database ERROR!",
      });
    }

    res
      .status(201)
      .json({ message: "succefully added", data: newSizeToColors });
  } catch (error) {
    res.status(401).json({
      message: "Size to colors not successfully created",
      error,
    });
    console.log(error);
  }
}

// Delete size to colors
async function deleteSizetoColors(req: any, res: any) {
  const id = Number(req.params.id);

  try {
    const sizeToColors = await prisma.sizeToColors.delete({ where: { id } });
    if (!sizeToColors) {
      return res
        .status(404)
        .send({ message: `no size to colors found with id: ${id}` });
    }

    res
      .status(200)
      .json({ message: "Size to colors deleted successfully", sizeToColors });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error,
    });
    console.log(error);
  }
}

// Update size to colors
async function updateSizeToColors(req: any, res: any) {
  try {
    const id = Number(req.params.id);
    const { sizeId, colors, productId } = req.body;

    const updatedSizeToColors = await prisma.sizeToColors.update({
      where: { id, sizeId, productId },
      data: { colors: { set: colors.map((id: number) => ({ id })) } },
    });

    if (!updatedSizeToColors) {
      return res
        .status(400)
        .json({ message: "Size to colors not updated, database ERROR!" });
    }

    res.status(200).json({
      message: "Size to colors succefully updated",
      updatedSizeToColors,
    });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

module.exports = {
  getAllSizesToColors,
  addSizeToColors,
  deleteSizetoColors,
  updateSizeToColors,
};

export {};
