const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        // Login
        await page.goto('http://localhost:3000/login', {});
        await page.waitForSelector('#username');
        await page.type('#username','Administrator');
        await page.waitForSelector('#password');
        await page.type('#password', 'Administrator');
        await Promise.all([
            page.click('#signin'),        ]);
        await page.goto('http://localhost:3000/messages', {});
         // Capture screenshot
         await page.screenshot({ path: './screenshots/AdminContactmessages.png' });
    
     } catch (error) {
         console.error('Error:', error);
     } finally {
         await browser.close();
     }
 }
   
main()