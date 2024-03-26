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
Cypress.Commands.add('getProduct', (productName) => {
    cy.get('h4.card-title').each(($el, index) => {
        if ($el.text().includes(productName)) {
            cy.get('button.btn.btn-info').eq(index).click()
        }
    })
})

Cypress.Commands.add('sendRequest', (method, url, access_token, body) => {
    cy.request({
        method: method,
        url: url,
        body: body,
        headers: { Authorization: `Bearer ${access_token}` }
    })
})

Cypress.Commands.add('apiLogin', () =>{
    let email = "anshika@gmail.com";
    let email2;
    cy.request('POST', 'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
        userEmail: email, userPassword: "Iamking@000"
        }).then((request) => {
            expect(request.status).to.eq(200)
            email2 = email.split('@')[0];
            Cypress.env('userEmail', email2);
            console.log(Cypress.env('userEmail'))
        }).then((response) => {
            expect(response.status).to.eq(200)
            Cypress.env('token', response.body.token);
    })
})

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })