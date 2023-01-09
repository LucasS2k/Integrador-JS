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
const cartCont = document.querySelector(".cartContainer")
// Botón de menu
const menuBtn = document.querySelector(".menuimg")
// Container del menu
const menu = document.querySelector(".menu")
// Boton de mostrar más
const moreBtn = document.querySelector(".showMoreButton");
// Renderizado
const renderProduct = (product) => {
    const {id, productName, value, productImg, category} = product
   return   `
   <div class="item">
              <img src="${productImg}" alt="${productName}">
              <div class="itemdescription"><p>${productName}</p></div>
              <div class="itemfoot"><span class="valor">${value}</span><a href=""><i class="fa-solid fa-cart-plus" data-id= ${id} data-name=${productName}data-category=${category} data-value=${value} data-img=${productImg}></i></a></div>
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
        productsController.nextProductIndex = 1
     }
 }

const isLastIndexOf = () =>{
    return (
        productsController.nextProductIndex === productsController.productsLimit
    )
}

const showMore = () => {
    renderProducts(productsController.nextProductsIndex)
    productsController.nextProductIndex++
    if (isLastIndexOf()){
        moreBtn.classList.add("hidden")
    }
}

const displayMenu = () => {
     menu.classList.toggle("display")
}

const displayCart = () => {
    cartCont.classList.toggle("display")
}

const init = () => {
    renderProducts();
    categories.addEventListener("click", applyFilter);
    moreBtn.addEventListener ("click", showMore)
    menuBtn.addEventListener("click", displayMenu)
    cartBtn.addEventListener("click", displayCart)
};
init()