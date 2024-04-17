const puppeteer = require('puppeteer');
async function main() {
    const browser = await puppeteer.launch({headless: false } );
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/register', { waitUntil: 'networkidle0' });
    await page.waitForSelector('#username');
    await page.type('#username', "Emily");
    await page.waitForSelector('#role');
    await page.type('#role', "normalUser");
    await page.waitForSelector('#pass');
    await page.type('#pass', "Emily123");
    await page.screenshot({ path: './screenshots/register.png' });
    await Promise.all([
        page.click('#register'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

   
    await page.screenshot({ path: './screenshots/registered.png' });

    await browser.close();

}

main();