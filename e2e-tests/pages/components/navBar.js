import { click } from '../../lib/helpers'

export default class NavBar {
	async clickPredictionIcon() {
		await click(page, 'button[aria-label=prediction]')
	}

	async clickProgramIcon() {
		await click(page, 'button[aria-label=program]')
	}

	async clickRoundIcon() {
		await click(page, 'button[aria-label=round]')
	}

	async clickTotoRoundIcon() {
		await click(page, 'button[aria-label="toto round"]')
	}

	async clickTotalTotoIcon() {
		await click(page, 'button[aria-label="total toto"]')
	}

	async clickMyScoresIcon() {
		await click(page, 'button[aria-label="my scores"]')
	}

	async clickPlayersIcon() {
		await click(page, 'button[aria-label="players"]')
	}

	async clickProfileIcon() {
		await click(page, 'button[aria-label="profile"]')
	}

	async clickSignupIcon() {
		await click(page, 'button[aria-label="sign up"]')
	}

	async clickRulesIcon() {
		await click(page, 'button[aria-label="rules"]')
	}
}
