const {
  getData,
  createProduct,
  deleteProduct,
} = require("../services/product.services");
const upload = require("../config/multer.config");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const data = await getData();
  res.json(data);
});

router.post("/create-product", upload.single("img"), async (req, res) => {
  const product = await createProduct(req.body, req.file);
  res.status(200).json(product);
});

router.delete("/delete-product/:id", async (req, res) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
