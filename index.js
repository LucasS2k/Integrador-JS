// Contenedor de productos
const products = document.querySelector(".productContainer");
// Botones de categorias
const categories = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")
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
//vaciar carrito
const botonVaciar = document.getElementById('vaciar-carrito')
//contador carrito
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
//valores carrito
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

// Boton de mostrar más
const moreBtn = document.querySelector(".showMoreButton");
// Renderizado
const renderProduct = (product) => {
    const {id, productName, value, productImg, category} = product
   return   `
   <div class="item">
              <img src="${productImg}" alt="${productName}">
              <div class="itemdescription"><p>${productName}</p></div>
              <div class="itemfoot"><span class="valor">${value}</span><button id="agregar${products.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart" data-id= ${id} data-name=${productName}data-category=${category} data-value=${value} data-img=${productImg}></i></button></div>
            </div>
            `
} 
// Renderizado por páginas
const renderDividedProducts = (index = 0) => {
	products.innerHTML += productsController.dividedProducts[index]
		.map(renderProduct)
		.join("");
};
// Renderizado por filtros
const renderFilteredProducts = (category) => {
    const productsFilter = productsList.filter((product) => {
        return product.category === category;
    });
    products.innerHTML = productsFilter.map(renderProduct).join("");
};

const renderProducts = (index = 0, category = undefined) => {
     if (!category){renderDividedProducts(index);
     return
}
renderFilteredProducts(category);
}

const changeShowMore = (category) => {
   if (!category) {
      moreBtn.classList.remove("hidden");
      return; 
    }
    moreBtn.classList.add("hidden");
}

 const btnActive = (selectedCategory) => {
     const categories = [...categoriesList]
     categories.forEach((categoryBtn) => {
      if (categoryBtn.dataset.category !== selectedCategory){
        categoryBtn.classList.remove("active");
        return;
      }
      categoryBtn.classList.add("active");
  })
 }

 const changeFilterState = (event) => {
    const  selectedCategory = event.target.dataset.category
    btnActive(selectedCategory)
    changeShowMore(selectedCategory)
 }

 const applyFilter = (event) => {
     if (!event.target.classList.contains("category")){
        return
     } else {
        changeFilterState(event)
     }
     if (!event.target.dataset.category){
        products.innerHTML = "";
        renderProducts();
     } else {
        renderProducts(0, event.target.dataset.category)
        productsController.nextProductsIndex = 1
     }
 }

const isLastIndexOf = () =>{
    return (
        productsController.nextProductsIndex === productsController.productsLimit
    )
}

const showMore = () => {
    renderProducts(productsController.nextProductsIndex)
    productsController.nextProductsIndex++
    if (isLastIndexOf()){
        moreBtn.classList.add("hidden")
    }
}
const displayCart = () => {
    cartCont.classList.toggle("display")
}

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

const boton = document.getElementById(`agregar${products.id}`)

boton.addEventListener('click', () => {
    
    agregarAlCarrito(products.id)
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
        const item = stockProductos.find((prod) => prod.id === prodId)
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

const init = () => {
    renderProducts();
    categories.addEventListener("click", applyFilter);
    moreBtn.addEventListener ("click", showMore)
    cartBtn.addEventListener("click", displayCart)
};
init()