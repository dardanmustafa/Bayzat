import LoginPage from 'cypress/pages/loginPage';
import SidebarMenuPage from 'cypress/pages/sideBarMenuPage';
import EmployeesPage from 'cypress/pages/employeesPage';
import DashboardPage from 'cypress/pages/dashboardPage';

const loginPage = new LoginPage();
const sideBarMenuPage = new SidebarMenuPage();
const employeesPage = new EmployeesPage();
const dashboardPage = new DashboardPage();

describe('Bayzat Employee Management Test', () => {
	const employee = {
		preferredName: 'Dard',
		firstName: 'Dardan',
		lastName: 'Mustafa',
		nationality: 'Republic of Kosovo',
		dateOfBirth: '14021995',
	};

	it('should allow adding, searching, selecting, and deleting an employee', () => {
		cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
		dashboardPage.verifyDashboard();

		sideBarMenuPage.navigateToCompanyAllEmployees();
		employeesPage.verifyEmployeesPage();
		employeesPage.verifyListOfEmployees();

		employeesPage.clickAddEmployeeButton();

		for (let i = 0; i < 2; i++) {
			employeesPage.createEmployeeWithAddAnotherButton(employee);
			employeesPage.checkToastMessage(employeesPage.employeeCreatedSuccesfully);
		}

		sideBarMenuPage.navigateToCompanyAllEmployees();

		employeesPage.verifyAddedEmployee(employee, 2); // Expect 2 instances

		employeesPage.deleteEmployee(employee.preferredName, employee.lastName);
		cy.getBySelector(employeesPage.toastMessage).should(
			'have.text',
			employeesPage.employeesDeleted
		);
		cy.getBySelector(employeesPage.employeeRowSelector).should('not.exist');
		employeesPage.clickCloseToastMessage();

		employeesPage.clickProfileAvatar();
		employeesPage.clickLogOutButton();
		loginPage.verifyLogout();
	});
});
