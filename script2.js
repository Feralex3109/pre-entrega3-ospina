principal();

function principal() {
  let tipoSeguros = [
    {
      id: 1,
      nombre: "Previsora",
      precio: "$ 250000",
      rutaImagen: "previsora.jpeg",
    },
    {
      id: 2,
      nombre: "Bolivar",
      precio: "$ 275000",
      rutaImagen: "bolivar.jpeg",
    },
    { id: 3, nombre: "Mapfre", precio: "$ 300000", rutaImagen: "mapfre.jpeg" },
    { id: 4, nombre: "Sura", precio: "$ 285000", rutaImagen: "sura.jpeg" },
    {
      id: 5,
      nombre: "Allianz",
      precio: "$ 290000",
      rutaImagen: "allianz.jpeg",
    },
    {
      id: 6,
      nombre: "Liberty",
      precio: "$ 260000",
      rutaImagen: "liberty.jpeg",
    },
    {
      id: 7,
      nombre: "Equidad",
      precio: "$ 270000",
      rutaImagen: "equidad.jpeg",
    },
    {
      id: 8,
      nombre: "Positiva",
      precio: "$ 265000",
      rutaImagen: "positiva.jpeg",
    },
  ];

  let inputBuscador = document.getElementById("buscador");
  let botonBuscar = document.getElementById("buscar");
  botonBuscar.addEventListener("click", () =>
    filtrar(tipoSeguros, inputBuscador, "nombre")
  );

  let filtrosTipoSeguros =
    document.getElementsByClassName("filtrosTipoSeguros");
  for (const filtroTipoSeguro of filtrosTipoSeguros) {
    filtroTipoSeguro.addEventListener("click", () =>
      filtrar(tipoSeguros, filtroTipoSeguro, "tipoSeguros")
    );
  }
  renderizarCarrito();
  renderizarTarjetas(tipoSeguros);
}

function finalizarCompra() {
  let carrito = recuperarCarrito();
  if (carrito.length > 0) {
    localStorage.removeItem("carrito");
    renderizarCarrito();
    alert("Muchas gracias por su compra");
  } else {
    alert("No tiene productos en su carrito");
  }
}

function filtrar(seguros, input, id) {
  let segurosFiltrados = seguros.filter((seguro) =>
    seguro[id].inclides(input.value)
  );
  renderizarTarjetas(tipoSeguros);
}

function renderizarTarjetas(seguros) {
  let contenedor = document.getElementById("seguros");
  contenedor.innerHTML = "";
  seguros.forEach((seguro) => {
    let tarjetaSeguro = document.createElement("div");
    tarjetaSeguro.classList.add("tarjetaSeguro");
    tarjetaSeguro.innerHTML = `
    <h3>${seguro.nombre}</h3>
    <p>${seguro.precio}</p>
    <button id=${seguro.id}>Agregar al Carrito</button>        
        `;
    contenedor.appendChild(tarjetaSeguro);
    let botonAgregarAlCarrito = document.getElementById(seguro.id);
    botonAgregarAlCarrito.addEventListener("click", (e) =>
      agregarAlCarrito(seguros, e)
    );
  });
}

function agregarAlCarrito(seguro, e) {
  let carrito = recuperarCarrito();
  let seguroBuscado = seguro.find(
    (seguro) => seguro.id === Number(e.target.id)
  );
  let seguroEncarrito = carrito.find(
    (seguro) => seguro.id === seguroBuscado.id
  );

  if (seguroBuscado.stock > 0) {
    alert("Se agrego el seguro al carrito");
    seguroBuscado.stock--;

    if (seguroEncarrito) {
      seguroEncarrito.unidades++;
      seguroEncarrito.subtotal =
        seguroEncarrito.subtotal * seguroEncarrito.unidades;
      seguroEncarrito.precioUnitario = precioUnitario * cantidad.unidades;
      seguroEncarrito.unidades;
    } else {
      carrito.push({
        id: seguroBuscado.id,
        nombre: seguroBuscado.nombre,
        precioUnitario: seguroBuscado.precio,
        subtotal: seguroBuscado.precio,
        unidades: 1,
      });
    }
  } else {
    alert("Ya no quedan unidades disponibles");
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

function renderizarCarrito() {
  let contenedor = document.getElementById("carrito");
  contenedor.innerHTML = "";
  let carrito = renderizarCarrito();

  carrito.forEach((seguro) => {
    let tarjetaSeguro = document.createElement("div");
    tarjetaSeguro.innerHTML = `
        <p>${seguro.nombre}</p>
        <p>${seguro.precioUnitario}</p>
        <p>${seguro.unidades}</p>
        <p>${seguro.subtotal}</p>
        `;
    contenedor.appendChild(tarjetaSeguro);
  });
}
