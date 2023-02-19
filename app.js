// Contenedor de productos
const products = document.querySelector(".productContainer");
// Botones de categorias
const categories = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")
// Boton de mostrar más
const moreBtn = document.querySelector(".showMoreButton");

// Contenedor del carrito
const contenedorCarrito = document.getElementById('carrito-contenedor')
// Boton de vaciar carrito
const botonVaciar = document.getElementById('vaciar-carrito')
// Contador del carrito
const contadorCarrito = document.getElementById('contadorCarrito')
// Valores del carrito
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')
// Renderizado
const renderProduct = (product) => {
    const {id, nombre, precio, productImg, category} = product
   return   `
   <div class="item">
              <img src="${productImg}" alt="${nombre}">
              <div class="itemdescription"><p>${nombre}</p></div>
              <div class="itemfoot"><span class="valor">${precio}</span><button id="agregar${products.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart" data-id= ${id} data-name=${nombre}data-category=${category} data-value=${precio} data-img=${productImg}></i></button></div>
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


const init = () => {
    renderProducts();
    categories.addEventListener("click", applyFilter);
    moreBtn.addEventListener ("click", showMore)
};
init()