// Botón de menu
const menuBtn = document.querySelector(".menuimg")
// Container del menu
const menu = document.querySelector(".menu")
// Display del menu
const displayMenu = () => {
    menu.classList.toggle("display")
}
// Evento del boton de display menu
menuBtn.addEventListener("click", displayMenu)


// boton de carrito
const cartBtn = document.getElementById("boton-carrito")

const cartCont = document.getElementById("cartContainer")

const displayCart = () => {
    cartCont.classList.toggle("display")
}

cartBtn.addEventListener("click", displayCart)