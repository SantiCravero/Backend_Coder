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
  constructor() {
    this.products = [];
  }
  addProduct(newProduct) {
    const productValues = Object.values(newProduct);

    if (productValues.includes("") || productValues.includes(null)) {
      console.log("Todos los campos deben estar completos para ingresar");
    } else {
      const prodCode = this.products.map((product) => product.code);
      const prodExist = prodCode.includes(newProduct.code);

      if (prodExist) {
        console.log("Codigo ingresado ya existe, pruebe con otro codigo");
      } else {
        let id;
        this.products.length === 0 ? (id = 1) : (id = this.products.length + 1);
        const newObject = { ...newProduct, id };
        this.products.push(newObject);
      }
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const productId = this.products.find((producto) => producto.id === id);
    if (productId) {
      return productId
    } else {
      console.error("Not Found");
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

const productoVacio = new Producto("", "Relojes", 30, "No hay imagen", "", 10);

const productManager = new ProductManager();

// 1. Muestro el listado de productos vacio
console.log(productManager.getProducts());


// 2. Agrego los productos
productManager.addProduct(producto1);
productManager.addProduct(producto2);

// 3. Intento agregar un producto con campos vacios (debe salir error: Todos los campos deben ser completos)
productManager.addProduct(productoVacio);


// 4. Vuelvo a ver el listado de productos con los mismos ya ingresados
console.table(productManager.getProducts());


// 5. Pruebo ingresar un producto ya existente (debe salir error: Codigo ya existente)
productManager.addProduct(producto2);


// 6. Busco un producto por su ID
console.log(productManager.getProductById(1))
// 7. Busco un producto por ID que no existe y sale error: Not Found
productManager.getProductById(56);
