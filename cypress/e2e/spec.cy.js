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
  it('loops and loops', { defaultCommandTimeout: 8000 }, function () {
    const homePage = new HomePage();
    const shopPage = new ShopPage();
    const checkoutPage = new CheckoutPage();
    
    cy.visit(Cypress.env('url') + 'angularpractice/')
    homePage.shopLink().click()
    this.data.phone.forEach(function (element) {
      homePage.productList().each(function ($el, index) {
        if ($el.text().includes(element)) {
          homePage.addButton().eq(index).click()
        }
      })
    })
    shopPage.checkout().click();
    let sum = 0;
    this.data.phone.forEach(function () {
      shopPage.orderListName().each(function ($el, index) {
        cy.wrap($el).invoke('text').should('eq', this.data.phone[index])
      })
    })

    shopPage.orderListPrice().each(function ($el) {
      const amount = $el.text()
      var res = amount.split(" ")
      res = res[1].trim()
      sum = Number(sum) + Number(res)
    }).then(function () {
      cy.log(sum)
    })
    cy.get('h3 strong').then(function (element) {
      const amount = element.text()
      var res = amount.split(" ")
      var total = res[1].trim()
      expect(Number(total)).to.equal(sum)

    })
    checkoutPage.checkout().click()
    checkoutPage.inputField().type('Ind')
    checkoutPage.suggestion().each(($el) => {
      if ($el.text() === 'India') {
        cy.wrap($el).click()
      }
    })
    checkoutPage.checkbox().check({ force: true })
    checkoutPage.purchaseButton().click()
    checkoutPage.alert().then(function (element) {
        expect(element.text().includes("Success")).to.be.true
    })

  })
})