/**
 * Crea y muestra una tabla con los resultados de productos encontrados
 * @param {Array<Object>} productosArray Lista de productos a mostrar
 * @returns {JQuery<HTMLElement>} Elemento JQuery que contiene la tabla de productos
 */
export const showResults = (productosArray) => {

    const results = $(`<div id="pResults" class="seccion relative max-w-screen-sm h-130 overflow-x-auto shadow-md  lg:rounded-b-lg current"></div>`)
    if (productosArray.length > 0) {
        let productos = ``;
        productosArray.forEach(producto => {
            productos += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="p-4 flex justify-center">
                        <img src="${producto.img}" class="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch">
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <a href="${producto.url}">${producto.nombre}</a>
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        ${producto.precio}
                    </td>
                </tr>`;
        });
        results.html(`<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr class="text-center">
                <th scope="col" class="px-16 py-3">
                    Imagen
                </th>
                <th scope="col" class="px-6 py-3">
                    Producto
                </th>
                <th scope="col" class="px-6 py-3">
                    Precio
                </th>
            </tr>
        </thead>
        <tbody>
        `+
        productos
        +`
        </tbody>
    </table>`)
    }
    else {
        results.html(`<p class="text-gray-900 dark:text-white">No encontramos otros productos con ese nombre :(</p>`)
    }
    
    
    return results;
}

/**
 * Crea un elemento que muestra los detalles de un producto
 * @param {string} name Nombre del producto
 * @param {Array<string>} detailsArray Lista de detalles del producto
 * @returns {JQuery<HTMLElement>} Div hecho con JQuery con los detalles del producto
 */
export const productDetails = (name, detailsArray) => {
    const texto = detailsArray.map(detail => `<p class="text-gray-500 dark:text-gray-400">${detail}</p>`);

    const details = $(`<div id="pDetails" class="seccion w-full overflow-x-hidden overflow-y-auto max-w-screen-sm hidden">
    <div class="relative w-full max-w-7xl">
        <div class="relative bg-white h-130 lg:rounded-b-lg shadow-sm dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    ${name}
                </h3>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
            ${texto}
            </div>
        </div>
    </div>
    </div>`);

    return details;
}

/**
 * Muestra un análisis comparativo entre el producto actual y otros productos similares
 * @param {Object} producto Producto actual para comparar
 * @param {Array<Object>} productos Lista de productos a comparar con el producto actual
 * @returns {JQuery<HTMLElement>} Un div con el análisis comparativo, mostrando el producto más barato, más caro y el precio medio
 */
export const muestraAnalisis = (producto, productos) => {

    const analisisGeneral = $(`<div id="pAnalisis" class="seccion bg-gray-200 dark:bg-gray-900 p-8 w-full h-130 overflow-x-hidden overflow-y-scroll max-w-screen-sm  lg:rounded-b-lg hidden"></div>`);


    if (productos.length > 0) {
        const { masBarato, masCaro, diferenciaBarato, diferenciaCaro, media, mediaPorcentaje } = analisis(producto, productos);

        const tablaComparativa = $(`<div class="relative overflow-x-auto shadow-md rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Tabla comparativa
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Una comparación entre el producto más barato y el más caro que encontramos</p>
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr class="text-center">
                    <th scope="col" class="px-6 py-3">Imagen</th>
                    <th scope="col" class="px-6 py-3">Producto</th>
                    <th scope="col" class="px-6 py-3">Precio</th>
                    <th scope="col" class="py-3">Rating</th>
                </tr>
            </thead>
            <tbody>
                <!-- Producto -->
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="p-4 flex justify-center">
                        <img src="${producto.img}" class="w-16 md:w-32 rounded-lg" alt="Producto Principal">
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <p><a href="${producto.url}">${producto.nombre.substring(0, producto.nombre.indexOf(','))}</a></p>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Producto actual</span>
                    </td>
                    <td class="px-6 py-4 font-bold text-gray-900 dark:text-white text-center">${producto.precio}</td>
                    <td class="px-2">
                        ${estrellas(producto.rating)}
                    </td>
                </tr>
    
                <!-- Más barato -->
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="p-4">
                        <img src="${masBarato.img}" class="w-16 md:w-32 rounded-lg" alt="Opción Económica">
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <p>${masBarato.nombre.substring(0, masBarato.nombre.indexOf(','))}</p>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Más económico</span>
                    </td>
                    <td class="px-6 py-4 font-bold text-center text-green-600 dark:text-green-400 flex justify-center items-center flex-col">${masBarato.precio}🔽<span class="text-xs text-gray-500 dark:text-gray-400">${diferenciaBarato}€ más barato</span></td>
                    <td class="px-2">
                        ${estrellas(masBarato.rating)}
                    </td>
                </tr>
    
                <!-- Más caro -->
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="p-4">
                        <img src="${masCaro.img}" class="w-16 md:w-32 rounded-lg" alt="Opción Premium">
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <p>${masCaro.nombre.substring(0, masCaro.nombre.indexOf(','))}</p>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Más costoso</span>
                    </td>
                    <td class="px-6 py-4 font-bold text-center text-red-600 dark:text-red-400 flex justify-center items-center flex-col">${masCaro.precio}🔼<span class="text-xs text-gray-500 dark:text-gray-400">${diferenciaCaro}€ más caro</span></td>
                    <td class="px-2">
                        ${estrellas(masCaro.rating)}
                    </td>
                </tr>
            </tbody>
        </table>
        </div>`);
        const barraMedia = $(`<div class="relative overflow-x-auto shadow-md rounded-lg mb-8 p-8 w-full font-bold text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-400 dark:bg-gray-800">
            <caption class="p-5 text-lg text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Precio promedio
            </caption>
            <div class="flex justify-between mb-1">
                <span class="text-base font-medium text-blue-700 dark:text-white">${masBarato.precio}</span>
                <span class="text-sm font-medium text-blue-700 dark:text-white">${masCaro.precio}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style="width: ${mediaPorcentaje}%"> ${media}€</div>
            </div>
        </div>`);
    
        analisisGeneral.append(barraMedia);
        analisisGeneral.append(tablaComparativa);
    }
    else {
        analisisGeneral.html(`<p class="text-gray-900 dark:text-white">No encontramos otros productos con ese nombre :(</p>`)
    }


    return analisisGeneral;
}

/**
 * Crea una tarjeta de producto con imagen, nombre, precio y rating
 * @param {string} img URL de la imagen del producto
 * @param {string} name Nombre del producto
 * @param {string} url URL a la página del producto
 * @param {string} disponibility Estado de disponibilidad del producto
 * @param {string} price Precio del producto en texto
 * @param {float} rating Rating del producto como decimal de 1 al 5
 * @returns {JQuery<HTMLElement>} Un div generado con JQuery que contiene la tarjeta del producto
 */
export const productCard = (img, name, url, disponibility, price, rating) => {
    const card = $(`<div id="productCard" class="w-full max-w-lg lg:mb-0 md:mb-5 sm:mb-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="mx-auto mt-3 rounded-lg" src="
                ${img}
                " alt="product image" style="height:350px"/>
            </a>
            <div class="px-8 pb-5">
                <a href="${url}">
                    <h5 id="productoNombre" class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${name}</h5>
                </a>
                <div class="flex justify-between items-center my-2.5">
                    ${estrellas(rating)}
                    <span id="productDisponibility" class="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-800 ms-3">${disponibility}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span id="productPrice" class="text-xl font-bold text-gray-900 dark:text-white">${price}</span>
                    <a id="new" href="index.html" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar otro</a>
                </div>
            </div>
        </div>`);
    return card;
}




/**
 * Crea un texto simulando las estrellas que representan el rating de un producto
 * @param {float} rating Rating del producto en forma de número entero o decimal
 * @returns {string} Un HTML de las estrellas para pintar directamente
 */
const estrellas = (rating) => {
    const ratingEntero = parseInt(rating);

    const estrellitas = `<div class="flex items-center">
                        <svg class="w-4 h-4 ${ratingEntero >= 1 ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'} ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg class="w-4 h-4 ${ratingEntero >= 2 ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'} ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg class="w-4 h-4 ${ratingEntero >= 3 ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'} ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg class="w-4 h-4 ${ratingEntero >= 4 ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'} ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg class="w-4 h-4 ms-1 ${ratingEntero >= 5 ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <span id="productDisponibility" class="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-800 ms-3">${rating}</span>
                    </div>`;
    return estrellitas;
}

/**
 * Realiza un análisis de precio entre el producto actual y otros productos similares y calcula el más barato, más caro, la diferencia con el precio del producto actual, y el precio medio
 * @param {Object} producto Producto actual para realizar el análisis de precio
 * @param {Array<Object>} productos Lista de productos a comparar con el producto actual
 * @returns {Object} Un objeto que contiene los datos mencionados
 */
const analisis = (producto, productos) => {
    const precio = parseFloat(producto.precio.substring(0, producto.precio.indexOf('€')));
    let masBarato = productos[0];
    let masCaro = productos[0];
    let diferenciaBarato = 0;
    let diferenciaCaro = 0;

    let media = 0;


    productos.forEach(_producto => {
        const precioActual = parseFloat(_producto.precio.substring(0, _producto.precio.indexOf('€')))
        const precioBarato = parseFloat(masBarato.precio.substring(0, masBarato.precio.indexOf('€')))
        const precioCaro = parseFloat(masCaro.precio.substring(0, masCaro.precio.indexOf('€')))
        if (precioActual >= precioCaro) {
            masCaro = _producto
            diferenciaCaro = precioActual - precio;
        }
        if (precioActual <= precioBarato) {
            masBarato = _producto
            diferenciaBarato = precio - precioActual;
        }
        media += precioActual;
    });

    media = media / productos.length;
    const mediaPorcentaje = (media*100)/parseFloat(masCaro.precio.substring(0, masCaro.precio.indexOf('€')))
    //
    return {
        masBarato: masBarato,
        masCaro: masCaro,
        diferenciaBarato: diferenciaBarato,
        diferenciaCaro: diferenciaCaro,
        media: media,
        mediaPorcentaje: mediaPorcentaje
    }
}