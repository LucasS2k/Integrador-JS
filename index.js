// Contenedor de productos
const products = document.querySelector(".productContainer");
// Carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Guardado de carrito en local storage
const saveLocalStorage = (cartList) =>{
    localStorage.setItem("cart", JSON.stringify(cartList));
};
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
    products.innerHTML += productsController.dividedProducts[index].map(renderProduct).join("")
}

const renderFilteredProducts = (category) => {
    const productsFilter = productsData.filter((product) => {
        return product.category === category;
    });
    products.innerHTML = productsFilter.map(renderProduct).join("");
}

const renderProducts = (index = 0, category) => {
     if (!category){renderDividedProducts(index);
     return
}
renderFilteredProducts(category);
}

const changeShowMore = (category) => {
   if (!category){
      moreBtn.classList.remove("hidden");
      return; 
    }
    moreBtn.classList.add("hidden");
}

// const btnActive = (selectedCategory) => {
//     const categories = [...categories]
//     categories.forEach( (categoryBtn) => {
//        if (categoryBtn.dataset.category)
//     })
// }

const init = () => {
    renderProducts();
};
init()