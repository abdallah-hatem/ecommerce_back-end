const { prisma } = require("../../config/prisma");

// Get sizes
async function getAllSizes(req: any, res: any) {
  try {
    const sizes = await prisma.sizes.findMany({});

    if (!sizes) {
      return res.status(404).json({ message: "NO sizes found!" });
    }

    res.status(200).json({ sizes });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Create a size
async function addSize(req: any, res: any) {
  try {
    const { name } = req.body;

    const newSize = await prisma.sizes.create({
      data: {
        name,
      },
    });

    if (!newSize) {
      return res
        .status(401)
        .json({ message: "Size not successfully created database ERROR!" });
    }

    res.status(201).json({ message: "succefully added", data: newSize });
  } catch (error) {
    res.status(401).json({
      message: "Size not successfully created",
      error,
    });
    console.log(error);
  }
}

// Delete size
async function deleteSize(req: any, res: any) {
  const id = Number(req.params.id);

  try {
    const size = await prisma.sizes.delete({ where: { id } });
    if (!size) {
      return res.status(404).send({ message: `no size found with id: ${id}` });
    }

    res.status(200).json({ message: "Size deleted successful", size });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error,
    });
    console.log(error);
  }
}

// Update size
async function updateSize(req: any, res: any) {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const updatedSize = await prisma.sizes.update({
      where: { id },
      data: { name },
    });

    if (!updatedSize) {
      return res
        .status(400)
        .json({ message: "Size not updated, database ERROR!" });
    }

    res.status(200).json({ message: "Size succefully updated", updatedSize });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

module.exports = {
  getAllSizes,
  addSize,
  deleteSize,
  updateSize,
};

export {};
