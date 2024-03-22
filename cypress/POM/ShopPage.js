class ShopPage {
    checkout(){
        return cy.get('.nav-link.btn.btn-primary')
    }
    orderList() {
        return cy.get('h4.media-heading')
    }
}

export default ShopPage;