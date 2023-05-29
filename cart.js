const cartBtn = document.getElementById("botonCarrito");

const displayCart = () => {
  contenedorCarrito.classList.toggle("display");
};

cartBtn.addEventListener("click", displayCart);
