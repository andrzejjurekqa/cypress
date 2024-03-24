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
    it('check tasks', () => {
        cy.request({
            method: 'GET',
            url: 'https://todo.qacart.com/api/v1/tasks',
            body: { email: "jordan_2313@pl.pl", password: "QWER1234" },
            headers: { Authorization: `Bearer ${access_token}` }
        }).then((request) => {
            expect(request.status).to.eq(200)
            expect(request.body.tasks).to.be.empty
        })
    })
    it('creates a task', () => {
        cy.request({
            method: 'POST', 
            url: 'https://todo.qacart.com/api/v1/tasks', 
            body: { item: "123442134", isCompleted: false }, 
            headers: { Authorization: `Bearer ${access_token}` }
        }).then((request) => {
            expect(request.status).to.eq(201)
            expect(request.body.item).to.eq('123442134')
            taskID = request.body._id;
        })
    })
    it('creates a task', () => {
        cy.request({
            method: 'PUT', 
            url: 'https://todo.qacart.com/api/v1/tasks/' + taskID, 
            body: { item: "123442134", isCompleted: true }, 
            headers: { Authorization: `Bearer ${access_token}` }
        }).then((request) => {
            expect(request.status).to.eq(200)
            expect(request.body.item).to.eq('123442134')
        })
    })
    it('deletes a task', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://todo.qacart.com/api/v1/tasks/' + taskID,
            body: { item: "123442134", isCompleted: true },
            headers: { Authorization: `Bearer ${access_token}` }
        }).then((request) => {
            expect(request.status).to.eq(200)
        })
    })
    it('check tasks', () => {
        cy.request({
            method: 'GET',
            url: 'https://todo.qacart.com/api/v1/tasks',
            body: { email: "jordan_2313@pl.pl", password: "QWER1234" },
            headers: { Authorization: `Bearer ${access_token}` }
        }).then((request) => {
            expect(request.status).to.eq(200)
            expect(request.body.tasks).to.be.empty
        })
    })
})