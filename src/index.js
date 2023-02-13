import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import { __dirname } from "./path.js";
import multer from "multer";

// const upload = multer({dest:'src/public/img'}) Forma basica 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/img')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({storage:storage})

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/static', express.static(__dirname + '/public'))

app.use('/api/products', routerProduct)
app.use('/api/cart', routerCart)

app.post('/upload', upload.single('product'), (req, res) => {
  console.log(req.body)
  console.log(req.file)
  res.send("Imagen cargada")
})

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
