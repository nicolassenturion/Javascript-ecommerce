//Constructor
class Producto {
    constructor(id, nombre, categoria, precio, stock, image, disponibilidad) {
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.precio = precio
        this.stock = stock
        this.image = image
        this.disponibilidad = disponibilidad
    }
}

const inventario = [];
//Carrito
const cart = JSON.parse(localStorage.getItem('cart')) || [];

const loadEvents = ()=>
{
    let buttons = document.querySelectorAll('button');
    console.log('buttons: ', buttons);
    for (const button of buttons)
    {
        button.addEventListener('click',()=>{
             //alert con libreria
            prodEnCarrito();
            let prod = cart.find(inventario => inventario.id == button.id);
            if(prod)
            {
                prod.quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            else{
                let prod = inventario.find(inventario => inventario.id == button.id);
                if(prod)
                {
                    let newProduct = {
                        id:prod.id,
                        nombre: prod.nombre, 
                        categoria: prod.categoria, 
                        precio: prod.precio, 
                        stock: prod.stock, 
                        image: prod.image,
                        disponibilidad: prod.disponibilidad,
                        quantity: 1,
                    }
                    cart.push(newProduct);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            }
        })
    }
}

const loadInventario = (inventario) => 
{
    let container = document.querySelector('#container');
//Ciclo carga de productos
    for (const product of inventario)
    {
        let div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.innerHTML = `
            <img class="item-image" src="${product.image}" alt="${product.nombre}">
            <h3 class="item-title">${product.nombre}</h3>
            <h4 class="item-price">Precio $${product.precio}</h4>
            <h4 class="item-details"> ${product.categoria}</h4>
            <h5 class="item-details">Stock: ${product.stock}</h5>
            <button class="button item-button addToCart agregarCarrito" id="${product.id}">Agregar al carrito</button>
        `;
        container.appendChild(div);
    }
    loadEvents();
}

//Libreria, alerta para productos agregados y eliminados
const prodEnCarrito = () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tu producto se ha añadido',
        showConfirmButton: false,
        timer: 1500
      })
}


//Función de orden superior
/*let disponibles = inventario.filter(producto=>producto.disponibilidad== true)
console.log(disponibles)


//Function delete button
function removeShoppingCartItem (event){
    const buttonClicked = event.target;
    buttonClicked.closest('.cart-item').remove();
    quitarProdCarrito();
}
*/
const getData = async () =>
{
    try
    {
        const response = await fetch('/data.json')
        const data = await response.json();
        loadInventario(data);
        inventario.push(...data);
    }
    catch(e)
    {
        console.log(e);
    }
}

getData()












