/**
 * Crea un menú de navegación con botones para los resultados de la busqueda
 * @returns {JQuery<HTMLElement>} Un div con el mini menu generado
 */
export const menu = () => {
    const menu = $(`
        <div id="menu" class="border-b border-gray-700">
            <ul class="flex flex-wrap justify-between -mb-px text-sm font-medium text-center text-gray-400">
                <li class="me-2">
                    <button name="pDetails" class="menuBtn inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-300 group">
                        <svg class="w-6 h-6 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
                        </svg>
                        Producto
                    </button>
                </li>
                <li class="me-2">
                    <button name="pResults" class="menuBtn inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-300 group active">
                        <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>Tablero
                    </button>
                </li>
                <li class="me-2">
                    <button name="pAnalisis" class="menuBtn inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-300 group">
                        <svg class="w-6 h-6 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"/>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"/>
                        </svg>
                        Analisis
                    </button>
                </li>
            </ul>
        </div>
    `);

    return menu;
}


/**
 * Crea un formulario de búsqueda donde el usuario puede pegar una URL de un producto
 * @param {string} [urlAntigua=''] URL ingresado para rellenar el input
 * @returns {JQuery<HTMLElement>} El formulario con el input relleno
 */
export const buscador = (urlAntigua = '') => {
    const buscador = $(`<div id="buscador" class="px-4 mx-auto max-w-screen-xl text-center py-20 lg:py-50">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-slate-100 md:text-5xl lg:text-6xl">Compara precios</h1>
            <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Pega el url de tu producto y consigue los mejores precios.</p>
            <div class="max-w-xl mx-auto">   
                <label for="url_producto" class="mb-2 text-sm font-medium sr-only text-white">Buscar</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="url_producto" class="block w-full p-4 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Ropa, electrodomésticos, juguetes ..."
                    ${urlAntigua? `value="${urlAntigua}"` : ''}
                    required />
                    <button id="enviar" type="submit" class="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Buscar</button>
                </div>
            </div>
            <p id="error" class="text-red-400 text-pretty mt-5 font-semibold"></p>
        </div>`)
    return buscador;
}


/**
 * Crea un navbar con enlaces a las páginas de inicio y productos, destacando la página activa
 * @param {string} page Página activa que se debe resaltar en el navbar
 * @returns {JQuery<HTMLElement>} El navbar generado
 */
export const navbar = (page) => {
    return $(`<header>
    <nav class="border-gray-200 bg-[#291f84]">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/src/index.html" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/logo.png" class="h-8" alt="Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#ffafcc]">Compara</span>
            </a>
            <div class="lg:w-1/5 md:w-1/3 sm:w-1/2">
                <ul class="font-medium flex p-4 md:p-0 mt-4 rounded-lg w-full justify-between rtl:space-x-reverse md:mt-0">
                    <li>
                        <a href="/src/index.html" class="navbarBtn block py-2 px-3 rounded-sm text-[#fffbf0] hover:bg-[#00b4d8] hover:text-white ${page == 'index' ? 'activeNavbar' : ''}">Inicio</a>
                    </li>
                    <li>
                        <a href="/src/historial.html" class="navbarBtn block py-2 px-3 rounded-sm text-[#fffbf0] hover:bg-[#00b4d8] hover:text-white ${page == 'historial' ? 'activeNavbar' : ''}">Productos</a>
                    </li>
                    <li>
                        <a href="/src/manual_usuario.html" class="navbarBtn block py-2 px-3 rounded-sm text-[#fffbf0] hover:bg-[#00b4d8] hover:text-white ${page == 'manual' ? 'activeNavbar' : ''}">Instrucciones</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>`)
}


/**
 * Animación con un SVG para avisar que el porducto se está buscando
 * @returns {JQuery<HTMLElement>} El elemento de carga generado.
 */
export const loading = $(`<!-- Cargando -->
            <div class="text-center flex justify-center" id="loading">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">
                    <circle fill="#ffafcc" stroke="#ffafcc" stroke-width="2" r="7" cx="17" cy="50">
                        <animate attributeName="cx" calcMode="spline" dur="2s" values="17;83;83;17;17" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate>
                    </circle>
                    <circle fill="#a2d2ff" stroke="#a2d2ff" stroke-width="2" opacity=".8" r="7" cx="17" cy="50">
                        <animate attributeName="cx" calcMode="spline" dur="2s" values="17;83;83;17;17" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate>
                    </circle>
                    <circle fill="#fb6f92" stroke="#fb6f92" stroke-width="2" opacity=".6" r="7" cx="17" cy="50">
                        <animate attributeName="cx" calcMode="spline" dur="2s" values="17;83;83;17;17" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate>
                    </circle>
                    <circle fill="#00b4d8" stroke="#00b4d8" stroke-width="2" opacity=".4" r="7" cx="17" cy="50">
                        <animate attributeName="cx" calcMode="spline" dur="2s" values="17;83;83;17;17" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate>
                    </circle>
                    <circle fill="#FFF" stroke="#FFF" stroke-width="2" opacity=".2" r="7" cx="17" cy="50">
                        <animate attributeName="cx" calcMode="spline" dur="2s" values="17;83;83;17;17" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate>
                    </circle>
                </svg>
            </div>`);
