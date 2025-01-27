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

    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36');

    await page.goto(url_producto, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const nombre =  await page.$eval('#productTitle', span => span.textContent.trim());
    const precio =  await page.$eval('#corePriceDisplay_desktop_feature_div span.aok-offscreen', span => span.textContent.trim());
    const img =  await page.$eval('#main-image-container img', img => img.src);
    const detalles = await page.$$eval('#productFactsDesktopExpander ul li', lis => {
        return lis.map(li => li.textContent.trim().replaceAll('\n', '').replaceAll('                                                 ', ':'));
    });
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

// initialSearch('https://m.shein.com/es/SHEIN-MOD-Off-Shoulder-Frill-Trim-Flounce-Sleeve-Bell-Sleeves-White-Dress-p-17939223.html?mallCode=1&src_module=all&src_identifier=on%3DCATEGORY_RECOMMEND_COMPONENT%60cn%3Dsbc%60hz%3D0%60ps%3D3_2_5%60jc%3Dreal_12472&src_tab_page_id=page_home1737621296748&showFeedbackRec=1&pageListType=4&imgRatio=3-4');