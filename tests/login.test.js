const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Login with credentials', () => {
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

	it('should login successful', async () => {
		await page.goto('http://localhost:3000/')
		const title = await page.title()
		const brand = await page.$eval('h4', element => element.textContent)
		const urlLogin = page.url()
		const pageTitleLogin = await page.$eval(
			'h3',
			element => element.textContent
		)

		expect(title).to.be.a('string', 'Erpasi')
		expect(brand).to.be.a('string', 'ErPaSitoto')
		expect(urlLogin).to.include('login')
		expect(pageTitleLogin).to.be.a('string', 'Login')

		await page.type('input[name=email]', 'jack@sparrow.com')
		await page.type('input[name=password]', 'jack123')
		await page.click('button[type=submit]')
		await page.waitForTimeout(2000)

		const urlProgramma = page.url()
		const pageTitleProgramma = await page.$eval(
			'h3',
			element => element.textContent
		)

		expect(urlProgramma).to.include('programma')
		expect(pageTitleProgramma).to.be.a('string', 'Programma')
	})

	it('should login successful by pressing enter', async () => {
		await page.goto('http://localhost:3000/')
		const title = await page.title()
		const brand = await page.$eval('h4', element => element.textContent)
		const urlLogin = page.url()
		const pageTitleLogin = await page.$eval(
			'h3',
			element => element.textContent
		)

		expect(title).to.be.a('string', 'Erpasi')
		expect(brand).to.be.a('string', 'ErPaSitoto')
		expect(urlLogin).to.include('login')
		expect(pageTitleLogin).to.be.a('string', 'Login')

		await page.type('input[name=email]', 'jack@sparrow.com')
		await page.type('input[name=password]', 'jack123')
		await page.keyboard.press('Enter', { delay: 10 })
		await page.waitForTimeout(2000)

		const urlProgramma = page.url()
		const pageTitleProgramma = await page.$eval(
			'h3',
			element => element.textContent
		)

		expect(urlProgramma).to.include('programma')
		expect(pageTitleProgramma).to.be.a('string', 'Programma')
	})
})
