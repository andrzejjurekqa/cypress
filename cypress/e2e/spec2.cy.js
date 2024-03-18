describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.increment').first().click();
    cy.get('.search-keyword').click().type('Carrot');
    cy.pause();
  });
});