describe('Inject', () => {
    it('cookies', () => {
        let productName;
        let userEmail;
        cy.apiLogin().then(() => {
            cy.visit('https://rahulshettyacademy.com/client/', {
                onBeforeLoad: function (window) {
                    window.localStorage.setItem('token', Cypress.env('token'))
                    //userEmail = Cypress.env('userEmail');
                }
            })
        })
        console.log(userEmail)
        cy.get('.card-body button:last-of-type').eq(1).click({ force: true }) //this can be changed into each
        cy.get("[routerlink*='cart']").click()
        cy.contains('Checkout').click()
        cy.get("[placeholder*='Country']").type("ind")
        cy.get('.ta-results button').each(($el) => {
            if ($el.text() === ' India') {
                cy.wrap($el).click()
            }
        })
        cy.contains('Place Order').click()
        cy.wait(2000)
        cy.contains('Click To Download Order Details in Excel').click()
        cy.readFile(Cypress.config('fileServerFolder') + '/cypress/downloads/order-invoice_anshika.csv').then(async (text) =>{
        })

        //cy.readFile(Cypress.config('fileServerFolder') + '/cypress/downloads/order-invoice_' + userEmail + '.csv')
    })
})