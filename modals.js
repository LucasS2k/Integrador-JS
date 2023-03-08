const contenedorModal = document.getElementsByClassName('modalContenedor')[0]
// Boton de abrir carrito
const botonAbrir = document.getElementById('botonCarrito')
// Boton de cerrar carrito
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
// Funcion para abrir carrito
botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modalActive')
})
// Funcion para cerrar carrito
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modalActive')
})
// Desplegar carrito
contenedorModal.addEventListener('click', () =>{
    contenedorModal.classList.toggle('modalActive')
})
// Evitar que el evento afecte a otros elementos
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})

