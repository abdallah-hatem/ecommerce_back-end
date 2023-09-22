const { prisma } = require("../../config/prisma");

// Get colors
async function getAllColors(req: any, res: any) {
  try {
    const colors = await prisma.colors.findMany({});

    if (!colors) {
      return res.status(404).json({ message: "NO colors found!" });
    }

    res.status(200).json({ colors });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Create a color
async function addColor(req: any, res: any) {
  try {
    const { name, hex } = req.body;

    const newColor = await prisma.colors.create({
      data: {
        name,
        hex,
      },
    });

    if (!newColor) {
      return res
        .status(401)
        .json({ message: "Color not successfully created database ERROR!" });
    }

    res.status(201).json({ message: "succefully added", data: newColor });
  } catch (error) {
    res.status(401).json({
      message: "Color not successfully created",
      error,
    });
    console.log(error);
  }
}

// Delete color
async function deleteColor(req: any, res: any) {
  const id = Number(req.params.id);

  try {
    const color = await prisma.colors.delete({ where: { id } });
    if (!color) {
      return res.status(404).send({ message: `no color found with id: ${id}` });
    }

    res.status(200).json({ message: "Color deleted successful", color });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error,
    });
    console.log(error);
  }
}

// Update color
async function updateColor(req: any, res: any) {
  try {
    const id = Number(req.params.id);
    const { hex, name } = req.body;

    const updatedColor = await prisma.colors.update({
      where: { id },
      data: { hex, name },
    });

    if (!updatedColor) {
      return res
        .status(400)
        .json({ message: "Color not updated, database ERROR!" });
    }

    res.status(200).json({ message: "Color succefully updated", updatedColor });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

module.exports = {
  getAllColors,
  addColor,
  deleteColor,
  updateColor,
};

export {};
