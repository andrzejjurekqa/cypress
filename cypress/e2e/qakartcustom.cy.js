describe('QA KART api', () => {
    let access_token;
    let taskID;
    it('logs in to application', () => {
        cy.request({
            method: 'POST',
            url: 'https://todo.qacart.com/api/v1/users/login',
            body: { email: "jordan_2313@pl.pl", password: "QWER1234" }
        }).then((request) => {
            expect(request.status).to.eq(200)
            expect(request.body.firstName).to.eq('asdasdasd')
            access_token = request.body.access_token;
        })
    })
    it('check custom command get', () => {
        cy.sendRequest('GET', Cypress.env('url2'), access_token)
        .then((request) => {
            expect(request.status).to.eq(200)
            expect(request.body.tasks).to.be.empty
        })
    })
    it('check custom command creates a task', () => {
        cy.sendRequest('POST', Cypress.env('url2'), access_token, { item: "123442134", isCompleted: false })
        .then((request) => {
            expect(request.status).to.eq(201)
            expect(request.body.item).to.eq('123442134')
            taskID = request.body._id;
        })
    })
    it('check custom command edits a task', () => {
        cy.sendRequest('PUT', Cypress.env('url2') + taskID, access_token, { item: "123442134", isCompleted: true })
        .then((request) => {
            expect(request.status).to.eq(200)
            expect(request.body.item).to.eq('123442134')
        })
    })
    it('check custom command deletes a task', () => {
        cy.sendRequest('DELETE', Cypress.env('url2') + taskID, access_token, { item: "123442134", isCompleted: true })
        .then((request) => {
            expect(request.status).to.eq(200)
            expect(request.body.item).to.eq('123442134')
        })
    })
    it('check custom command get', () => {
        cy.sendRequest('GET', Cypress.env('url2'), access_token).then((request) => {
            expect(request.status).to.eq(200)
            expect(request.body.tasks).to.be.empty
        })
    })
})