import HomePage from '../POM/HomePage';
import ShopPage from '../POM/ShopPage';
import CheckoutPage from '../POM/CheckoutPage';

describe('template spec', () => {
  beforeEach(function () {
    cy.fixture('example').then((data) => {
      this.data = data
    })
  })
  it('angular practice', function () {
    const homePage = new HomePage()
    cy.visit('https://rahulshettyacademy.com/angularpractice/')
    homePage.nameBox().type(this.data.name)
    homePage.genderSelect().select(this.data.gender)
    homePage.dataBind().should('have.value', this.data.name)
    homePage.nameBox().should('have.attr', 'minlength', 2)
    homePage.enterprenourCheck().should('be.disabled')
    homePage.shopLink().click()

    this.data.phone.forEach(function (element) {
      cy.getProduct(element)
    })
  })
  it('loops and loops', function () {
    const homePage = new HomePage();
    const shopPage = new ShopPage();
    const checkoutPage = new CheckoutPage();
    cy.visit('https://rahulshettyacademy.com/angularpractice/')
    homePage.shopLink().click()
    this.data.phone.forEach(function (element) {
      homePage.productList().each(function($el, index) {
        if ($el.text().includes(element)) {
          homePage.addButton().eq(index).click()
        }
      })
    })
    shopPage.checkout().click();
    this.data.phone.forEach(function () {
      shopPage.orderList().each(function ($el, index) {
        cy.wrap($el).invoke('text').should('eq', this.data.phone[index])
      })
    })

    cy.get('.btn.btn-success').click()
    checkoutPage.inputField().type('Bah')
    checkoutPage.inputField().each(($el) => {
      if ($el.text() === 'Bahamas') {
        cy.wrap($el).click()
      }
    })
    checkoutPage.checkbox().check({force: true})
    checkoutPage.purchaseButton().click()
    checkoutPage.alert().should('have.text', "Success!")
  })
})