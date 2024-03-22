class ShopPage {
    checkout() {
        return cy.get('.nav-link.btn.btn-primary')
    }
    orderListName() {
        return cy.get('h4.media-heading')
    }
    orderListPrice() {
        return cy.get('tr td:nth-child(4) strong')
    }
}

export default ShopPage;