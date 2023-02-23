const contenedorModal = document.getElementsByClassName('modalContenedor')[0]
const botonAbrir = document.getElementById('botonCarrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modalActive')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modalActive')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modalActive')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})