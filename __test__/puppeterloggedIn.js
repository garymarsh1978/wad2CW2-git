const puppeteer = require('puppeteer');
async function main() {
    const browser = await puppeteer.launch({headless: false } );
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
    await page.waitForSelector('#username');
    await page.type('#username', "Stuart");
    await page.waitForSelector('#password');
    await page.type('#password', "Stuart123");
    await page.screenshot({ path: "./screenshots/logIN2.png" });
    await Promise.all([
        page.click('#signin'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

   
    await page.screenshot({ path: './screenshots/loggedIN2.png' });

    await browser.close();
}

main();