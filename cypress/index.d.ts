/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject> {
		login(email: string, password: string): Chainable<Subject>;
		logout(): Chainable<Subject>;
		getBySelector(selector: string): Chainable<Subject>;
	}
}
