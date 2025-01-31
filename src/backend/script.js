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
    const precio = await page.$eval('#corePriceDisplay_desktop_feature_div span.aok-offscreen', span => span.textContent.trim());
    // #landingImage
    let img = await page.$eval('#main-image-container img', img => img.src);
    if (!img.endsWith('.jpg')) {
        img =  await page.$eval('#landingImage', img => img.src);
    }

    // atrr role listitem  span.a-offscreen

    let detalles = await page.$$eval('#productFactsDesktopExpander ul li', lis => {
        return lis.map(li => li.textContent.trim().replaceAll('\n', '').replaceAll('                                                 ', ':'));
    });
    if (detalles.length === 0) {
        detalles = await page.$$eval('#feature-bullets ul li', lis => {
        return lis.map(li => li.textContent.trim().replaceAll('\n', '').replaceAll('                                                 ', ':'));
    });
    }
    const disponibilidad = await page.$eval('#availability span', span => span.textContent.trim())
    
    const producto = {
        nombre: nombre,
        precio: precio,
        img: img,
        detalles: detalles,
        disponibilidad: disponibilidad
    }
    
    console.log(producto);

    await browser.close();
    return producto;
}


// Seguna busqueda
async function secondarySearch(nombre_producto) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://es.aliexpress.com/w/wholesale-${nombre_producto}.html`, { waitUntil: 'domcontentloaded', timeout: 100000 });

    const productos = await page.$$eval('#card-list .search-item-card-wrapper-gallery', items => {
        return items.map(item => {
            const nombre = item.querySelector('.multi--title--nXeOvyr') ? item.querySelector('.multi--title--nXeOvyr').textContent.trim() : item.querySelector('.multi--title--G7dOCj3').textContent.trim();
            const precio = item.querySelector('.multi--price-sale--U-S0jtj') ? item.querySelector('.multi--price-sale--U-S0jtj').textContent.trim() : null;
            const img = item.querySelector('.images--item--3XZa6xf') ? item.querySelector('.images--item--3XZa6xf').src : null;
            const stock = item.querySelector('.multi--trade--Ktbl2jB') ? item.querySelector('.multi--trade--Ktbl2jB').textContent.trim() : 'No especificado';

            return {
                nombre: nombre,
                precio: precio,
                img: img,
                stock: stock
            }
        }).slice(0, 5)
    });

    console.dir(productos);

    await browser.close();
    return productos;
}

