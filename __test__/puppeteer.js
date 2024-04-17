const puppeteer = require('puppeteer');
async function main() {
    const browser = await puppeteer.launch( );
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.screenshot({ path: "./screenshots/homePage.png" });
    await browser.close();
}
main();