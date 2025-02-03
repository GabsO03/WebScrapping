const puppeteer = require('puppeteer');

const express = require('express');
const app = express();
const cors = require('cors');
const { request } = require('http');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
app.get('/', (req, res) => {
    res.send(`<h2>Hola desde ${req.baseUrl}</h2>`);
});
app.get('/api/:url', async (request, response) => {
    const url = decodeURIComponent(request.params.url);
    const data = await initialSearch(url);
    response.json(data)
})

app.get('/api/compare/:nombre', async (request, response) => {
    const nombre = request.params.nombre;
    const data = await secondarySearch(nombre);
    response.json(data)
})


// Primera busqueda
async function initialSearch(url_producto) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url_producto, { waitUntil: 'domcontentloaded', timeout: 100000 });

    const nombre = await page.$eval('#productTitle', span => span.textContent.trim());
    const precioEntero = await page.$eval('.a-price-whole', span => span.textContent.trim());
    const precioFraction = await page.$eval('.a-price-fraction', span => span.textContent.trim());
    const precio = precioEntero + precioFraction + '€'
    let img = await page.$eval('#main-image-container img', img => img.src);
    if (!img.endsWith('.jpg')) {
        img =  await page.$eval('#landingImage', img => img.src);
    }
    let detalles = await page.$$eval('#productFactsDesktopExpander ul li', lis => {
        return lis.map(li => li.textContent.trim().replaceAll('\n', '').replaceAll('                                                 ', ':'));
    });
    if (detalles.length === 0) {
        detalles = await page.$$eval('#feature-bullets ul li', lis => {
        return lis.map(li => li.textContent.trim().replaceAll('\n', '').replaceAll('                                                 ', ':'));
        });
    }
    const disponibilidad = await page.$eval('#availability span', span => span.textContent.trim())

    const rating = await page.$eval('#acrPopover span.a-size-base', span => span? span.textContent.trim() : false)
    
    const producto = {
        nombre: nombre,
        precio: precio,
        img: img,
        detalles: detalles,
        disponibilidad: disponibilidad != ''? disponibilidad : 'Sin stock',
        rating: rating? parseFloat(rating) : null,
        url_producto: url_producto
    }
    
    console.log(producto);

    await browser.close();
    return producto;
}


// Seguna busqueda
async function secondarySearch(nombre_producto) {
    let browser1;
    let nombreLimpio = nombre_producto.substring(0, nombre_producto.indexOf(','));

    let productos = [];

    //Buscando en aliexpress
    try {
        browser1 = await puppeteer.launch();
        const page = await browser1.newPage();

        nombreLimpio = nombreLimpio.replaceAll(' ', '-');
        await page.goto(`https://es.aliexpress.com/w/wholesale-${nombreLimpio}.html?spm=a2g0o.productlist.search.0`, { waitUntil: 'domcontentloaded', timeout: 100000 })

        const aliexpress = await page.$$eval('#card-list .search-item-card-wrapper-gallery', items => {
            return items.map(item => {
                const nombre = item.querySelector('.multi--title--nXeOvyr') ? item.querySelector('.multi--title--nXeOvyr').textContent.trim() : item.querySelector('.multi--title--G7dOCj3').textContent.trim();
                const precio = item.querySelector('.multi--price-sale--U-S0jtj') ? item.querySelector('.multi--price-sale--U-S0jtj').textContent.trim() : null;
                const img = item.querySelector('.images--item--3XZa6xf') ? item.querySelector('.images--item--3XZa6xf').src : null;
                const ratingDiv = item.querySelector('.multi--starList--t9_CAj2')? item.querySelector('.multi--starList--t9_CAj2') : null;
                const estrellasRellenos = ratingDiv? ratingDiv.querySelectorAll('.multi--progress--2E4WzbQ') : [];
                const ratingReal = (estrellas) => {
                    let rating = 0;
                    estrellas.forEach(estrella => {
                        rating += parseFloat(estrella.style.width);
                    });
                
                    return rating / 10; 
                }
                const url = item.querySelector('.multi--container--1UZxxHY .cards--card--3PJxwBm .search-card-item') ? item.querySelector('.multi--container--1UZxxHY .cards--card--3PJxwBm .search-card-item').href.trim() : '';
                
                return {
                    nombre: nombre,
                    precio: precio,
                    img: img,
                    rating: ratingReal(estrellasRellenos),
                    url: url
                }
            }).slice(0, 5)
        });

        productos = productos.concat(aliexpress);
    } catch (error) {
        console.error('No se encontraron resultados en aliexpress')
    } finally {
        await browser1.close();
    }

    console.dir(productos);

    return productos;
}


    // //Buscando en Wallapop
    // try {
    //     browser2 = await puppeteer.launch();
    //     const page = await browser2.newPage();

    //     nombreLimpio = nombreLimpio.replaceAll('-', '%20');

    //     await page.goto(`https://es.wallapop.com/app/search?filters_source=recent_searches&keywords=${nombreLimpio}`, { waitUntil: 'domcontentloaded', timeout: 100000 })
    //     console.log(`https://es.wallapop.com/app/search?filters_source=recent_searches&keywords=${nombreLimpio}`);

    //     const wallapop = await page.$$eval('.ItemCardList', items => {
    //         return items.map(item => {
    //             console.log('buscando afddfs');
    //             const nombre = item.querySelector('ItemCard__title') ? item.querySelector('ItemCard__title').textContent.trim() : 'No disponible';
    //             const precio = item.querySelector('.ItemCard__price') ? item.querySelector('.ItemCard__price').textContent.trim() : null;
    //             const img = item.querySelector('.ItemCard__image img') ? item.querySelector('.ItemCard__image img').src : null;

    //             return {
    //                 nombre: nombre,
    //                 precio: precio,
    //                 img: img,
    //                 rating: 'No disponible'
    //             }
    //         }).slice(0, 5)
    //     });
    //     console.log('Buscando en wallapop');
    //     productos = productos.concat(wallapop);
    //     console.dir(productos);
    // } catch (error) {
    //     console.error('No se encontraron resultados en wallapop')
    // } finally {
    //     await browser2.close();
    // }
