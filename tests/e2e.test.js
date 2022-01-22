import Alert from '../pages/components/alert'
import BasePage from '../pages/basePage'
import LoginPage from '../pages/loginPage'
import NavBar from '../pages/components/navBar'
import { USERNAME, PASSWORD, WELCOME_MESSAGE } from '../config'

const expect = require('chai').expect

describe('End-to-end test', () => {
	let alert
	let basePage
	let loginPage
	let navBar

	jest.setTimeout(15000)
	beforeAll(async () => {
		alert = new Alert()
		basePage = new BasePage()
		loginPage = new LoginPage()
		navBar = new NavBar()
	})

	it('should display login page', async () => {
		await basePage.visitRoot()

		const pageTitle = await loginPage.getPageTitle()
		expect(pageTitle).to.be.a('string', 'Login')
	})

	it('should login successfully with valid credentials', async () => {
		await loginPage.visitLogin()

		// const pageTitle = await loginPage.getPageTitle()
		// expect(pageTitle).to.be.a('string', 'Login')

		await loginPage.addEmail(USERNAME)
		await loginPage.addPassword(PASSWORD)
		await loginPage.submitLogin()

		const display = await alert.getTextAlert()
		expect(display).to.be.a('string', WELCOME_MESSAGE)
	})

	it('should navigate pages', async () => {
		await navBar.clickPredictionIcon()
		await page.waitForTimeout(1000)
		await navBar.clickRoundIcon()
		await page.waitForTimeout(1000)
		await navBar.clickTotoRoundIcon()
		await page.waitForTimeout(1000)
		await navBar.clickTotalTotoIcon()
		await page.waitForTimeout(1000)
		await navBar.clickMyScoresIcon()
		await page.waitForTimeout(1000)
		await navBar.clickPlayersIcon()
		await page.waitForTimeout(1000)
		await navBar.clickProfileIcon()
		await page.waitForTimeout(1000)
		await navBar.clickSignupIcon()
		await page.waitForTimeout(1000)
		await navBar.clickRulesIcon()
		await page.waitForTimeout(1000)
		await navBar.clickProgramIcon()
		await page.waitForTimeout(1000)
	})
})
