const puppeteer = require('puppeteer')
const expect = require('chai').expect
const { click, getText, typeText } = require('../../lib/helpers')

describe('Login', () => {
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

	it('should login successfully with valid credentials', async () => {
		await page.goto('http://localhost:3000/')
		const title = await page.title()
		const brand = await getText(page, 'h4')
		const urlLogin = page.url()
		const pageTitleLogin = await getText(page, 'h3')

		expect(title).to.be.a('string', 'Erpasi')
		expect(brand).to.be.a('string', 'ErPaSitoto')
		expect(urlLogin).to.include('login')
		expect(pageTitleLogin).to.be.a('string', 'Login')

		await typeText(page, 'input[name=email]', 'jack@sparrow.com')
		await typeText(page, 'input[name=password]', 'jack123')
		await click(page, 'button[type=submit]')

		const message = await getText(page, '#displayAlert')
		expect(message).to.be.a('string', 'Welcome back Sparrow')

		await page.waitForTimeout(2000)

		const urlProgramma = page.url()
		const pageTitleProgramma = await getText(page, 'h3')

		expect(urlProgramma).to.include('programma')
		expect(pageTitleProgramma).to.be.a('string', 'Programma')
	})

	it('should login successfully with valid credentials by pressing enter', async () => {
		await page.goto('http://localhost:3000/')
		const title = await page.title()
		const brand = await getText(page, 'h4')
		const urlLogin = page.url()
		const pageTitleLogin = await getText(page, 'h3')

		expect(title).to.be.a('string', 'Erpasi')
		expect(brand).to.be.a('string', 'ErPaSitoto')
		expect(urlLogin).to.include('login')
		expect(pageTitleLogin).to.be.a('string', 'Login')

		await typeText(page, 'input[name=email]', 'jack@sparrow.com')
		await typeText(page, 'input[name=password]', 'jack123')
		await page.keyboard.press('Enter', { delay: 10 })
		await page.waitForTimeout(2000)

		const urlProgramma = page.url()
		const pageTitleProgramma = await getText(page, 'h3')

		expect(urlProgramma).to.include('programma')
		expect(pageTitleProgramma).to.be.a('string', 'Programma')
	})

	it('should login unsuccessfully with invalid credentials', async () => {
		await page.goto('http://localhost:3000/')
		const title = await page.title()
		const brand = await getText(page, 'h4')
		const urlLogin = page.url()
		const pageTitleLogin = await getText(page, 'h3')

		expect(title).to.be.a('string', 'Erpasi')
		expect(brand).to.be.a('string', 'ErPaSitoto')
		expect(urlLogin).to.include('login')
		expect(pageTitleLogin).to.be.a('string', 'Login')

		await typeText(page, 'input[name=email]', 'jack@sparrow.com')
		await typeText(page, 'input[name=password]', 'jack1234')
		await click(page, 'button[type=submit]')

		const message = await getText(page, '#displayAlert')
		expect(message).to.be.a(
			'string',
			'No user found with that email address and password!'
		)

		await page.waitForTimeout(2000)

		expect(urlLogin).to.include('login')
		expect(pageTitleLogin).to.be.a('string', 'Login')
	})
})
