class HomePage {

    nameBox() {
        return cy.get('input[name="name"]:nth-child(2)')
    }
    genderSelect() {
        return cy.get('select')
    }
    dataBind(){
        return cy.get(':nth-child(4) > .ng-untouched')
    }
    enterprenourCheck() {
        return cy.get('#inlineRadio3')
    }
    shopLink() {
        return cy.get(':nth-child(2) > .nav-link')
    }
    productList() {
        return cy.get('h4.card-title')
    }
    addButton(){
        return cy.get('button.btn.btn-info')
    }
}

export default HomePage;