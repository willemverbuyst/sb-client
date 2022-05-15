import { getText } from '../../lib/helpers'

export default class Alert {
	async getTextAlert() {
		return await await getText(page, '#displayAlert')
	}
}
