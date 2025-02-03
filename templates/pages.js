export const menu = () => {
    const menu = $(`
        <div id="menu" class="border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap justify-between -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li class="me-2">
                    <button name="pDetails" class="menuBtn inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                        <svg class="w-6 h-6 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
                        </svg>
                        Producto
                    </button>
                </li>
                <li class="me-2">
                    <button name="pResults" class="menuBtn inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group active">
                        <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>Tablero
                    </button>
                </li>
                <li class="me-2">
                    <button name="pAnalisis" class="menuBtn inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
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

export const buscador = () => {
    const buscador = $(`<div id="buscador" class="px-4 mx-auto max-w-screen-xl text-center py-20 lg:py-50">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-slate-100 md:text-5xl lg:text-6xl">Compara precios</h1>
            <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Pega el url de tu producto y consigue los mejores precios.</p>
            <div class="max-w-xl mx-auto">   
                <label for="url_producto" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="url_producto" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ropa, electrodomésticos, juguetes ..."
                    value="https://www.amazon.es/Sony-Auriculares-Inal%C3%A1mbricos-Bluetooth-Autonom%C3%ADa/dp/B0BTJ8ZXG5/?_encoding=UTF8&pd_rd_w=y4Bqe&content-id=amzn1.sym.4328a7b8-5f03-4da0-ad54-70d51fdff191&pf_rd_p=4328a7b8-5f03-4da0-ad54-70d51fdff191&pf_rd_r=FD8R0FNW0MPDCK1ATZRK&pd_rd_wg=dX3HV&pd_rd_r=6f8f64eb-c40b-4bc1-8be7-966ee43b8660&ref_=pd_hp_d_btf_vday_her&th=1"
                    required />
                    <button id="enviar" type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
                </div>
            </div>
            <p id="error" class="text-red-400 text-pretty mt-5 font-semibold"></p>

            <!-- Cargando -->
            <div class="text-center flex justify-center" id="loading">
            </div>
        </div>`)
    return buscador;
}

export const navbar = (page) => {
    return $(`<header>
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/src/index.html" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/logo.png" class="h-8" alt="Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Compara</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <a href="/src/index.html" class="navbarBtn block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${page == 'index'? '.activeNavbar' : ''}">Inicio</a>
                    </li>
                    <li>
                        <a href="/src/historial.html" class="navbarBtn block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${page == 'historial'? '.activeNavbar' : ''}">Productos</a>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    </header>`)
}

//TODO esto agregar la page