// Contenedor de productos
const products = document.querySelector(".productContainer");
// Botones de categorias
const categories = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")
// Boton de mostrar más
const moreBtn = document.querySelector(".showMoreButton");

// Contenedor del carrito
const contenedorCarrito = document.getElementById('cartContainer')
// Boton de vaciar carrito
const botonVaciar = document.getElementById('vaciar-carrito')
// Contador del carrito
const contadorCarrito = document.getElementById('contadorCarrito')
// Valores del carrito
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')
// Guardado del carrito
let carrito = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (CartList) => {
    localStorage.setItem("cart", JSON.stringify(CartList))
}
// Renderizado
const renderProduct = (product) => {
    const {id, nombre, precio, productImg, category} = product
   return   `
   <div class="item">
              <img src="${productImg}" alt="${nombre}">
              <div class="itemdescription"><p>${nombre}</p></div>
              <div class="itemfoot"><span class="valor">${precio}</span><button > + <i id="agregar${products.id}" class="boton-agregar fas fa-shopping-cart" data-id= ${id} data-name=${nombre}data-category=${category} data-value=${precio} data-img=${productImg}></i></button></div>
            </div>
            `
}
// boton de agregar al carrito
const addButton = document.getElementById('agregar${products.id}')

// Renderizado por páginas
const renderDividedProducts = (index = 0) => {
	products.innerHTML += productsController.dividedProducts[index]
		.map(renderProduct)
		.join("");
};
// Renderizado por filtros
const renderFilteredProducts = (category) => {
    const productsFilter = stockProductos.filter((product) => {
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

const renderCartProduct = (cartProduct) => {
    const {id, nombre, cantidad, precio} = cartProduct;
    return `<div class="productoEnCarrito">
    ${id}
    // <img src=>
    <h3>${nombre}</h3>
    <p>${precio}</p>
    ${cantidad}
    
    </div>`;
};

const renderCart = () => {
    if (!carrito.length){
        contenedorCarrito.innerHTML= `<p>Su carrito está vacío</p>`
        return
    }
    contenedorCarrito.innerHTML = carrito.map(renderCartProduct).join("");
};

const total = () =>{
    return carrito.reduce((acc, cur)=>{
        return acc + Number(cur.precio) * cur.cantidad
    }, 0)
}
const totalFunction = () => {
    precioTotal.innerHTML = `$${total().toFixed(0)}`
}
const cartCount = () => {
    contadorCarrito.textContent = carrito.reduce((acc, cur)=>{
        return acc + cur.cantidad
    }, 0)
}
const cartUpdate = () => {
    saveLocalStorage(carrito)
    renderCart()
    total()
    cartCount()
}

const agregarAlCarrito = (e) => {
     if (!e.target.classList.contains("boton-agregar")){
        return;
     }
     const {id, nombre, precio, img} = e.target.dataset;

     const product = productData (id, nombre, precio, img);

     if (alreadyInCart(product)){
        agregarCantidadAlCart(product);
     } else {
       renderizarEnCarrito(product);
     }
     cartUpdate();
}

const productData = (id, nombre, precio, img) => {
    return {id, nombre, precio, img}
}

const alreadyInCart = (product) => {
   return carrito.find((item)=> {
       return item.id === product.id
   })      
}

const agregarCantidadAlCart = (product) => {
    carrito = carrito.map ( (cartProduct)=>{
       return cartProduct.id === product.id 
       ? {...cartProduct, quantity: cartProduct.quantity +1}
       :cartProduct;
    })
}
const renderizarEnCarrito = (product) => {
    carrito = [
        ...carrito,
        {
            ...product,
            quantity: 1,
        },
    ]
}
const init = () => {
    renderProducts();
    categories.addEventListener("click", applyFilter);
    moreBtn.addEventListener ("click", showMore)
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", total)
    document.addEventListener("DOMContentLoaded",cartCount());
    products.addEventListener("click", agregarAlCarrito)
};
init()