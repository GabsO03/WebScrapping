/**
 * @fileoverview Manejo del historial de productos en la aplicación.
 */

import { navbar } from './templates/pages.js';

let historial;
const $main = $('#main');


/**
 *  Función para recuperar el historial y manejar lo que se muestra al inicio
 */
function inicio() {
  //Recuperamos el historial del localStorage
  $('body').prepend(navbar('historial'));
  historial = localStorage.getItem('historial') ? new Map(JSON.parse(localStorage.getItem('historial'))) : new Map();
}

inicio();

const marco = $(`<div class="flex flex-wrap justify-start md:justify-between"></div>`);

/**
 * Genera el HTML para cada producto en el historial
 */
const productos = Array.from(historial).reverse().map(([id, producto]) => {
  const nombreCorto = producto.nombre.indexOf(',') > 0 ? producto.nombre.substring(0, producto.nombre.indexOf(',')) : producto.nombre

  return `<div id="${id}" class="h-full max-w-xs mb-5 mx-1 bg-[#ffc8dd] border border-[#bde0fe] rounded-lg shadow-sm dark:bg-[#8338ec] dark:border-[#00b4d8]">
              <a href="${producto.url_producto}" class="flex justify-center">
                  <img class="w-2/3 m-2.5 rounded-lg" src="${producto.img}" alt="product image">
              </a>
              <div class="px-8 pb-5 flex justify-between">
                  <a href="${producto.url_producto}">
                      <h5 id="productoNombre" class="text-lg font-semibold tracking-tight text-left text-[#00b4d8] dark:text-white">${nombreCorto}</h5>
                  </a>
                  <div class="flex flex-col justify-between items-center">
                      <span id="productPrice" class="text-md font-bold text-[#00b4d8] dark:text-[#ffafcc] px-1">${producto.precio}</span>
                      <span id="productDisponibility" class="bg-[#ffafcc] text-[#00b4d8] text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-[#a2d2ff] dark:text-[#fb8500]">${producto.disponibilidad}</span>
                  </div>
              </div>
              <div class="flex items-center justify-around mb-1.5">
                  <button product_url="${producto.url_producto}" type="button" class="buscarDeNuevo text-white bg-[#fb8500] hover:bg-[#ffafcc] focus:outline-none focus:ring-4 focus:ring-[#ffafcc] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-[#ffd703] dark:hover:bg-[#fb6f92] dark:focus:ring-[#00b4d8]">Buscar de nuevo</button>
                  <button product_id="${id}" class="eliminar text-white bg-[#ff6f92] hover:bg-[#fb8500] focus:outline-none focus:ring-4 focus:ring-[#fb6f92] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-[#fb8500] dark:hover:bg-[#ffafcc] dark:focus:ring-[#8338ec]">Eliminar</button>
              </div>
          </div>`;
});

marco.html(productos);
$main.append(marco);

/**
 * Evento para volver a buscar un producto guardado en el historial
 */
$('.buscarDeNuevo').on('click', function () {
  const url = $(this).attr('product_url');
  localStorage.setItem('urlAntigua', url);
  console.log(url);
  location.href = '/src/index.html';
})

/**
 * Evento para eliminar un producto del historial
 */
$('.eliminar').on('click', function () {
  const id = $(this).attr('product_id');
  historial.delete(id);
  localStorage.setItem('historial', JSON.stringify(Array.from(historial)))
  location.reload();
})