const loadEvents = () =>
{
    const btn = document.querySelector('#checkout')
    btn.addEventListener('click', ()=>{
        Swal.fire('¡Gracias por su compra!')
        localStorage.removeItem('cart');
        setTimeout(saludos,2000);
    });
    const deleteButtons = document.querySelectorAll('.delete-button');
    for (const button of deleteButtons) {
        button.addEventListener('click',()=>{
            const newCart = shopCart.filter(element => element.id != button.id);
            localStorage.setItem('cart', JSON.stringify(newCart));
            location.reload(true);
        })
    }
}

function saludos (){
    location.reload(true);
}

const updateCart = (cart) =>
{
    let cartContainer = document.querySelector('#cart'); 

    let container = document.querySelector('#cartContainer')
    if(container)
    {
        container.parentNode.removeChild(container)
    }

    let div = document.createElement('div');
    div.setAttribute('id', 'cartContainer');
    div.innerHTML +=` <h2>Carrito de compras</h2>`;
    for (const product of cart) 
    {
        div.innerHTML +=`
            <div class="cart-item">
                <h4>Producto: ${product.nombre}</h4>
                <h4>Precio: ${product.precio}</h4>
                <h4>Cantidad: ${product.quantity}</h4>
                <button class="delete-button" id="${product.id}">X</button>
            </div>
        `;
    }
    const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0 );
    div.innerHTML +=`
        <div class="cart-item">
            <h4>Total: ${total.toFixed(2)}</h4>
        </div>
    `;

    //<button class="btn btn-danger buttonDelete" type="button">X</button>

    div.innerHTML +=  ` <button id="checkout">Finalizar compra</button> `;
    cartContainer.appendChild(div);
    loadEvents();
}

const shopCart = JSON.parse(localStorage.getItem('cart')) || []
updateCart(shopCart);


//Mensaje eliminar producto
const quitarProdCarrito = () => {
    Swal.fire({
        title: 'Eliminar el producto?',
        text: "Esto quitará el producto del carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Producto eliminado del carrito!',
            '¿No sabés qué comprar? ¡Miles de productos te esperan!.',
            'success'
          )
        }
      })
}
