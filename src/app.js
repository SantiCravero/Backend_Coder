import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();
const PORT = 4000;

const productManager = new ProductManager("./data.json");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Ruta raiz

app.get("/", (req, res) => {
  res.send("Mi primer servidor con Expres");
});

app.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  let { limit } = req.query;
  if (limit) {
    res.send(products.splice(0, limit));
  } else {
    res.send(products);
  }
});


app.get("/products/:id", async (req, res) => {
    const id = await productManager.getProductById(parseInt(req.params.id))
    if (id) {
        res.send(id)
    } else {
        res.send("ID no encontrado")
    }
});

app.post("/products", async (req, res) => {
  let mensaje = await productManager.addProduct(req.body)
  res.send("Producto agregado " + mensaje)
})

app.put("/products/:id", async (req, res) => {
  let id = parseInt(req.params.id)
  let mensaje = await productManager.updateProduct(id, req.body)
  res.send("Producto modificado " + mensaje)
})

app.delete("/products/:id", async (req, res) => {
  let id = parseInt(req.params.id)
  let mensaje = await productManager.deleteProduct(id)
  res.send("Producto eliminado " + mensaje)
})


app.listen(PORT, () => {
  console.log(`Servidor on port ${PORT}`);
});
