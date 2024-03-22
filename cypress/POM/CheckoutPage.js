class CheckoutPage {
    inputField(){
        return cy.get('.validate.filter-input')
    }
    checkbox(){
        return cy.get('#checkbox2')
    }
    purchaseButton(){
        return cy.get('.btn.btn-success.btn-lg')
    }
    alert(){
        return cy.get('.alert')
    }
}

export default CheckoutPage;