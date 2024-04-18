const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const username = 'Administrator'
    const password = 'Administrator'
    try {
        // Login
        await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded', timeout: 60000});
        await page.waitForSelector('#username');
        await page.type('#username',username);
        await page.waitForSelector('#password');
        await page.type('#password', password);
        await Promise.all([
            page.click('#signin'),        ])
        await page.goto('http://localhost:3000/deposit', { waitUntil: 'domcontentloaded', timeout: 60000});
    
        
        
        
         // Capture screenshot
         await Promise.all([
             page.waitForSelector('#selectedItems'),
             page.type('#selectedItems', 'mTZ3K41ZmtNQngxs'),
             page.screenshot({ path: './screenshots/adminDepositItem.png' }),
             page.waitForSelector("#deposit"),
             page.click("#deposit"),
         ]);
         await page.screenshot({ path: './screenshots/pantryadminDeposited.png' });
     } catch (error) {
         console.error('Error:', error);
     } finally {
         await browser.close();
     }
 }
   
main()