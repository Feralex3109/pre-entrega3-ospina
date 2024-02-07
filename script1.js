document.addEventListener("DOMContentLoaded", function () {
  const carritoItems = [];
  const carritoTotalElement = document.querySelector(".carrito-precio-total");
  const carritoItemsContainer = document.querySelector(".carrito-items");
  const btnPagar = document.querySelector(".btn-pagar");

  function actualizarCarrito() {
    carritoItemsContainer.innerHTML = "";
    let total = 0;

    carritoItems.forEach((item, index) => {
      const carritoItem = document.createElement("div");
      carritoItem.classList.add("carrito-item");

      carritoItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${
        item.titulo
      }" class="carrito-item-imagen">
            <div class="carrito-item-detalle">
              <span class="carrito-item-titulo">${item.titulo}</span>
              <span class="carrito-item-precio">$ ${item.precio}</span>
              <div class="carrito-item-cantidad">
                <button class="restar-cantidad">-</button>
                <span>${item.cantidad}</span>
                <button class="sumar-cantidad">+</button>
              </div>
              <span class="carrito-item-subtotal">$ ${
                item.precio * item.cantidad
              }</span>
              <button class="btn-eliminar">Eliminar</button>
            </div>
          `;

      const btnEliminar = carritoItem.querySelector(".btn-eliminar");
      btnEliminar.addEventListener("click", () => eliminarItemCarrito(index));

      const btnRestarCantidad = carritoItem.querySelector(".restar-cantidad");
      btnRestarCantidad.addEventListener("click", () => restarCantidad(index));

      const btnSumarCantidad = carritoItem.querySelector(".sumar-cantidad");
      btnSumarCantidad.addEventListener("click", () => sumarCantidad(index));

      carritoItemsContainer.appendChild(carritoItem);
      total += item.precio * item.cantidad;
    });

    carritoTotalElement.textContent = `$ ${total}`;
  }

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
  }

  function eliminarItemCarrito(index) {
    carritoItems.splice(index, 1);
    actualizarCarrito();
  }

  function restarCantidad(index) {
    if (carritoItems[index].cantidad > 1) {
      carritoItems[index].cantidad--;
      actualizarCarrito();
    }
  }

  function sumarCantidad(index) {
    carritoItems[index].cantidad++;
    actualizarCarrito();
  }

  const botonesAgregar = document.querySelectorAll(".boton-item");
  botonesAgregar.forEach((boton, index) => {
    boton.addEventListener("click", () => {
      const titulo =
        document.querySelectorAll(".titulo-item")[index].textContent;
      const precio = parseInt(
        document.querySelectorAll(".precio-item")[index].textContent.slice(2)
      );
      const imgSrc = document.querySelectorAll(".img-item")[index].src;

      agregarAlCarrito(titulo, precio, imgSrc);
    });
  });

  btnPagar.addEventListener("click", () => {
    alert("¡Pago realizado con éxito!");
    carritoItems.length = 0;
    actualizarCarrito();
  });
});
