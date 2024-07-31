import { defineConfig } from 'cypress';

export default defineConfig({
	reporter: 'cypress-mochawesome-reporter',
	e2e: {
		experimentalModifyObstructiveThirdPartyCode: true,
		setupNodeEvents(on, config) {
			// implement node event listeners here
			// require('cypress-mochawesome-reporter/plugin')(on);
		},
		baseUrl: 'https://www.bayzat.com/',
	},
	video: true,
	viewportHeight: 1000,
	viewportWidth: 1500,
	defaultCommandTimeout: 6000,
});
