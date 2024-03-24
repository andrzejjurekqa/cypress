describe('Diffly Specs', () => {
    beforeEach(function () {
        cy.fixture('difflypost').then(function (data) {
            this.data = data
        })
    })
    it('POST request', function () {
        this.data.word.forEach(function (element) {
            cy.request({
                method: 'POST', url: 'https://diffle-be-lingering-log-9938.fly.dev/checkword', body: element
            })
        })
    })
})