// Función para guardar el carrito en LocalStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carritoItems", JSON.stringify(carritoItems));
}

// Función para cargar el carrito desde LocalStorage al cargar la página
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carritoItems");
  if (carritoGuardado) {
    carritoItems = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }
}

// Llama a la función de carga del carrito al cargar la página
cargarCarritoDesdeLocalStorage();

function agregarAlCarrito(titulo, precio, imgSrc) {
  const itemExistente = carritoItems.find((item) => item.titulo === titulo);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    const nuevoItem = {
      titulo,
      precio,
      imgSrc,
      cantidad: 1,
    };
    carritoItems.push(nuevoItem);
  }

  actualizarCarrito();
  guardarCarritoEnLocalStorage(); // Guarda el carrito en LocalStorage
}

function eliminarItemCarrito(index) {
  carritoItems.splice(index, 1);
  actualizarCarrito();
  guardarCarritoEnLocalStorage(); // Guarda el carrito en LocalStorage
}

function restarCantidad(index) {
  if (carritoItems[index].cantidad > 1) {
    carritoItems[index].cantidad--;
    actualizarCarrito();
    guardarCarritoEnLocalStorage(); // Guarda el carrito en LocalStorage
  }
}

function sumarCantidad(index) {
  carritoItems[index].cantidad++;
  actualizarCarrito();
  guardarCarritoEnLocalStorage(); // Guarda el carrito en LocalStorage
}
