module.exports = {
	click: async (page, selector) => {
		try {
			await page.waitForSelector(selector)
			await page.click(selector)
		} catch (error) {
			throw new Error(`Could not click on selector: ${selector}`)
		}
	},
	getNumberOf: async (page, selector) => {
		try {
			await page.waitForSelector(selector)
			return await page.$$eval(selector, element => element.length)
		} catch (error) {
			throw new Error(`Could not get number of selectors: ${selector}`)
		}
	},
	getText: async (page, selector) => {
		try {
			await page.waitForSelector(selector)
			return await page.$eval(selector, element => element.innerHTML)
		} catch (error) {
			throw new Error(`Could not get text from selector: ${selector}`)
		}
	},
	shoulNotExist: async (page, selector) => {
		try {
			await page.waitForSelector(selector, { hidden: true })
		} catch (error) {
			throw new Error(`Selector: ${selector} is visible but should not be`)
		}
	},
	typeText: async (page, selector, text) => {
		try {
			await page.waitForSelector(selector)
			await page.type(selector, text)
		} catch (error) {
			throw new Error(`Could not type into selector: ${selector}`)
		}
	},
	waitForText: async (page, selector, text) => {
		try {
			await page.waitForSelector(selector)
			await page.waitForFunction((selector, text) => {
				document.querySelector(selector).innerText.includes(text),
					{},
					selector,
					text
			})
		} catch (error) {
			throw new Error(`Text: ${text} not found for selector: ${selector}`)
		}
	},
}
