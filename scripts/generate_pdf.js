const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Use localhost since Tailwind CDN needs network access
  await page.goto('http://localhost:8000/assets/resume.html', { waitUntil: 'networkidle0', timeout: 30000 });
  
  // Wait for Tailwind to process and fonts to load
  await new Promise(r => setTimeout(r, 4000));
  
  await page.pdf({
    path: path.resolve(__dirname, '../assets/mikhail-savushkin-resume.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: false,
  });
  
  console.log('PDF generated successfully!');
  await browser.close();
})();
