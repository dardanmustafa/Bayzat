import LogIn from '../pages/loginPage';

const logIn = new LogIn();

Cypress.Commands.add('login', (email, password) => {
	cy.visit('/');

	logIn.clickLoginButton();

	// Enter email address
	logIn.typeLoginEmail(email);

	// Enter password
	logIn.typeLoginPassword(password);

	// Submit (login)
	logIn.submitLogin();
});

Cypress.Commands.add('getBySelector', (selector) => {
	return cy.get(`[data-external-id=${selector}]`);
});
