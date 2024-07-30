class EmployeesPage {
	addEmployeeButton = 'admin-employees-list-add-employee-button';
	preferredName = 'textfield-preferredName';
	firstName = 'textfield-firstName';
	lastName = 'textfield-lastName';
	dateOfBirth = '[data-testid="Calendar3Icon"]:first';
	nationality = 'autocomplete-nationality';
	gender = '#mui-component-select-gender';
	createButton = 'create';
	createAndAddAnotherButton = 'create-and-add-another';
	datePickerField = 'date-input-dateOfBirth';
	datePickerFieldOne =
		'.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd.mui-24pb0h';
	yearOnDatePicker = '[data-testid="ArrowDropDownIcon"]';
	selectBirthYear = '.MuiPickersYear-yearButton.mui-8lprhs';
	arrowLeftIcon = '[data-testid="ArrowLeft1Icon"]';
	daySelector = '.MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-dayWithMargin.mui-1y8yds3';
	toastMessage = 'notification-message';
	employeeRowSelector = 'row';
	searchInputSelector = 'search-input';
	selectAllEmpolyees = '[data-testid="CheckBoxOutlineBlankIcon"]';
	deleteButton = 'admin-employees-list-bulk-delete';
	confirmDeleteButton = 'confirm-button';
	profileAvatar = 'profile-card-menu-button';
	logOutAvatar = 'profile-card-menu-item-logout';
	closeToastMessage = 'close-button';
	employeeCreatedSuccesfully = 'Employee created successfully';
	employeesDeleted = '2 employees have been deleted.';

	verifyEmployeesPage() {
		cy.get('table').should('exist');
	}

	verifyListOfEmployees() {
		cy.get('[data-external-id^="row"]').then((employees) => {
			if (employees.length === 0) {
				// Handle the case where there are no employees
				cy.log('No employees found');
			} else {
				// Ensure there is at least one employee displayed
				expect(employees.length).to.be.greaterThan(0);

				// Iterate through each employee to check if they have the correct attribute
				employees.each((index, employee) => {
					cy.wrap(employee).invoke('attr', 'data-external-id').should('match', /^row/);
				});
			}
		});
	}

	verifyAddedEmployee(employee: { preferredName: string; lastName: string }, count: number) {
		cy.getBySelector(this.employeeRowSelector)
			.filter(`:contains("${employee.preferredName}")`)
			.filter(`:contains("${employee.lastName}")`)
			.should('have.length.gte', count);
	}

	clickAddEmployeeButton(): void {
		cy.getBySelector(this.addEmployeeButton).contains('Add Employee').click();
	}

	typePreferredName(preferredName: string): void {
		cy.getBySelector(this.preferredName).wait(500).type(preferredName);
	}

	typeFirstName(firstName: string): void {
		cy.getBySelector(this.firstName).type(firstName);
	}

	typeLastName(lastName: string): void {
		cy.getBySelector(this.lastName).type(lastName);
	}

	clickDatePickerField(): void {
		cy.getBySelector(this.datePickerField).click();
	}

	typeDate(date: string): void {
		cy.get(this.datePickerFieldOne).first().clear().type(date);
	}

	clickDatePicker(): void {
		cy.get(this.dateOfBirth).click();
	}

	typeNationality(nationality: string): void {
		cy.getBySelector(this.nationality).click();
		cy.getBySelector(this.nationality).type(nationality);
		cy.wait(500);
		cy.contains(nationality).click();
	}

	clickGender(): void {
		cy.get(this.gender).click();
	}

	clickCreateButton(): void {
		cy.getBySelector(this.createButton).click();
	}

	clickCreateAndAddAnotherButton(): void {
		cy.getBySelector(this.createAndAddAnotherButton).click();
	}

	selectDateOfBirth(year: string, day: string): void {
		cy.get(this.yearOnDatePicker).first().click();
		cy.get(this.selectBirthYear).select(year);
		cy.get(this.arrowLeftIcon).click();
		cy.get(this.daySelector).contains(day).click();
	}

	checkToastMessage(expectedMessage: string): void {
		cy.getBySelector(this.toastMessage).should('be.visible').and('contain', expectedMessage);
	}

	clickProfileAvatar(): void {
		cy.getBySelector(this.profileAvatar).click();
	}

	clickLogOutButton(): void {
		cy.getBySelector(this.logOutAvatar).click();
	}

	clickCloseToastMessage(): void {
		cy.getBySelector(this.closeToastMessage).click();
	}

	createEmployeeWithAddAnotherButton(employee: {
		preferredName: string;
		firstName: string;
		lastName: string;
		dateOfBirth: string;
		nationality: string;
	}): void {
		cy.wait(1000);
		this.typePreferredName(employee.preferredName);
		this.typeFirstName(employee.firstName);
		this.typeLastName(employee.lastName);
		this.clickDatePickerField();
		this.typeDate(employee.dateOfBirth);
		this.typeNationality(employee.nationality);
		this.clickCreateAndAddAnotherButton();
	}

	searchForEmployee(preferredName: string, lastName: string): void {
		cy.getBySelector(this.searchInputSelector)
			.click()
			.type(`${preferredName} ${lastName}`, { delay: 100 })
			.wait(800);
	}

	deleteEmployee(preferredName: string, lastName: string): void {
		// Search for the employee
		this.searchForEmployee(preferredName, lastName);

		cy.getBySelector(this.employeeRowSelector)
			.filter(`:contains("${preferredName}")`)
			.filter(`:contains("${lastName}")`)
			.find('input[type="checkbox"]')
			.check();

		// Click the delete button
		cy.getBySelector(this.deleteButton).click();

		// Confirm the deletion
		cy.getBySelector(this.confirmDeleteButton).click();
	}
}

export default EmployeesPage;
