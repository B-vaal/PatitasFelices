// ===== PatitasFelices - funciones compartidas por todas las páginas =====

// Formatea un número como precio chileno: 12990 -> "$12.990"
function formatoCLP(valor) {
  return "$" + valor.toLocaleString("es-CL");
}

// ----- Productos -----
// Carga el JSON una sola vez por página
let _productos = null;
async function cargarProductos() {
  if (!_productos) {
    const respuesta = await fetch("data/productos.json");
    _productos = await respuesta.json();
  }
  return _productos;
}

// ----- Carrito (localStorage) -----
// Se guarda como lista de { id, cantidad }
function leerCarrito() {
  try {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  } catch (e) {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

function agregarAlCarrito(id, cantidad = 1) {
  const carrito = leerCarrito();
  const item = carrito.find((p) => p.id === id);
  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ id, cantidad });
  }
  guardarCarrito(carrito);
}

function totalUnidades() {
  return leerCarrito().reduce((suma, p) => suma + p.cantidad, 0);
}

function actualizarContador() {
  const el = document.getElementById("contador-carrito");
  if (el) el.textContent = totalUnidades();
}

// ----- Piezas de interfaz reutilizables -----
// HTML de la imagen placeholder (emoji sobre fondo de color)
function htmlFoto(p) {
  return `<div class="foto" style="background:${p.color}" role="img" aria-label="${p.nombre}">${p.emoji}</div>`;
}

// HTML de una tarjeta de producto
function htmlTarjeta(p) {
  return `
    <article class="tarjeta">
      <a href="producto.html?id=${p.id}">${htmlFoto(p)}</a>
      <div class="info">
        <span class="etiqueta">${p.categoria} · ${p.mascota}</span>
        <h3><a href="producto.html?id=${p.id}">${p.nombre}</a></h3>
        <span class="precio">${formatoCLP(p.precio)}</span>
        <button class="btn" data-agregar="${p.id}">Agregar</button>
      </div>
    </article>`;
}

// Escucha clics en botones "Agregar" dentro de un contenedor
function activarBotonesAgregar(contenedor) {
  contenedor.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-agregar]");
    if (!boton) return;
    agregarAlCarrito(Number(boton.dataset.agregar));
    boton.textContent = "¡Agregado! ✓";
    setTimeout(() => (boton.textContent = "Agregar"), 1200);
  });
}

// ----- Cabecera y pie de página (se inyectan en cada página) -----
function dibujarCabeceraYPie() {
  const actual = location.pathname.split("/").pop() || "index.html";
  const enlace = (href, texto) =>
    `<a href="${href}" class="${actual === href ? "activo" : ""}">${texto}</a>`;

  document.getElementById("cabecera").innerHTML = `
    <header class="cabecera">
      <div class="contenedor">
        <a href="index.html" class="logo">🐾 PatitasFelices</a>
        <nav class="menu">
          ${enlace("index.html", "Inicio")}
          ${enlace("catalogo.html", "Catálogo")}
          ${enlace("contacto.html", "Contacto")}
          <a href="carrito.html" class="${actual === "carrito.html" ? "activo" : ""}">🛒<span class="contador" id="contador-carrito">0</span></a>
        </nav>
      </div>
    </header>`;

  document.getElementById("pie").innerHTML = `
    <footer class="pie">
      <p>🐾 PatitasFelices — tienda de ejemplo (demo). No se realizan pagos ni envíos reales.</p>
    </footer>`;

  actualizarContador();
}

document.addEventListener("DOMContentLoaded", dibujarCabeceraYPie);
