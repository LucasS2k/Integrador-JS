const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
// const botonAbrir = document.getElementById('boton-carrito')
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

// contenedor del carrito
const cartCont = document.querySelector(".cartContainer")

//contador carrito
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
//valores carrito
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')


// botonAbrir.addEventListener('click',()=>{
//     contenedorModal.classList.toggle('modal-active')
// })
// botonCerrar.addEventListener('click',()=>{
//     contenedorModal.classList.toggle('modal-active')
// })
// contenedorModal.addEventListener('click',() =>{
//     contenedorModal.classList.toggle('modal-active')
// })
// modalCarrito.addEventListener('click', (event) => {
//     event.stopPropagation()
// })

//local storage del carrito


botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

const botonAgregar = document.getElementById(`agregar${products.id}`)

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)


const agregarAlCarrito = (prodId) => {   
    const exist = carrito.some (prod => products.id === prodId)

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

const addProduct = (e) => {
	if (!e.target.classList.contains("boton-agregar")) {
		return;
	}
	const { id, name, bid, img } = e.target.dataset;

	const product = productData(id, name, bid, img);

	if (isExistingCartProduct(product)) {
		addUnitToProduct(product);
		showSuccessModal("Se agregó una unidad del producto al carrito");
	} else {
		agregarAlCarrito(product);
	}
};
const isExistingCartProduct = (product) => {
	return cart.find((item) => {
		return item.id === product.id;
	});
};
const productData = (id, name, bid, img) => {
	return { id, name, bid, img };
};



botonAgregar.addEventListener('click', () => {
    agregarAlCarrito(productsList.id)
})


const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito)
}

const actualizarCarrito = () => {

    cartCont.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${products.producName}</p>
        <p>Precio:$${products.value}</p>
        <p>Cantidad: <span id="cantidad">${products.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${products.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        cartCont.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    contadorCarrito.innerText = carrito.length
  
}