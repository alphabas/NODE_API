const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModels");

const port = 3001;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO I'M HOME GET");
});

// GET ALL PRODUCT
app.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products, message: res.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ONE PRODUCT

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT ONE PRODUCT

app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(400).json({ message: "Error to update" });
    }
    const productUpdate = await Product.findById(id);
    res.status(200).json({ data: productUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE ONE PRODUCT

app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(400).json({ message: "Error to delete" });
    }
    res.status(200).json({ message: "Delete succeffuly" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ message: "Product created succefully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/NODE_API", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO MONGO DB");
    app.listen(port, () => {
      console.log(`THIS APP RUN ON PORT - ${port}`);
    });
  })
  .catch((error) => {
    console.log(`ERROR TO CONNECTED : ${error}`);
  });
