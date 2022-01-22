const puppeteer = require('puppeteer')
const expect = require('chai').expect
const { click, getText, typeText } = require('../../lib/helpers')

describe('Navigation', () => {
	let browser
	let page

	before(async () => {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 0,
			devtools: false,
		})
		page = await browser.newPage()

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
	})

	after(async () => {
		await browser.close()
	})

	it('should start on program page', async () => {
		const urlProgramma = page.url()
		const pageTitleProgramma = await getText(page, 'h3')

		expect(urlProgramma).to.include('programma')
		expect(pageTitleProgramma).to.be.a('string', 'Programma')
	})

	it('should navigate to prediction page', async () => {
		await click(page, 'button[aria-label=prediction]')

		const urlPrediction = page.url()
		const pageTitlePrediction = await getText(page, 'h3')

		expect(urlPrediction).to.include('voorspellingen')
		expect(pageTitlePrediction).to.be.a('string', 'Mijn voorspellingen')
	})

	it('should navigate to round page', async () => {
		await click(page, 'button[aria-label=round]')

		const urlRound = page.url()
		const pageTitleRound = await getText(page, 'h3')

		expect(urlRound).to.include('klassement/ronde')
		expect(pageTitleRound).to.include('Speelronde')
	})

	it('should navigate to toto round page', async () => {
		await click(page, 'button[aria-label="toto round"]')

		const urlRound = page.url()
		const pageTitleRound = await getText(page, 'h3')

		expect(urlRound).to.include('klassement/totoronde')
		expect(pageTitleRound).to.include('Totoronde')
	})

	it('should navigate to total toto page', async () => {
		await click(page, 'button[aria-label="total toto"]')

		const urlRound = page.url()
		const pageTitleRound = await getText(page, 'h3')

		expect(urlRound).to.include('klassement/totaaltoto')
		expect(pageTitleRound).to.be.a('string', 'Totaaltoto')
	})

	it('should navigate to my scores page', async () => {
		await click(page, 'button[aria-label="my scores"]')

		const urlMyScores = page.url()
		const pageTitleMyScores = await getText(page, 'h3')

		expect(urlMyScores).to.include('scores')
		expect(pageTitleMyScores).to.be.a('string', 'Mijn scores')
	})

	it('should navigate to players page', async () => {
		await click(page, 'button[aria-label=players]')

		const urlPlayers = page.url()
		const pageTitlePlayers = await getText(page, 'h3')

		expect(urlPlayers).to.include('spelers')
		expect(pageTitlePlayers).to.be.a('string', 'Spelers')
	})

	it('should navigate to signup page', async () => {
		await click(page, 'button[aria-label="sign up"]')

		const urlSignup = page.url()
		const pageTitleSignup = await getText(page, 'h3')

		expect(urlSignup).to.include('signup')
		expect(pageTitleSignup).to.be.a('string', 'Sign up')
	})

	it('should navigate to profile page', async () => {
		await click(page, 'button[aria-label="profile"]')

		const urlProfile = page.url()
		const pageTitleProfile = await getText(page, 'h3')

		expect(urlProfile).to.include('profiel/edit')
		expect(pageTitleProfile).to.be.a('string', 'Profiel')
	})

	it('should navigate to rules page', async () => {
		await click(page, 'button[aria-label="rules"]')

		const urlRules = page.url()
		const pageTitleRules = await getText(page, 'h3')

		expect(urlRules).to.include('regels')
		expect(pageTitleRules).to.be.a('string', 'Regels')
	})
})
