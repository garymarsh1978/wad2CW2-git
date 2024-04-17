const puppeteer = require('puppeteer');
async function main() {
    const browser = await puppeteer.launch({headless: false } );
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
    await page.waitForSelector('#username');
    await page.type('#username', "Administrator");
    await page.waitForSelector('#password');
    await page.type('#password', "Administrator");
    await page.screenshot({ path: "./screenshots/logINAdmin.png" });
    await Promise.all([
        page.click('#signin'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

   
    await page.screenshot({ path: './screenshots/loggedINAdmin.png' });

    await browser.close();
}

main();