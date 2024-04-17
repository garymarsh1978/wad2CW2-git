const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        // Login
        await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded', timeout: 60000});
        await page.waitForSelector('#username');
        await page.type('#username','Renfrewshire');
        await page.waitForSelector('#password');
        await page.type('#password', 'Renfrewshire');
        await Promise.all([
            page.click('#signin'),        ]);
        await page.goto('http://localhost:3000/pantry', { waitUntil: 'domcontentloaded', timeout: 60000});
         // Capture screenshot
         await Promise.all([
             page.waitForSelector('#viewitem'),
             page.click('#viewitem'),
             page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
         ]);
         await page.screenshot({ path: './screenshots/pantryViewItems.png' });
     } catch (error) {
         console.error('Error:', error);
     } finally {
         await browser.close();
     }
 }
   
main()