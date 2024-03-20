
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.increment').first().click()
    cy.get('.search-keyword').click().type('Ca').then(() => {
      cy.get('.product:visible').should('have.length', 4)
    })
    cy.get('.products').as('products')
    cy.get('@products').find('.product').eq(1).contains('ADD TO CART').click().then(() => {
      console.log('asdasdas')
    })
    const prodPrice1 = cy.get('@products').find('.product').eq(1).find('.product-price')
    cy.log(prodPrice1)
    cy.get('@products').find('.product').each(($el /*, index, $list*/) => {
      const productName = $el.find('h4.product-name').text()
      if (productName.includes('Cashews')) {
        cy.wrap($el).find('button').click()
      }
    })
    cy.get('.brand').should('have.text', 'GREENKART').then(function (logo) {
      cy.log(logo.text())
    })
    cy.get('.cart-icon > img').click()
    cy.contains('PROCEED TO CHECKOUT').click()
    cy.contains('Place Order').click()
  })
  it('new tc', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('[for="radio1"] > .radioButton').check().should('be.checked').and('have.value', 'radio1')
    cy.get('[for="radio2"] > .radioButton').check().should('be.checked').and('have.value', 'radio2')
    cy.get('[for="radio3"] > .radioButton').check().should('be.checked').and('have.value', 'radio3')
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
    cy.get('#checkBoxOption2').check().should('be.checked').and('have.value', 'option2')
    cy.get('#checkBoxOption3').check().should('be.checked').and('have.value', 'option3')
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
    cy.get('#checkBoxOption2').uncheck().should('not.be.checked')
    cy.get('#checkBoxOption3').uncheck().should('not.be.checked')
    cy.get('input[type="checkbox"]').check(['option2', 'option3']).should('be.checked').and('have.value', 'option2')
    //cy.get('#autocomplete').click()
    //static dropdown
    cy.get('select').select('Option1').should('have.value', 'option1')
    cy.get('select').select('Option2').should('have.value', 'option2')
    cy.get('select').select('Option3').should('have.value', 'option3')
    //suggestion class
    cy.get('#autocomplete').type('Bah')
    cy.get('.ui-menu-item div').each(($el) => {
      if ($el.text() === 'Bahamas') {
        cy.wrap($el).click()
      }
    })
    //show hide
    cy.get('#displayed-text').should('be.visible').type('asdasdas')
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')
    //alert handle
    cy.get('#alertbtn').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Hello , share this practice page and share your knowledge')
    })
    cy.get('#confirmbtn').click()
    cy.on('window:confirm', (str2) => {
      expect(str2).to.equal('Hello , Are you sure you want to confirm?')
    })
    cy.get('#confirmbtn').click()
    cy.on('window:cancel', (str2) => {
      expect(str2).to.equal('Hello , Are you sure you want to confirm?')
    })
    //remove attribute
    cy.get('#opentab').invoke('removeAttr', 'target').click()
    cy.origin('https://www.qaclickacademy.com', () => {
      cy.get('#navbarSupportedContent a[href*="about"]').click()
      cy.get('.mt-50').should('contain', 'Welcome to QAClick')
    })
  })
  it('goes through the list', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    //loop through
    cy.get('tr td:nth-child(2)').each(($el, index) => {
      const courseText = $el.text()
      //if text equals
      if (courseText.includes('Python')) {
        //grab sibling / next
        cy.get('tr td:nth-child(2)').eq(index).next().then((price) => {
          //save and compare
          const priceText = price.text()
          expect(priceText).to.equal('25')
        })
      }
    })
  })
  it('covers the hover', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    //no support for hover, but workarounds exist
    cy.get('div.mouse-hover-content').invoke('show')
    cy.contains('Top').click()
    cy.url().should('include', 'top')
    cy.get('div.mouse-hover-content').invoke('show')
    cy.contains('Reload').click()
    cy.url().should('not.include', 'top')
    cy.contains('Top').click({force: true})
    cy.url().should('include', 'top')
  })
  it.only('goes throug Name list', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
      const positiontext = $el.text()
      if (positiontext === 'Businessman') {
        cy.get('tr td:nth-child(2)').eq(index).next().then((city) => {
          expect(city.text()).to.equal('Mumbai')
        })
      }
    })
  })
})