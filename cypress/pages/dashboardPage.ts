class DashboardPage {
	verifyDashboard() {
		cy.url().should('include', '/enterprise/dashboard');
	}
}
export default DashboardPage;
