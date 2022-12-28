// Contenedor de productos
const products = document.querySelector(".catitema");
// Carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Guardado de carrito en local storage
const saveLocalStorage = (cartList) =>{
    localStorage.setItem("cart", JSON.stringify(cartList));
};
// Renderizado
const renderProduct = (product) => {
    const {productName, value, productImg} = product
   return   `
   <div class="catitem">
              <img src="${productImg}" alt="${productName}">
              <div class="itemdescription"><p>${productName}</p></div>
              <div class="itemfoot"><span class="valor">${value}</span><a href=""><i class="fa-solid fa-cart-plus"></i></a></div>
            </div>
            `
} 
// Renderizado por páginas
const renderDividedProducts = (index = 0) => {
    products.innerHTML += productsController.dividedProducts[index].map(renderProduct).join("")
}

const renderFilteredProducts = (category) => {
    const productsFilter = productsData.filter((products) => {
        return products.category === category;
    });
    products.innerHTML = productsFilter.map(renderProduct).join("");
}

const renderProducts = (index = 0) => {
     if (!category){renderDividedProducts(index);
     return
}
renderFilteredProducts(category);
}




const init = () => {
    renderProducts();
};
init()