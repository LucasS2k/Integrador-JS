// Botón de menu
const menuBtn = document.querySelector(".fa-bars")
// Container del menu
const menu = document.querySelector(".menu")
// Display del menu
const displayMenu = () => {
    menu.classList.toggle("display")
}
// Evento del boton de display menu
menuBtn.addEventListener("click", displayMenu)
// boton de carrito
const cartBtn = document.getElementById("botonCarrito")

 const displayCart = () => {
     contenedorCarrito.classList.toggle("display")
}

cartBtn.addEventListener("click", displayCart)

changeIcon = (icon) => icon.classList.toggle('fa-times')