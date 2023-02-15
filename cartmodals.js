const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
//vaciar carrito
const botonVaciar = document.getElementById('vaciar-carrito')
// Carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Guardado de carrito en local storage
const saveLocalStorage = (cartList) =>{
    localStorage.setItem("cart", JSON.stringify(cartList));
};
// boton de carrito
const cartBtn = document.querySelector(".cartImg")
// contenedor del carrito
const contenedorCarrito = document.querySelector(".cartContainer")

//contador carrito
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
//valores carrito
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')


botonAbrir.addEventListener('click',()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click',()=>{
    contenedorModal.classList.toggle('modal-active')
})
contenedorModal.addEventListener('click',() =>{
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})

//local storage del carrito
let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

const addButton = document.getElementsByClassName(`boton-agregar${productsList.id}`)


addButton.addEventListener('click', () => {
    agregarAlCarrito(producto.id)
})

const agregarAlCarrito = (prodId) => {

    
    const exist = carrito.some (prod => prod.id === prodId)

    if (exist){
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        const item = productsList.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
}
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito)
}

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    contadorCarrito.innerText = carrito.length
  
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}