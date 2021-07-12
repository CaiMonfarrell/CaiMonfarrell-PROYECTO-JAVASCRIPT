$(window).on('load', function() {
    console.log("DOMContentLoaded (IMAGENES TAMBIEN)");
});

function ValidarFormulario(e) {
	e.preventDefault();
	let fecha = new Date();
    alert("Consulta enviada el día " + fecha);
}

let boton = document.getElementById("miBoton");
boton.addEventListener("click", ValidarFormulario);


function capturarEnter(e) {
    if (e.keyCode == 13 || e.which == 13) {
        console.log("Enter detectado!");
    }
}

$("input").change(function(e) {
    console.log("Valor ingresado en la caja input " + e.target.type + ": " + e.target.value);
});

/* Selectores */
const listaProductos = document.querySelector('#lista-productos');
const tableCarrito = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let carrito = [];

/* Listeners */
$('#lista-productos').on('click', agregarProducto);
$('#lista-carrito tbody').click(borrarProducto);

// listaProductos.addEventListener('click', agregarProducto);
// tableCarrito.addEventListener('click', borrarProducto);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);
document.addEventListener('DOMContentLoaded', () => {

    if (JSON.parse(localStorage.getItem('carrito'))) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        insertarCarritoHTML();
    }
});

function vaciarCarrito() {
    carrito = [];
    insertarCarritoHTML();
}


function borrarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains("borrar-producto")) {
        
        const productoId = e.target.getAttribute('data-id');
        carrito = carrito.filter(producto => producto.id !== productoId);
        insertarCarritoHTML();
    }
}

function agregarProducto(e) {
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")){ 
        const cardProducto = e.target.parentElement.parentElement;
        
        obtenerDatosProducto(cardProducto);
    }
}

function obtenerDatosProducto(cardProducto) {

    const productoAgregado = {
        imagen: cardProducto.querySelector('img').src,
        nombre: cardProducto.querySelector('h5').textContent,
        precio: cardProducto.querySelector('.precio').textContent,
        cantidad: 1,
        id: cardProducto.querySelector('a').getAttribute('data-id')
    }
   
    const existe = carrito.some(producto => producto.id === productoAgregado.id);

    if (existe) {
        const productos = carrito.map(producto => {
            if (producto.id === productoAgregado.id) {
                producto.cantidad++;
                producto.precio = `$${Number(productoAgregado.precio.slice(1)) * producto.cantidad}`
            } else {
            }
            return producto;
        });
        carrito = [...productos];
    } else {
        carrito = [...carrito, productoAgregado];
    }

   insertarCarritoHTML();
}

function insertarCarritoHTML() {

    borrarCarritoHTML();

    carrito.forEach(producto => {
        /* Destructuring de objetos */
        const { imagen, nombre, precio, cantidad, id } = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width='100%'>
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-producto" data-id="${id}">X</a>
        </td>
        `
        tableCarrito.appendChild(row);
    });
    guardarCarritoStorage();
}

function borrarCarritoHTML() {

    while (tableCarrito.firstChild) {
        tableCarrito.removeChild(tableCarrito.firstChild);
    }
}

function guardarCarritoStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}




function saludar(){
    respuesta = prompt ("Ingresar Edad: ");
    if (respuesta >= 18){
        alert ("Bienvenido a Un Vinito! La mejor vinoteca Online.");
    } else {
        alert("La venta de alcohol está prohibida para menores de 18 años. Lo sentimos!")
    }
}

saludar ()
