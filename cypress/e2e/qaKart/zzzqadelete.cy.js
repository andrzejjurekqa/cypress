describe('it deletes all remnants', ()=> {
    it('deletes all those mfs', () => {
        cy.visit('https://todo.qacart.com/todo')
        cy.get('#email').type('jordan_2313@pl.pl')
        cy.get('#password').type('QWER1234')
        cy.get('#submit').click()
        cy.get('[data-testid="todo-item"]').each(($el) => {
            if ($el.text()) {
                cy.get('.sc-ksZaOG').eq(0).click().then(() => {
                    cy.wait(500)
                })
            }
            else {
                console.log('that all')
            }
        })
    })
})