document.addEventListener('DOMContentLoaded', () => {
  let valorCarrito = localStorage.getItem('valorCarrito') ? parseInt(localStorage.getItem('valorCarrito')) : 0;
  const valorCarritoElemento = document.getElementById('valor-carrito');
  let itemsCarrito = localStorage.getItem('itemsCarrito') ? JSON.parse(localStorage.getItem('itemsCarrito')) : [];

  const actualizarValorCarrito = (valor) => {
    valorCarrito += valor;
    valorCarritoElemento.textContent = valorCarrito;
    localStorage.setItem('valorCarrito', valorCarrito);
  };

  const actualizarItemsCarrito = (producto) => {
    itemsCarrito.push(producto);
    localStorage.setItem('itemsCarrito', JSON.stringify(itemsCarrito));
  };

  const mostrarItemsCarrito = () => {
    const itemsCarritoElemento = document.getElementById('items-carrito');
    const totalCarritoElemento = document.getElementById('total-carrito');
    itemsCarritoElemento.innerHTML = '';
    let total = 0;

    itemsCarrito.forEach(item => {
      const elementoLista = document.createElement('li');
      elementoLista.textContent = `${item.producto} - $${item.precio}`;
      itemsCarritoElemento.appendChild(elementoLista);
      total += item.precio;
    });

    totalCarritoElemento.textContent = total;
  };

  valorCarritoElemento.textContent = valorCarrito;

  const botonesCompra = document.querySelectorAll('.botones');
  botonesCompra.forEach(boton => {
    boton.addEventListener('click', (event) => {
      const precio = parseInt(event.target.getAttribute('precio'));
      const producto = event.target.getAttribute('producto');
      if (!isNaN(precio) && producto) {
        actualizarValorCarrito(precio);
        actualizarItemsCarrito({ producto, precio });
      }
    });
  });

  const verCarritoButton = document.getElementById('ver-carrito');
  verCarritoButton.addEventListener('click', () => {
    mostrarItemsCarrito();
  });

  const confirmarCompraButton = document.getElementById('confirmar-compra');
  confirmarCompraButton.addEventListener('click', () => {
    alert('¡Compra confirmada!');
    valorCarrito = 0;
    itemsCarrito = [];
    valorCarritoElemento.textContent = valorCarrito;
    localStorage.removeItem('valorCarrito');
    localStorage.removeItem('itemsCarrito');
    mostrarItemsCarrito();
  });
});
