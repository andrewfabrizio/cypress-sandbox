const configPath = '/user-survey/user-survey.config.json';

context('User Survey', () => {
  before(() => {
    cy
      .fixture(configPath)
      .as('config');
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.setupRoutes(configPath);
  });

  describe('Success Cases', () => {
    it('User submits valid form.', () => {
      cy.fillForm(
        configPath,
        'user-survey/male28.fixture.json'
      );
      // cy
      //   .get('@config')
      //   .then(({ assertionSuites }) => cy.executeAssertion(configPath, 'formFillGender'));
      cy.executeAssertion(configPath, 'formFillGender')
      cy.triggerAction(configPath, 'submit');
      cy.executeAssertion(configPath, 'responseCodeSuccess');
    });
  });

  describe('Error Cases', () => {
    it('User submits invalid form.', () => {
      cy.fillForm(
        configPath,
        'user-survey/maleUnborn.fixture.json'
      );
      cy.triggerAction(configPath, 'submit');
      cy.executeAssertion(configPath, 'responseCodeError');
    });
  });
});
