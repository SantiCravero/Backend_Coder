import { promises as fs } from "fs";

class Producto {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(newProduct) {
    try {
      const validProduct = Object.values(newProduct);
      if (validProduct.includes("") || validProduct.includes(null)) {
        console.log("Todos los campos deben estar completos para ingresar");
      } else {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);

        const objCode = data.map((product) => product.code);
        const objExist = objCode.includes(newProduct.code);

        if (objExist) {
          console.log("Codigo ingresado ya existe, pruebe con otro codigo");
        } else {
          let id;
          data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1);
          data.push({ ...newProduct, id: id });
          await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      return JSON.parse(read);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      const productId = data.find((producto) => producto.id === id);
      if (productId) {
        return productId;
      } else {
        console.error("Producto no encontrado");
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);

      const newData = data.filter((product) => product.id !== id);
      await fs.writeFile(this.path, JSON.stringify(newData), "utf-8");
      return console.log("El producto ha sido eliminado correctamente");
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, title, description, price, thumbnail, stock, code) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);

      if (data.some((producto) => producto.id === id)) {
        let indice = data.findIndex((product) => product.id === id);
        data[indice].title = title;
        data[indice].description = description;
        data[indice].price = price;
        data[indice].thumbnail = thumbnail;
        data[indice].stock = stock;
        data[indice].code = code;

        await fs.writeFile(this.path, JSON.stringify(data));
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      throw error;
    }
  }
}

const producto1 = new Producto(
  "DateJust 36",
  "Reloj para hombres",
  70000,
  "https://michaelkors.vercel.app/assets/watches/watch4.webp",
  246,
  10
);

const producto2 = new Producto(
  "Lady DateJust",
  "Reloj para mujeres",
  40000,
  "https://michaelkors.vercel.app/assets/watches/watch8.webp",
  359,
  15
);

const producto3 = new Producto("holaaa", "aaaaa", 40000, "aasas", 313123, 1111);

// Creo el ProductManager
const productManager = new ProductManager("./data.json");

await productManager.addProduct(producto1);
await productManager.addProduct(producto2);

// await productManager.deleteProduct(1)

// await productManager.updateProduct(2, "aa", "aa", "aa", 0, 0, 0)

// await productManager.addProduct(producto3);