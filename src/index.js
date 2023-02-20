import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import { __dirname } from "./path.js";
import multer from "multer";
import { engine } from "express-handlebars";
import * as path from 'path'
import { Server } from "socket.io";

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

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

// Middlewares
// express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));   // __dirname + views

// ServerIO
const io = new Server(server)

io.on("connection", (socket) => {
  console.log("Cliente conectado")

  socket.on("mensaje", info => {
    console.log(info)
  })

  socket.emit("mensaje-general", [])

  socket.broadcast.emit("mensaje-socket-propio", "Hola, desde mensaje socket propio") //Envio un mensaje a todos los clientes conectados a otros sockets menos al que esta conectado a este socket actualmente
})

// Rutas
app.use("/", express.static(__dirname + "/public"));

app.use("/api/products", routerProduct);
app.use("/api/cart", routerCart);

app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send("Imagen cargada");
});

// HandleBars HBS




// app.get("/", (req, res) => {

//   const user = {
//     nombre: "Caro",
//     email: "c@c.com",
//     rol: "Tutor"
//   }
//   const cursos = [
//     {numero: 123, dia: "LyM", horario: "Noche"},
//     {numero: 456, dia: "MyJ", horario: "Mañana"},
//     {numero: 789, dia: "S", horario: "Mañana"}
//   ]

//   res.render("home", {     // Renderizar el contenido
//     titulo: "Backend",
//     mensaje: "Santi",
//     usuario: user,
//     isTutor: user.rol === "Tutor",
//     cursos           // Se puede declarar solo mandando la variable
//   });
// });
