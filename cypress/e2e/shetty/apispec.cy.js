describe('rahul api', () => {
    it('basic api tests', () => {
        cy.request({
            method: "GET", url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        }).then((request) => {
            expect(request.status).to.eq(200)
            expect(request.body).to.have.length(2537)
        })
    })
    it('mocks the get request', () => {
        cy.intercept("GET", "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty", {
            fixture: "smallLibrary",
        })
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/library')
        cy.get('tr td').should('have.length', 3)
    })
})