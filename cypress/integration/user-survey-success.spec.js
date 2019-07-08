const configPath = '/user-survey/user-survey.config.json';

context('User Survey', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.setupRoutes(configPath);
  });

  describe('Success Cases', () => {
    it('User submits valid form.', () => {
      cy
        .fixture(configPath)
        .then((config => {
          cy.fillForm(
            configPath,
            'user-survey/male28.fixture.json'
          );
          cy.triggerAction(configPath, 'submit');
          cy
            .wait(['@postSurvey'])
            .then(({ request, response }) => {
              cy.log(request.body);
              cy.log(response.body);
            });
          cy.executeAssertions(configPath, config.assertionSuites.success);
        }));
    });
  });
});
