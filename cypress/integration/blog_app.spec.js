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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'archi', password: 'testing' });
    });

    it('a new blog can be created', function () {
      cy.contains('Create new blog');
      cy.get('#show-create-blog').click();
      cy.get('#title').type('React is kinda good');
      cy.get('#author').type('Cristian Fernandez');
      cy.get('#url').type('www.archi.com');
      cy.get('#submit-blog').click();
      cy.contains('React is kinda good');
      cy.contains('Cristian Fernandez');
    });
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'React is kinda good',
          author: 'Cristian Fernandez',
          url: 'www.archi.com',
        });
      });
      it.only(', the user can like the blog', function () {
        cy.contains('React is kinda good').find('button').click();
        cy.contains('React is kinda good')
          .parent()
          .find('#like-btn')
          .click();
      });
    });
  });
});
