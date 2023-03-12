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
const botonVaciar = document.getElementById('vaciarCarrito')
// Boton de finalizar compra
const botonFinalizarCompra = document.getElementById('finalizarCompra')
// Contador del carrito
const contadorCarrito = document.getElementById('contadorCarrito')
// Valores del carrito
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')
// Recibir carrito guardado
let carrito = JSON.parse(localStorage.getItem("cart")) || [];
// Guardado del carrito
const saveLocalStorage = (CartList) => {
    localStorage.setItem("cart", JSON.stringify(CartList))
}
// Renderizado
const renderProduct = (product) => {
    const {id, nombre, precio, productImg, category, cantidad} = product
   return   `
   <div class="item">
              <img src="${productImg}" alt="${nombre}">
              <div class="itemdescription"><p>${nombre}</p></div>
              <div class="itemfoot"><span class="valor">$${precio}</span><button class="boton-agregar fas fa-shopping-cart" data-id="${id}" data-name="${nombre}" data-category="${category}" data-value="${precio}" data-img="${productImg}" data-quantity="${cantidad}">+</button></div>
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

const renderInCart = (cartProduct) => {
    const {quantity, name, value, img, id } = cartProduct;
    return `<div class="productoEnCarrito">${quantity} ${name} $${value} <img src="${img}" class="imageInCart"> <button class="trashCan deleteOne" onclick="eliminarDelCarrito(${cartProduct.id})" data-id="${id}"> <i class="trashCan fa-solid fa-trash"></i></button></div>
    <div class="lineagris"></div>`;
};

const renderCart = () => {
    if (!carrito.length) {
        contenedorCarrito.innerHTML= `<p>Su carrito está vacío</p>`
        return
    }
    contenedorCarrito.innerHTML = carrito.map(renderInCart).join("");
};
const cartCount = () => {
    contadorCarrito.textContent = carrito.reduce((acc, cur)=>{
        return acc + cur.quantity
    }, 0)
}
const cartUpdate = () => {
    saveLocalStorage(carrito)
    renderCart()
    cartCount()
    renderTotal()
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
const addToCartButton = document.getElementsByClassName('boton-agregar')
const agregarAlCarrito = (e) => {
     if (!e.target.classList.contains("boton-agregar")){
        return;
     }
     const { id, name, value, img} = e.target.dataset;

     const product = productData ( id, name, value, img);

     if (alreadyInCart(product)){
        agregarCantidadAlCart(product);
     } else {
       renderizarEnCarrito(product);
     }
     cartUpdate();
}

const productData = ( id, name, value, img) => {
    return { id, name, value, img};
};

const alreadyInCart = (product) => {
   return carrito.find((item)=> {
       return item.id === product.id
   })      
}

const agregarCantidadAlCart = (product) => {
    carrito = carrito.map ((cartProduct)=>{
       return cartProduct.id === product.id 
       ? {...cartProduct, quantity: cartProduct.quantity +1}
       :cartProduct;
    })
}
const vaciarCarrito = () => {
    carrito = [];
    cartUpdate()
}
const cartWindow = (confirmMsg, successMsg) => {
	if (!carrito.length) return;
	if (window.confirm(confirmMsg)) {
		vaciarCarrito();
		alert(successMsg);
	}
};
const finalizarCompraConfirm = () => {
	cartWindow("¿Desea finalizar su compra?", "¡Su producto está en camino!");
};

const vaciarCarritoConfirm = () => {
	cartWindow("¿Desea vaciar su carrito?", "Su carrito ha sido eliminado");
};
// Boton de borrar unidad del carrito
// const deleteOne = document.getElementsByClassName('deleteOne')

const eliminarDelCarrito = (cartProduct) => {
    const item = carrito.find((product) => product.id === cartProduct)

    const indice = carrito.indexOf(item)

     carrito.splice(indice) 
    console.log(carrito)
    cartUpdate()
}
const sumaTotal = () => {
    return carrito.reduce((acc, cur)=>{
        return acc + Number(cur.value) * cur.quantity;
    },0);
}
const renderTotal = () => {
    precioTotal.innerHTML = `${sumaTotal()}`;
}
const init = () => {
    renderProducts();
    categories.addEventListener("click", applyFilter);
    moreBtn.addEventListener ("click", showMore)
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", renderTotal())
    document.addEventListener("DOMContentLoaded",cartCount());
    products.addEventListener("click", agregarAlCarrito)
    botonVaciar.addEventListener("click", vaciarCarritoConfirm)
    botonFinalizarCompra.addEventListener("click", finalizarCompraConfirm)
    // deleteOne.addEventListener("click", eliminarDelCarrito)
};
init()