describe('User Survey (SUCCESS)', () => {
  it('Submit new user information', () => {
    cy.visit('http://localhost:3000');
    cy.url().should('include', 'localhost');
    cy.fillForm(
        'configs/user-survey.fixture.json',
        'data/user-survey/male28.fixture.json'
    );
    cy.triggerAction('configs/user-survey.fixture.json', 'submit');
    cy.executeAssertion('configs/user-survey.fixture.json', 'state_change_success');
  });
});