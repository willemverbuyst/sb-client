const puppeteer = require('puppeteer')

describe('Application ', () => {
	let browser
	let page

	beforeEach(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		page = await browser.newPage()
	})

	afterEach(async () => {
		await browser.close()
	})

	it.skip('should be visible on desktop', async () => {
		await page.setViewport({ width: 1650, height: 1050 })
		await page.goto('http://localhost:3000/')
		await page.waitForTimeout(2000)
	})

	it.skip('should be visible on tablet', async () => {
		const tablet = puppeteer.devices['iPad landscape']
		await page.emulate(tablet)
		await page.goto('http://localhost:3000/')
		await page.waitForTimeout(2000)
	})

	it.skip('should be visible on mobile', async () => {
		const mobile = puppeteer.devices['iPhone X']
		await page.emulate(mobile)
		await page.goto('http://localhost:3000/')
		await page.waitForTimeout(2000)
	})
})
