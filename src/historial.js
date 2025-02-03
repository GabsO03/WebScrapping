import { navbar } from '/templates/pages.js';
let historial;
function inicio() {
  //Recuperamos el historial
  $('body').prepend(navbar('historial'));
  historial = localStorage.getItem('historial') ? JSON.parse(localStorage.getItem('historial')) : new Set();
}

inicio();

// const productos = Object.values(historial).forEach(producto => {
//     return `<div id="" class="h-auto w-full max-w-lg lg:mb-0 md:mb-5 sm:mb-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                 <a href="#">
//                     <img class="max-w-full rounded-t-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="product image">
//                 </a>
//                 <div class="px-8 pb-5">
//                     <a href="${producto.url}">
//                         <h5 id="productoNombre" class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${name}</h5>
//                     </a>
//                     <div class="flex justify-between items-center my-2.5">
//                         <span id="productPrice" class="text-xl font-bold text-gray-900 dark:text-white">${price}</span>
//                         <span id="productDisponibility" class="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-800 ms-3">${producto.disponibilidad}</span>
//                     </div>
//                     <div class="flex items-center justify-between">
//                         <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar de nuevo</button>
//                         <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
//                     </div>
//                 </div>
//             </div>`;
// });