describe('it deletes all remnants', ()=> {
    it('deletes all those mfs', () => {
        cy.visit('https://todo.qacart.com/todo')
        cy.get('#email').type('jordan_2313@pl.pl')
        cy.get('#password').type('QWER1234')
        cy.get('#submit').click()
        cy.get('[data-testid="todo-item"]').each(function($el, index) {
            if ($el.text().includes("this one?")) {
                cy.get('.sc-ksZaOG').eq(index).click()
            }
            else {
                console.log('that all')
            }
        })
    })
})