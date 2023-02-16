import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import { __dirname } from "./path.js";
import multer from "multer";
import { engine } from "express-handlebars";
import * as path from 'path'

// const upload = multer({dest:'src/public/img'}) Forma basica

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

// Rutas
app.use("/", express.static(__dirname + "/public"));

app.use("/api/products", routerProduct);
app.use("/api/cart", routerCart);

app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send("Imagen cargada");
});

// HandleBars
app.get("/", (req, res) => {
  const user = {
    nombre: "Caro",
    email: "c@c.com",
    rol: "Tutor"
  }

  const cursos = [
    {numero: 123, dia: "LyM", horario: "Noche"},
    {numero: 456, dia: "MyJ", horario: "Mañana"},
    {numero: 789, dia: "S", horario: "Mañana"}
  ]

  res.render("home", {     // Renderizar el contenido
    titulo: "Backend",
    mensaje: "Santi",
    // user
    usuario: user,
    isTutor: user.rol === "Tutor",
    cursos
  });
});




app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
