const { prisma } = require("../../config/prisma");

interface Category {
  name: String;
  desc: String;
  categoryId: number;
}

// Get Categories
async function getAllCategories(req: any, res: any) {
  try {
    const categories = await prisma.category.findMany({
      // include: { products: true },
    });

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

// Delete Category
async function deleteCategory(req: any, res: any) {
  try {
    const id = Number(req.params.id);

    const category = await prisma.category.delete({ where: { id } });

    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not deleted, database ERROR!" });
    }

    res.status(200).json({ message: "Category succefully deleted" });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Update Category
async function updateCategory(req: any, res: any) {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    const UpdatedCategory = await prisma.category.update({
      where: { id },
      data: body,
    });

    if (!UpdatedCategory) {
      return res
        .status(404)
        .json({ message: "Category not deleted, database ERROR!" });
    }

    res.status(200).json({ message: "Category succefully deleted" });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
export {};
