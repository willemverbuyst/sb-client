import BasePage from './basePage'
import { click, typeText } from '../lib/helpers'

export default class LoginPage extends BasePage {
	async addEmail(email) {
		await typeText(page, 'input[name=email]', email)
	}

	async addPassword(password) {
		await typeText(page, 'input[name=password]', password)
	}

	async submitLogin() {
		await click(page, 'button[type=submit]')
	}

	async visitLogin() {
		await page.goto('http://localhost:3000/login')
	}
}
