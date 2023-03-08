let stockProductos = [
    {
        id: 1,
        nombre: "Hoodie",
        precio: "6000",
        productImg: "./integrador/Assets/techhoodie.jpg",
        category: "prendas",
    },

    {
        id: 2,
        nombre: "Eva 01 Hoodie",
        precio: "7000",
        productImg: "./integrador/Assets/eva.png",
        category: "prendas",
        cantidad: 1,
    },

    {
        id: 3,
        nombre: "Parca Mate",
        precio: "5500",
        productImg: "./integrador/Assets/techpark1.png",
        category: "prendas",
        cantidad: 1,
    },

    {
        id:4,
        nombre: "Jogger Negro",
        precio:"3000",
        productImg:"./integrador/Assets/pants2.jpg",
        category:"prendas",
        cantidad: 1,
    },

    {
        id:5,
        nombre: "Bolso 15cm",
        precio:"2200",
        productImg:"./integrador/Assets/bolsa.png",
        category:"accesorios",
        cantidad: 1,
    },

    {
        id:6,
        nombre: "Riñonera",
        precio:"3200",
        productImg:"./integrador/Assets/bolsa2.jpg",
        category:"accesorios",
        cantidad: 1,
    },

    {
        id:7,
        nombre: "Mochila",
        precio:"3000",
        productImg:"./integrador/Assets/bolsa3.png",
        category:"accesorios",
        cantidad: 1,
    },

    {
        id:8,
        nombre: "Riñonera V2",
        precio:"3500",
        productImg:"./integrador/Assets/bolsa5.png",
        category:"accesorios",
        cantidad: 1,
    },

    {
        id:9,
        nombre: "Guantes",
        precio:"1200",
        productImg:"./integrador/Assets/gloves.png",
        category:"accesorios",
        cantidad: 1,
    },

    {
        id:10,
        nombre: "Guantes P.",
        precio:"1900",
        productImg:"./integrador/Assets/gloves2.png",
        category:"accesorios",
        cantidad: 1,
    },

    {
        id:11,
        nombre: "Gorra Clásica",
        precio:"900",
        productImg:"./integrador/Assets/hat1.jpg",
        category:"accesorios",
        cantidad: 1,
    },

    {
        id:12,
        nombre: "Gorra V2",
        precio:"1100",
        productImg:"./integrador/Assets/hat2.png",
        category:"accesorios",
        cantidad: 1,
    },

    {
        id:13,
        nombre: "Wallet clásica",
        precio:"900",
        productImg:"./integrador/Assets/wallet.png",
        category:"accesorios",
        cantidad: 1,
    },

    {
        id:14,
        nombre: "Wallet",
        precio:"1100",
        productImg:"./integrador/Assets/wallet2.png",
        category:"accesorios",
        cantidad: 1,
    },
]

const splitProducts = (size) => {
    let dividedProducts = [];

    for (let i = 0; i < stockProductos.length; i += size) {
        dividedProducts.push(stockProductos.slice(i, i + size))
    }
    return dividedProducts;
}
const productsController = {
    dividedProducts: splitProducts(5),
    nextProductsIndex: 1,
    productsLimit: splitProducts(5).length,
};