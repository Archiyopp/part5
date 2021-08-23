describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Cristian',
      username: 'archi',
      password: 'testing',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });
  it('Login form is shown', function () {
    cy.contains('log in to app');
    cy.contains('username');
    cy.contains('password');
  });

  it('login form can be submitted and the user logs in with correct credentials', function () {
    cy.get('#username').type('archi');
    cy.get('#password').type('testing');
    cy.get('#login-btn').click();
    cy.contains('logged-in');
  });

  it('login form can be submitted and it fails with the wrong credentials', function () {
    cy.get('#username').type('root');
    cy.get('#password').type('worng');
    cy.get('#login-btn').click();
    cy.get('.error')
      .should('contain', 'Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');
    cy.get('html').should('not.contain', 'logged-in');
  });
});
