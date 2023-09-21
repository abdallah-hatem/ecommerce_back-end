const { prisma } = require("../../config/prisma");

interface Product {
  name: String;
  desc: String;
  categoryId: number;
}

// Get Products
async function getAllProducts(req: any, res: any) {
  try {
    const products = await prisma.product.findMany({});

    if (!products) {
      return res.status(404).json({ message: "NO products found!" });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.send({ error });
    console.log(error);
  }
}

// Get Paginated Products
async function getPaginatedProducts(req: any, res: any) {
  try {
    const page = Number(req.params.id);
    const items = 10;

    function skips(page: number) {
      if (page === 1) return 0;

      return page * items;
    }

    const products = await prisma.product.findMany({
      skip: skips(page),
      take: items,
    });

    if (!products) {
      return res.status(404).json({ message: "No products found!" });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.send({ error });
    console.log(error);
  }
}

// Get Product by ID
async function getProductById(req: any, res: any) {
  try {
    const productId = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "NO product found!" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.send({ error });
    console.log(error);
  }
}

// Get Product by category ID
async function getProductsByCatId(req: any, res: any) {
  try {
    const categoryId = Number(req.params.id);

    const products = await prisma.product.findMany({
      where: { categoryId },
    });

    if (!products) {
      return res.status(404).json({ message: "NO products found!" });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.send({ error });
    console.log(error);
  }
}

// Create a product
async function createProduct(req: any, res: any) {
  try {
    const { name, price, desc, categoryId, quantity } = req.body;

    if (price <= 0 || quantity <= 0) {
      return res.status(401).json({
        message:
          "ERROR! price or quantity can not be smaller than or equal Zero",
      });
    }

    const newProduct: Product = await prisma.product.create({
      data: { name, price, desc, categoryId, quantity },
    });

    if (!newProduct) {
      return res
        .status(401)
        .json({ message: "Product not successful created database ERROR!" });
    }

    res
      .status(200)
      .json({ message: "Product succefully added", data: newProduct });
  } catch (error) {
    res.status(401).json({
      message: "Product not successfully created",
      error,
    });
    console.log(error);
  }
}

// Delete Product
async function deleteProduct(req: any, res: any) {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.delete({ where: { id } });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not deleted, database ERROR!" });
    }

    res.status(200).json({ message: "Product succefully deleted" });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

// Update Product
async function updateProduct(req: any, res: any) {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: body,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not updated, database ERROR!" });
    }

    res.status(200).json({ message: "Product succefully updated" });
  } catch (error) {
    res.send({ message: error });
    console.log(error);
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getProductsByCatId,
  getPaginatedProducts,
};
export {};
