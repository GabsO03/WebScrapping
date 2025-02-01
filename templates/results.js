//TODO: reemplazar los elementos para que muestre los respectivos secciones
export const showResults = (productosArray) => {

    let productos = ``;
    productosArray.forEach(producto => {
        productos += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="p-4">
                    <img src="${producto.img}" class="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch">
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${producto.nombre}
                </td>
                <td class="px-6 py-4">
                    ${producto.stock}
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${producto.precio}
                </td>
            </tr>`;
    });
    
    const results = $(`<div id="pResults" class="seccion relative max-w-screen-sm h-130 overflow-x-auto shadow-md current">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-16 py-3">
                    <span class="sr-only">Imagen</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    Producto
                </th>
                <th scope="col" class="px-6 py-3">
                    Stock
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
    </table>
    </div>`);
    return results;
}


export const productDetails = (name, detailsArray) => {
    const texto = detailsArray.map(detail => `<p class="text-gray-500 dark:text-gray-400">
        ${detail}
    </p>`);
    const details = $(`<div id="pDetails" class="seccion w-full overflow-x-hidden overflow-y-auto max-w-screen-sm hidden">
    <div class="relative w-full max-w-7xl max-h-full">
        <div class="relative bg-white lg:rounded-lg shadow-sm dark:bg-gray-700">
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

export const productCard = (img, name, url, disponibility, price) => {
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
                    <span id="productPrice" class="text-xl font-bold text-gray-900 dark:text-white">${price}</span>
                    <span id="productDisponibility" class="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-800 ms-3">${disponibility}</span>
                </div>
                <div class="flex items-center justify-around">
                    <a id="new" href="/" class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:gray:bg-blue-700 dark:focus:ring-gray-800">Buscar otro</a>
                </div>
            </div>
        </div>`);
    return card;
}