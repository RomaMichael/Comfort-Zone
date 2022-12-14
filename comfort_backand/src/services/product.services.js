const { Product } = require("../model/product.model");
const uuid4 = require("uuid4");
const {
  uploadProductPic,
  deleteFile,
} = require("../services/cloudinary.services");

const getData = async () => {
  const products = await Product.find();
  return products;
};

const createProduct = async (product, file) => {
  try {
    let avatar = { url: "placeholder" };
    if (file) {
      avatar = await uploadProductPic(file, uuid4(), "products");
    }
    const newProduct = new Product({ ...product, img: avatar.url });
    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (id, product) => {
  console.log(product);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    return updatedProduct;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    await deleteFile(deletedProduct.img);

    if (!deletedProduct) {
    }

    return deletedProduct;
  } catch (error) {
    console.log(error);
  }
};

const getOneProduct = async (id) => {
  try {
    const oneProduct = await Product.findById(id);

    return oneProduct;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getData,
  createProduct,
  deleteProduct,
  updateProduct,
  getOneProduct,
};
