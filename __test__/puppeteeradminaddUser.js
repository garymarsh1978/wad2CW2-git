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
        await page.goto('http://localhost:3000/adminPostNewUser', { waitUntil: 'domcontentloaded', timeout: 60000});
    
        
        
        
         // Capture screenshot
    
          await   page.waitForSelector('#username');
          await    page.type('#username', 'Herbet');
          await    page.waitForSelector('#role');
          await    page.type('#role', 'admin');
          await    page.waitForSelector('#pass');
          await    page.type('#pass', 'password');
          await    page.screenshot({ path: './screenshots/adminAddUser.png' });
            
        
         await Promise.all([
            page.waitForSelector("#register"),
            page.click("#register"),
            page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        ]);
        await page.screenshot({ path: './screenshots/donated.png' });
     } catch (error) {
         console.error('Error:', error);
     } finally {
         await browser.close();
     }
 }
   
main()