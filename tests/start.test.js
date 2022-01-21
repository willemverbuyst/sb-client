const puppeteer = require('puppeteer')

describe('My first puppeteer test', () => {
	it('should load the browser', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		const page = await browser.newPage()

		await page.goto('http://localhost:3000/')
		await page.waitForSelector('h4')
		await page.reload()
		await page.waitForTimeout(2000)
		await page.waitForSelector('h4')
		await browser.close()
	})
})
