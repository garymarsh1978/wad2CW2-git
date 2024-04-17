const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const username = 'Helen'
    const password = 'Mar00n12'
    try {
        // Login
        await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded', timeout: 60000});
        await page.waitForSelector('#username');
        await page.type('#username',username);
        await page.waitForSelector('#password');
        await page.type('#password', password);
        await Promise.all([
            page.click('#signin'),        ])
        await page.goto('http://localhost:3000/remove', { waitUntil: 'domcontentloaded', timeout: 60000});
    
        
        
        
         // Capture screenshot
         await Promise.all([
             page.waitForSelector('#selectedItems'),
             page.type('#selectedItems', '9RvhDaB5JaF7y8dt'),
             page.screenshot({ path: './screenshots/adminRemoveFood.png' }),
             page.waitForSelector("#submit"),
             page.click("#submit"),
         ]);
         await page.screenshot({ path: './screenshots/pantryRemovedFood.png' });
     } catch (error) {
         console.error('Error:', error);
     } finally {
         await browser.close();
     }
 }
   
main()