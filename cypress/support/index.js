// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

before(() => {
  const baseUrlOverride = Cypress.env('baseUrl');
  const apiUrlOverride = Cypress.env('apiUrl');
  if (baseUrlOverride) {
    Cypress.config('baseUrl', baseUrlOverride);
  }
  if (apiUrlOverride) {
    Cypress.env('apiUrl', apiUrlOverride);
  }
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
