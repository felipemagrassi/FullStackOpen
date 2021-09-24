describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Felipe Magrassi',
      username: 'Magrassi',
      password: 'teste123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
    cy.clearLocalStorage()
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('login')
    cy.contains('cancel')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {

      cy.contains('login').click()
      cy.get('#username').type('Magrassi')
      cy.get('#password').type('teste123')
      cy.get('#login-button').click()

      cy.contains('Felipe Magrassi logged in')
    })

    it('fails with wrong credentials', function() {

      cy.contains('login').click()
      cy.get('#username').type('Magrassi')
      cy.get('#password').type('teste')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Magrassi', password: 'teste123' })
    })

    it('A blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('[id=title]').type('Test title')
      cy.get('[id=author').type('Test author')
      cy.get('[id=url').type('Test url')

      cy.contains('create').click()

      cy.contains('Test title created with success')
    })

  })
  describe('When logged in and with posts', function() {
    beforeEach(function () {

      cy.login({ username: 'Magrassi', password: 'teste123' })
      for (let i = 0 ; i < 3; i++) {
        const post = {
          title: `Testing Title ${i}`,
          author: `Testing Author ${i}`,
          url: `Testing Url ${i}`,
        }

        cy.createPost(post)
      }
    })
    it('A blog can be liked', function() {
      cy.contains('Open').click()
      cy.contains('Like Post').click()
      cy.contains('Testing Title 0 likes updated to 1')
    })
    it('A blog can be liked', function() {
      cy.contains('Open').click()
      cy.contains('Delete Post').click()
      cy.contains('Testing Title 0 deleted by Felipe Magrassi')
    })
    it('Expect first post to be Testing Title 2', function () {
      cy.get('.openButton').eq(2).click()
      cy.contains('Testing Url 2')
      cy.get('.likeButton').eq(2).click()
      cy.get('.openButton').eq(0).click()
      cy.contains('Testing Url 2')
    })
  })

})