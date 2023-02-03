import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();
const PORT = 4000;

const manager = new ProductManager("./data.json");

app.use(express.urlencoded({ extended: true }));

// Ruta raiz

app.get("/", (req, res) => {
  res.send("Mi primer servidor con Expres");
});

app.get("/products", async (req, res) => {
  const products = await manager.getProducts();
  let { limit } = req.query;
  if (limit) {
    res.send(products.splice(0, limit));
  } else {
    res.send(products);
  }
});


app.get("/products/:id", async (req, res) => {
    const id = await manager.getProductById(Number(req.params.id))
    if (id) {
        res.send(id)
    } else {
        res.send("ID no encontrado")
    }
});


app.listen(PORT, () => {
  console.log(`Servidor on port ${PORT}`);
});
