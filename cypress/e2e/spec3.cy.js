import 'cypress-iframe';

describe('Automation practice', () => {
    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })
    
    it('goes throug Name list', () => {
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
            const positiontext = $el.text()
            if (positiontext === 'Businessman') {
                cy.get('tr td:nth-child(2)').eq(index).next().then((city) => {
                    expect(city.text()).to.equal('Mumbai')
                })
            }
        })
    })
    it('iframes', () => {
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find('a[href*="mentorship"]').eq(0).click()
        cy.iframe().find('h1[class*="pricing-title"]').should('have.length', 0)
    })
})