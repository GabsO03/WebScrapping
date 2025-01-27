// const { error } = require("console");
// const { response } = require("express");
import { menu, showResults, productCard, productDetails } from '/templates/results.js';

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
        $('#info').prepend(productCard(producto.img, producto.nombre, url_producto, producto.disponibilidad, producto.precio))
        $('#info').append(menu);
        $('#menu').append(showResults)
        $('#menu').append(productDetails(producto.nombre, producto.detalles));

        $('#info').removeClass('hidden');
        $('#buscador').addClass('hidden');

        const $detailsBtn = $('#detailsbtn');
        $detailsBtn.on('click', function () {
            switch ($detailsBtn.attr('name')) {
                case 'show':
                    $detailsBtn.attr('name', 'hide')
                    $detailsBtn.text('Ver productos');
                    $('#showResult').fadeOut(() => {
                        $('#detailsModal').fadeIn();
                    });

                    break;

                case 'hide':
                    $detailsBtn.attr('name', 'show')
                    $detailsBtn.text('Ver detalles');
                    $('#detailsModal').fadeOut(() => {
                        $('#showResult').fadeIn();
                    });
                    break;
            
                default:
                    break;
            }
        })
    })
    .catch(error => console.log(error))
}