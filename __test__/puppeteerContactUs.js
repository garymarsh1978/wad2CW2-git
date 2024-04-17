const puppeteer = require('puppeteer');
async function main() {
    const browser = await puppeteer.launch( );
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/contact');
    await page.screenshot({ path: "./screenshots/ContactUs.png" });
    await browser.close();
}
main();