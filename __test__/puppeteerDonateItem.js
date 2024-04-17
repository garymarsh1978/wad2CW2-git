const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        // Login
        await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
        await page.waitForSelector('#username');
        await page.type('#username', 'Gary');
        await page.waitForSelector('#password');
        await page.type('#password', 'Mar00n12');
        await Promise.all([
            page.click('#signin'),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);

        // Navigate to newfood page
        await page.goto('http://localhost:3000/newfood', { waitUntil: 'domcontentloaded', timeout: 60000});
        await page.waitForSelector('#donator');
        await page.type('#donator', 'Gary Marsh');
        await page.waitForSelector('#foodType');
        await page.type('#foodType', 'Apples');
        await page.waitForSelector('#quantity');
        await page.type('#quantity', '2kg');
        await page.waitForSelector('#harvestDate');
        await page.type('#harvestDate', '2024-04-16');

        // Capture screenshots
        await page.screenshot({ path: './screenshots/donate.png' });
        await Promise.all([
            page.click('#add'),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);
        await page.screenshot({ path: './screenshots/donated.png' });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}
main()