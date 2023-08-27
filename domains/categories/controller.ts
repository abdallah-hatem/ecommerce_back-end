const { prisma } = require("../../config/prisma");

interface Category {
  name: String;
  desc: String;
  categoryId: number;
}

// Get Products
async function getAllCategories(req: any, res: any) {
  try {
    const categories = await prisma.category.findMany({});

    if (!categories) {
      return res.status(404).json({ message: "NO categories found!" });
    }

    res.status(200).json({ categories });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Create Category
async function createCategory(req: any, res: any) {
  try {
    const { name, desc } = req.body;

    const newCategory = await prisma.category.create({ data: { name, desc } });

    if (!newCategory) {
      return res
        .status(404)
        .json({ message: "Category not successful created database ERROR!" });
    }

    res
      .status(200)
      .json({ message: "Category succefully added", data: newCategory });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

module.exports = {
  getAllCategories,
  createCategory,
};
export {};
