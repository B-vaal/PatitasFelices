# PatitasFelices 🐾 (demo)

Tienda online de ejemplo para alimentos y juguetes de perros y gatos.
Es una **demo de práctica**: no hay pagos reales ni backend. La marca y los productos son ficticios.

## Cómo verla
El catálogo se carga con `fetch`, así que hay que abrirla desde un servidor local (no con doble clic):

```bash
python -m http.server 8000
```

Luego entra a http://localhost:8000

## Estructura
- `index.html`, `catalogo.html`, `producto.html`, `carrito.html`, `contacto.html`
- `data/productos.json`: productos de ejemplo
- `css/styles.css`: estilos (mobile first)
- `js/app.js`: carrito (localStorage), formato CLP y cabecera/pie compartidos
