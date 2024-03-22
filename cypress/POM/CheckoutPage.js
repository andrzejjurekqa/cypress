class CheckoutPage {
    inputField() {
        return cy.get('.validate.filter-input')
    }
    suggestion() {
        return cy.get('.suggestions > ul > li > a')
    }
    checkbox() {
        return cy.get('#checkbox2')
    }
    purchaseButton() {
        return cy.get('.btn.btn-success.btn-lg')
    }
    alert() {
        return cy.get('.alert')
    }
    checkout() {
        return cy.get('.btn.btn-success')
    }
}

export default CheckoutPage;