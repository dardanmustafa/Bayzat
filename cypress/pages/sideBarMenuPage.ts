class SidebarMenuPage {
	companySelector = 'sidebar-l1-item-company';
	allEmployeesSelector = 'main-menu-employees-list-link';

	navigateToCompanyAllEmployees(): void {
		cy.getBySelector(this.companySelector).click();
		cy.getBySelector(this.allEmployeesSelector).contains('All employees').click();
		cy.reload();
	}
}

export default SidebarMenuPage;
