document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.producto').forEach(producto => {
      const productoId = producto.getAttribute('data-id');
      const titulo = producto.querySelector('.card-title').textContent;
      const precioTexto = producto.querySelector('.card-text b').textContent;
      const precio = parseFloat(precioTexto.replace(/[$.]/g, ''));
  
      const btnMas = producto.querySelector('.btn-mas');
      const btnMenos = producto.querySelector('.btn-menos');
      const btnCantidad = producto.querySelector('.btn-cantidad');
      const btnCarrito = producto.querySelector('.btn-carrito');
      const btnFavorito = producto.querySelector('.btn-favorito');
  
      // Incrementar cantidad
      btnMas.addEventListener('click', () => {
        let cantidad = parseInt(btnCantidad.textContent);
        btnCantidad.textContent = cantidad + 1;
      });
  
      // Disminuir cantidad
      btnMenos.addEventListener('click', () => {
        let cantidad = parseInt(btnCantidad.textContent);
        if (cantidad > 1) {
          btnCantidad.textContent = cantidad - 1;
        }
      });
  
      // Agregar al carrito
      btnCarrito.addEventListener('click', () => {
        const cantidad = parseInt(btnCantidad.textContent);
        const productoData = {
          id: productoId,
          nombre: titulo,
          precio: precio,
          cantidad: cantidad
        };
        guardarEnLocalStorage('carrito', productoData);
        window.location.href = 'carrito.html';
      });
  
      // Agregar a favoritos
      btnFavorito.addEventListener('click', () => {
        const productoData = {
          id: productoId,
          nombre: titulo,
          precio: precio
        };
        guardarEnLocalStorage('favoritos', productoData);
        window.location.href = 'favoritos.html';
      });
    });
  
    // Función para guardar producto en localStorage
    function guardarEnLocalStorage(clave, producto) {
      let lista = JSON.parse(localStorage.getItem(clave)) || [];
      const existente = lista.find(p => p.id === producto.id);
      if (!existente) {
        lista.push(producto);
        localStorage.setItem(clave, JSON.stringify(lista));
      }
    }
  });
  