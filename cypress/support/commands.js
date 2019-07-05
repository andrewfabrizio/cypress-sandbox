// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('fillForm', (configPath, dataPath) => {
  cy
    .fixture(configPath)
    .as('config');
  cy
    .fixture(dataPath)
    .as('data');
  cy
    .get('@config')
    .then((config) => {
      cy
        .get('@data')
        .then((data) => {
          config.fields
            .map(({selector, valuePointer, elementType}) => ({
              selector,
              value: data[valuePointer],
              elementType
            }))
            .forEach(({selector, value, elementType}) => {
              switch (elementType) {
                case 'input':
                  cy
                    .get(selector)
                    .type(value);
                  break;
                case 'select':
                  cy
                    .get(selector)
                    .select(value);
                  break;
              }
            });

        });
    });
});

Cypress.Commands.add('triggerAction', (configPath, actionKey) => {
    cy
      .fixture(configPath)
      .as('config');
    cy
      .get('@config')
      .then(({ actions }) => {
        const { selector, eventType } = actions[actionKey];
        switch (eventType) {
          case 'click':
            cy
              .get(selector)
              .click();
            break;
        }
      })
});