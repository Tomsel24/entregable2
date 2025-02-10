// script.js

// Variables y elementos del DOM
const productos = [
    { id: 1, nombre: "Producto 1", precio: 10000 },
    { id: 2, nombre: "Producto 2", precio: 15000 },
    { id: 3, nombre: "Producto 3", precio: 25000 }
];

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const listaProductos = document.getElementById("lista-productos");
const carritoElement = document.getElementById("carrito");
const totalElement = document.getElementById("total");

// Función para mostrar productos en la página
function renderizarProductos() {
    listaProductos.innerHTML = "";
    productos.forEach(producto => {
        const item = document.createElement("div");
        item.classList.add("producto");
        item.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;
        listaProductos.appendChild(item);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

// Función para mostrar el carrito
function renderizarCarrito() {
    carritoElement.innerHTML = "";
    let total = 0;
    carrito.forEach((producto, index) => {
        total += producto.precio;
        const item = document.createElement("div");
        item.classList.add("item-carrito");
        item.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoElement.appendChild(item);
    });
    totalElement.textContent = `Total: $${total}`;
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

// Inicializar la página
renderizarProductos();
renderizarCarrito();
