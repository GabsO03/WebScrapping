import { showResults, productCard, productDetails, muestraAnalisis } from './templates/results.js';
import { navbar, menu, buscador, loading } from './templates/pages.js';

// localStorage.clear();


let historial;
async function inicio() {
  //Recuperamos el historial
  $('body').prepend(navbar('index'));
  historial = localStorage.getItem('historial') ? new Map(JSON.parse(localStorage.getItem('historial'))) : new Map();

  if (localStorage.getItem('urlAntigua')) {
    
    const url = localStorage.getItem('urlAntigua');
    $('#main').html(buscador(url));
    $('#main').append(loading);
    await buscar(url);
    localStorage.removeItem('urlAntigua');

  } else {

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
          
          $('#main').append(loading);
  
          await buscar(url_producto, historial);
        }
        else {
          $('#error').text('Introduce una url');
        }
      });
    }
  }


}

inicio();



async function buscar(url_producto) {
  const urlCodificada = encodeURIComponent(url_producto);

  fetch(`http://localhost:3000/api/${urlCodificada}`)
    .then(response => response.json())
    .then(async (producto) => {
      await fetch(`http://localhost:3000/api/compare/${producto.nombre}`)
      .then(response => response.json())
      .then(async (productos) => {
        await pintar(producto, productos);
        
        //Guardamos en el historial
        
        Array.from(historial).forEach(([id, producto_]) => {
          if (producto_.nombre === producto.nombre) {
            historial.delete(producto_.id);
          }
          console.log(producto_.nombre + ' -.-.- ' + producto.nombre);
        }); //Si existe el producto, solo lo quita y lo pone de nuevo

        historial.set(producto.id, producto);

        localStorage.setItem('productoActual', JSON.stringify(producto));
        localStorage.setItem('productosActuales', JSON.stringify(productos));
        localStorage.setItem('historial', JSON.stringify(Array.from(historial)))
      })
    })
    .catch(error => {
      $('#error').text('No encomtramos resultados :(');
      $('#loading').html('');
  
      console.log(error)
    })

}

async function pintar(producto, productos) {

  //Contruyo la página que me mostrará los resultados

  //Primero el producto en sí
  const $info = $(`<div id="info" class="pt-8 lg:pb-8 md:pb-0 flex flex-wrap justify-around">
    </div>`)

  $info.append(productCard(producto.img, producto.nombre, producto.url_producto, producto.disponibilidad, producto.precio, producto.rating))

  //Luego el panel de las comparaciones y el analisis
  const $panel = $('<div id="panel"></div>');
  $panel.append(menu) //El mini menu
  const $current = $('<div id="current"></div>'); //Esto para los resultados
  $current.append(productDetails(producto.nombre, producto.detalles));
  $current.append(showResults(productos))
  $current.append(muestraAnalisis(producto, productos));

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
    localStorage.removeItem('productoActual');
    localStorage.removeItem('productosActuales');
  })
}