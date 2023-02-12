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