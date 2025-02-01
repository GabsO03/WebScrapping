import { showResults, productCard, productDetails } from '/templates/results.js';
import { menu, buscador } from '/templates/pages.js';


//Recuperamos el historial
let historial = localStorage.getItem('historial') ? localStorage.getItem('historial') : [];
// localStorage.clear();
if (localStorage.getItem('productoActual')) {
  //Si ya tenemos un producto, no es necesario hacer la busqueda nuevamente y solo pintamos
  const producto = JSON.parse(localStorage.getItem('productoActual'));
  const productos = JSON.parse(localStorage.getItem('productosActuales'));

  await pintar(producto, productos);

} else {
  $('#main').html(buscador);

  $("#enviar").on('click', async () => {
    const url_producto = $('#url_producto').val();
    if(url_producto) {
      $('#error').text();
      $('#loading').html(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">
                    <circle fill="#FFF" stroke="#FFF" stroke-width="2" r="7" cx="17" cy="50">
                      <animate attributeName="cx" calcMode="spline" dur="2s" values="17;83;83;17;17" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate>
                    </circle>
                    <circle fill="#FFF" stroke="#FFF" stroke-width="2" opacity=".8" r="7" cx="17" cy="50">
                      <animate attributeName="cx" calcMode="spline" dur="2s" values="17;83;83;17;17" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate>
                    </circle>
                    <circle fill="#FFF" stroke="#FFF" stroke-width="2" opacity=".6" r="7" cx="17" cy="50">
                      <animate attributeName="cx" calcMode="spline" dur="2s" values="17;83;83;17;17" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate>
                    </circle>
                    <circle fill="#FFF" stroke="#FFF" stroke-width="2" opacity=".4" r="7" cx="17" cy="50">
                      <animate attributeName="cx" calcMode="spline" dur="2s" values="17;83;83;17;17" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate>
                    </circle>
                    <circle fill="#FFF" stroke="#FFF" stroke-width="2" opacity=".2" r="7" cx="17" cy="50">
                      <animate attributeName="cx" calcMode="spline" dur="2s" values="17;83;83;17;17" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate>
                    </circle>
      </svg>`)

      const urlCodificada = encodeURIComponent(url_producto);
      await buscar(urlCodificada);
    }
    else {
      $('#error').text('Introduce una url');
    }
  });
}


async function buscar(url_producto) {

  fetch(`http://localhost:3000/api/${url_producto}`)
    .then(response => response.json())
    .then(async (producto) => {
      await fetch(`http://localhost:3000/api/compare/${producto.nombre}`)
      .then(response => response.json())
      .then(async (productos) => {
        await pintar(producto, productos);
        
        //Guardamos en el historial
        historial.push(producto);
        localStorage.setItem('productoActual', JSON.stringify(producto));
        localStorage.setItem('productosActuales', JSON.stringify(productos));
      })
    })
    .catch(error => {
      $('#error').text('La url que ingresaste no es valida');
      $('#loading').html('');
  
      console.log(error)
    })

}

async function pintar(producto, productos) {

  //Contruyo la página que me mostrará los resultados

  //Primero el producto en sí
  const $info = $(`<div id="info" class="pt-8 lg:pb-8 md:pb-0 flex flex-wrap justify-around">
    </div>`)

  $info.append(productCard(producto.img, producto.nombre, producto.url_producto, producto.disponibilidad, producto.precio))

  //Luego el panel de las comparaciones y el analisis
  const $panel = $('<div id="panel"></div>');
  $panel.append(menu) //El mini menu
  const $current = $('<div id="current"></div>'); //Esto para los resultados
  $current.append(productDetails(producto.nombre, producto.detalles));
  $current.append(showResults(productos))

  //Juntamos todo
  $panel.append($current)
  $info.append($panel);

  $('#main').html($info); //Lo mostramos

  //Configuramos los botones del menu
  const $menuBtns = $('.menuBtn');

  $menuBtns.on('click', function () {
      const nombre = $(this).attr('name');
      $menuBtns.removeClass('active');
      $(this).addClass('active');
      console.log(nombre);
      $('.seccion').addClass('hidden');
      $('.seccion').removeClass('current');
      $(`#${nombre}`).removeClass('hidden');
      $(`#${nombre}`).addClass('current')
  });

  $('#new').on('click', () => {
    
  })
}