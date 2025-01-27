// const { error } = require("console");
// const { response } = require("express");

$("#enviar").on('click', async () => {
    const $url_producto = $('#url_producto').val();
    if($url_producto) {
        await buscar($url_producto);
    }
});

async function buscar(url_producto) {
    const urlCodificada = encodeURIComponent(url_producto);
    fetch(`http://localhost:3000/api/${urlCodificada}`)
    .then(response => response.json())
    .then((producto) => {
        $('#productoImg').attr('src', producto.img);
        $('#productoImg').attr('alt', producto.nombre);
        $('#productoNombre').text(producto.nombre);
        

        $('#info').removeClass('hidden');
        $('#buscador').addClass('hidden');
    })
    .catch(error => console.log(error))
}