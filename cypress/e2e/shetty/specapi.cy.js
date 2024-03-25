describe('API Specs', () => {
    beforeEach(function () {
        cy.fixture('rrsPOST').then(function (data) {
            this.data = data
        })
    })
    it('GET request', () => {
        cy.request({
            method: 'GET', url: 'https://reqres.in/api/users?page=2'
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('POST request', function () {
        this.data.job.forEach(function (element) {
            cy.request({
                method: 'POST', url: 'https://reqres.in/api/users', body: element
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.id).to.exist
                expect(response.statusText).to.eq("Created")
            })
        })
    })
    it('PATCH request', function () {
        this.data.job.forEach(function (element) {
            cy.request({
                method: 'PATCH', url: 'https://reqres.in/api/users/2', body: element
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq("OK")
            })
        })
    })
    it('DELETE request', function () {
        cy.request({
            method: 'DELETE', url: 'https://reqres.in/api/users/2', body: this.data
        }).then((response) => {
            expect(response.status).to.eq(204)
            expect(response.statusText).to.eq("No Content")
        })
    })
})