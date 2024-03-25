describe('3rd party call', () => {
    it('some 3rd party', () => {
        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php',
            {

                "name": "Don't learn",
                "isbn": "bc123d",
                "aisle": "2227",
                "author": "John asd"
            }
        ).then((response) => {
            expect(response.body).to.have.property('Msg', "successfully added")
            expect(response.status).to.eq(200)
        })
    })
})