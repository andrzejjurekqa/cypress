describe('Mock QA Kart', () => {
    let access_token;
    let taskID;
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'https://todo.qacart.com/api/v1/users/login',
            body: { email: "jordan_2313@pl.pl", password: "QWER1234" }
        }).then((request) => {
            expect(request.status).to.eq(200)
            access_token = request.body.access_token;
        }).then(() => {
            cy.request({
                method: 'POST',
                url: 'https://todo.qacart.com/api/v1/tasks',
                body: { item: "this one?", isCompleted: false },
                headers: { Authorization: `Bearer ${access_token}` }
            }).then((request) => {
                expect(request.status).to.eq(201)
                taskID = request.body._id;
            });
        });
    });
    after(() => {
        cy.request({
            method: 'DELETE',
            url: 'https://todo.qacart.com/api/v1/tasks/' + taskID,
            body: { item: "123442134", isCompleted: true },
            headers: { Authorization: `Bearer ${access_token}` }
        });
    });
    it('Mock qa cart full', async () => {
        await cy.intercept("GET", "https://todo.qacart.com/api/v1/tasks", {
            fixture: "fullTasks.json"
        })
        cy.visit("https://todo.qacart.com/todo")
        cy.get('.sc-breuTD.dIVhJd').should('have.length', 4)
    });
});