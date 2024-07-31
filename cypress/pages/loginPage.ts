class LoginPage {
	loginButton = '.style__Text-sc-58yt2r-2.unNmF';
	logInEmailSelector = 'textfield-username';
	logInPasswordSelector = 'password-text-input-password';
	submitLoginButtonSelector = 'submit-button';

	clickLoginButton(): void {
		cy.get(this.loginButton).contains('Login').click();
	}

	typeLoginEmail(email: string): void {
		cy.getBySelector(this.logInEmailSelector).type(email);
	}

	typeLoginPassword(password: string): void {
		cy.getBySelector(this.logInPasswordSelector).type(password);
	}

	submitLogin(): void {
		cy.getBySelector(this.submitLoginButtonSelector).click();
	}

	performLogin(email: string, password: string): void {
		this.clickLoginButton();
		this.typeLoginEmail(email);
		this.typeLoginPassword(password);
		this.submitLogin();
	}

	verifyLogout() {
		cy.url().should('include', 'auth/login');
	}
}

export default LoginPage;
