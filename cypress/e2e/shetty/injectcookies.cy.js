const excelToJson = require('convert-excel-to-json');
const fs = require('fs');


describe('Inject', () => {
    it('cookies + excel file', () => {
        let productName;
        cy.apiLogin().then(() => {
            cy.visit('https://rahulshettyacademy.com/client/', {
                onBeforeLoad: function (window) {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        })
        cy.get(".card-body b").eq(1).then((el) => {
            productName = el.text();
        })
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
        cy.get('.order-summary button').contains('Excel').click()
        const filePath = Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_anshika.xlsx"
        let excelProductName;
        cy.task('excelToJsonConverter', filePath).then((result) => {
            excelProductName = result.data[1].B;
            expect(productName).to.eq(excelProductName)
        })
        cy.readFile(filePath).then((text) => {
            expect(text).to.include(productName)
        })
    })
})