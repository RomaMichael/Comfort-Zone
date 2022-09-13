const { Product } = require("../model/product.model");
const User = require("../model/user.model");
const uuid4 = require("uuid4");
const {
  uploadProductPic,
  deleteFile,
} = require("../services/cloudinary.services");

const getData = async () => {
  const user = await Product.find();
  return user;
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
const deleteProduct = async (id) => {
  //const deletedProduct = await Product.findByIdAndDelete(id);
  const deletedProduct = await Product.findById(id);
  if (!deletedProduct) {
    throw new Error("Product not found: " + id);
  }
  // await deleteFile(deletedProduct.img);
  console.log(deletedProduct);
  return deletedProduct;
};

module.exports = { getData, createProduct, deleteProduct };
