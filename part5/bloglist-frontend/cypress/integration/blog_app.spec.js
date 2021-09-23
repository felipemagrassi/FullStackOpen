describe('Blog app', function() {
  beforeEach(function() {
    cy.request('GET', 'http://localhost:3001/api/blog/')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    // ...
  })
})