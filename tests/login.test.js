const puppeteer = require('puppeteer')

describe('Login with credentials', () => {
	it('should login successful', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		const page = await browser.newPage()

		await page.goto('http://localhost:3000/')
		await page.type('input[name=email]', 'jack@sparrow.com')
		await page.type('input[name=password]', 'jack123')
		await page.click('button[type=submit]')
		await page.waitForTimeout(4000)
		await browser.close()
	})
})
