describe('rahul api', () => {
    it('basic api tests', () => {
        cy.request({
            method: "GET", url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        }).then((request) => {
            expect(request.status).to.eq(200)
        })
    })
    it('mocks the get response', () => {
        let arrayLength;
        cy.visit('https://rahulshettyacademy.com/angularAppdemo')
        cy.intercept("GET", "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
            {
                statusCode: 200,
                fixture: "smallLibrary",
            }).as('retreiveBooks')
        cy.get('button[class="btn btn-primary"]').click()
        cy.wait('@retreiveBooks').then(({ response }) => {
            arrayLength = response.body.length;
            cy.get('tbody tr').should('have.length', arrayLength)
        })
    })
    it('mock the request', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo')
        cy.intercept("GET", "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
            (req) => {
                req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra'
                req.continue((req) => {
                    expect(req.statusCode).to.eq(200)
                })
            }).as('dummmyURL')
        cy.get('button[class="btn btn-primary"]').click()
        cy.wait('@dummmyURL')
    })
})