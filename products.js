const productsList = [
    {
        id: 1,
        productName: "Hoodie",
        value: "$6000",
        productImg: "./integrador/Assets/techhoodie.jpg",
        category: "prendas",
    },

    {
        id: 2,
        productName: "Eva 01 Hoodie",
        value: "$7000",
        productImg: "./integrador/Assets/eva.png",
        category: "prendas",
    },

    {
        id: 3,
        productName: "Parca Mate",
        value: "$5500",
        productImg: "./integrador/Assets/techpark1.png",
        category: "prendas",
    },

    {
        id:4,
        productName: "Jogger Negro",
        value:"$3000",
        productImg:"./integrador/Assets/pants2.jpg",
        category:"prendas",
    },

    {
        id:5,
        productName: "Bolso 15cm",
        value:"$2200",
        productImg:"./integrador/Assets/bolsa.png",
        category:"accesorios",
    },

    {
        id:6,
        productName: "Riñonera",
        value:"$3200",
        productImg:"./integrador/Assets/bolsa2.jpg",
        category:"accesorios",
    },

    {
        id:7,
        productName: "Mochila",
        value:"$3000",
        productImg:"./integrador/Assets/bolsa3.png",
        category:"accesorios",
    },

    {
        id:8,
        productName: "Riñonera V2",
        value:"$3500",
        productImg:"./integrador/Assets/bolsa5.png",
        category:"accesorios",
    },

    {
        id:9,
        productName: "Guantes",
        value:"$1200",
        productImg:"./integrador/Assets/gloves.png",
        category:"accesorios",
    },

    {
        id:10,
        productName: "Guantes P.",
        value:"$1900",
        productImg:"./integrador/Assets/gloves2.png",
        category:"accesorios",
    },

    {
        id:11,
        productName: "Gorra Clásica",
        value:"$900",
        productImg:"./integrador/Assets/hat1.jpg",
        category:"accesorios",
    },

    {
        id:12,
        productName: "Gorra V2",
        value:"$1100",
        productImg:"./integrador/Assets/hat2.png",
        category:"accesorios",
    },

    {
        id:13,
        productName: "Wallet clásica",
        value:"$900",
        productImg:"./integrador/Assets/wallet.png",
        category:"accesorios",
    },

    {
        id:14,
        productName: "Wallet",
        value:"$1100",
        productImg:"./integrador/Assets/wallet2.png",
        category:"accesorios",
    },
]

const splitProducts = (size) => {
    let dividedProducts = [];

    for (let i = 0; i < productsList.length; i += size) {
        dividedProducts.push(productsList.slice(i, i + size))
    }
    return dividedProducts;
}

const productsController = {
    dividedProducts: splitProducts(5),
    nextProductsIndex: 1,
    productsLimit: splitProducts(5).length,
};