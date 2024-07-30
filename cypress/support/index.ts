Cypress.on('uncaught:exception', (err) => {
	// Ignore the error if it contains 'sitekey'
	if (err.message.includes('sitekey')) {
		return false;
	}
	// Otherwise, let the error be thrown
	return true;
});
