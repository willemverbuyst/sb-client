import { getText } from '../lib/helpers'
import { BASE_URL } from '../config'

export default class BasePage {
	async getPageTitle() {
		return await getText(page, 'h3')
	}

	async getTitle() {
		return await page.title()
	}

	async getUrl() {
		return await page.url()
	}

	async wait(time) {
		await page.waitForTimeout(time)
	}

	async visitRoot() {
		await page.goto(BASE_URL)
	}
}
