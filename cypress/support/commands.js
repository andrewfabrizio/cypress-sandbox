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

Cypress.Commands.add('executeAssertion', (configPath, assertionName) => {
  cy
    .fixture(configPath)
    .then(({ assertions }) => {
      assertions[assertionName]
        .reduce((chain, { method, arguments: args }) => chain[method](...args), cy);
    });
});

Cypress.Commands.add('executeAssertions', (configPath, assertionNames) => {
  assertionNames.forEach((assertionName) => cy.executeAssertion(configPath, assertionName));
});

Cypress.Commands.add('setupRoutes', (configPath) => {
  cy
    .fixture(configPath)
    .then(({ routes }) => {
      if (routes && routes.length) {
        cy.server();
        routes.forEach(({ alias, options }) => {
          // TODO: use RegExp to test options.url to see if it needs modification
          options.url = Cypress
            .env('apiUrl')
            .concat(options.url);
          cy
            .route(options)
            .as(alias);
        });
      }
    });
});

Cypress.Commands.add('triggerAction', (configPath, actionKey) => {
  cy
    .fixture(configPath)
    .then(({ actions }) => {
      const { selector, eventType } = actions[actionKey];
      switch (eventType) {
        case 'click':
          cy
            .get(selector)
            .click();
          break;
        default:
          throw new Error(`Unknown eventType "${eventType}" encountered associated with the "${actionKey}" action.`)
      }
    })
});
