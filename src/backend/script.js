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

// Implementar web scraping para extraer:
// Nombre del producto
// Precio actual
// Imagen del producto
// Características básicas
// Disponibilidad

async function initialSearch(url_producto) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url_producto, { waitUntil: 'domcontentloaded', timeout: 70000 });

    const nombre =  await page.$eval('#productTitle', span => span.textContent.trim());
    const precio =  await page.$eval('#corePriceDisplay_desktop_feature_div span.aok-offscreen', span => span.textContent.trim());
    // #landingImage
    let img =  await page.$eval('#main-image-container img', img => img.src);
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
    
    const producto = {
        nombre: nombre,
        precio: precio,
        img: img,
        detalles: detalles,
        disponibilidad: disponibilidad
    }
    
    await browser.close();
    return producto;
} 