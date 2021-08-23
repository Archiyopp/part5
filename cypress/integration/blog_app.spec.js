describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Cristian',
      username: 'archi',
      password: 'testing',
    };

    cy.request('POST', 'http://localhost:3001/api/users/', user);
    const user2 = {
      name: 'Fernandez',
      username: 'yopp',
      password: 'testing123',
    };

    cy.request('POST', 'http://localhost:3001/api/users/', user2);
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
    describe('and two blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'React is kinda good',
          author: 'Cristian Fernandez',
          url: 'www.archi.com',
        });
        cy.createBlog({
          title: 'Reduce function',
          author: 'Andres Bermudez',
          url: 'www.archipog.com',
        });
        cy.createBlog({
          title: 'Map function',
          author: 'Cris Bermudez',
          url: 'www.archipogggers.com',
        });
      });
      it(', the user can like the blog', function () {
        cy.contains('React is kinda good').find('button').click();
        cy.contains('likes 0');
        cy.contains('React is kinda good')
          .parent()
          .find('.like-btn')
          .click();
        cy.contains('likes 1');
      });

      it(', the user can delete the blog', function () {
        cy.contains('React is kinda good').find('button').click();
        cy.contains('React is kinda good')
          .parent()
          .find('#remove-btn')
          .click();
        cy.on('window:confirm', () => true);
        cy.get('html').should('not.contain', 'React is kinda good');
      });
      it(', other user cant delete the blog', function () {
        cy.get('#logout').click();
        cy.login({ username: 'yopp', password: 'testing123' });
        cy.contains('React is kinda good').find('button').click();
        cy.contains('React is kinda good')
          .parent()
          .find('#remove-btn')
          .click();
        cy.contains('You are not the owner of the blog');
        cy.contains('React is kinda good');
      });

      it.only(', the blogs are arranged in order of likes', function () {
        cy.contains('React is kinda good').find('button').click();
        cy.contains('likes 0');
        cy.contains('React is kinda good')
          .parent()
          .find('.like-btn')
          .as('reactLike');
        cy.get('@reactLike').click();
        cy.contains('likes 1');
        cy.get('@reactLike').click();
        cy.contains('likes 2');
        cy.get('@reactLike').click();
        cy.contains('likes 3');
        cy.contains('Map function').find('button').click();
        cy.contains('Map function')
          .parent()
          .find('.like-btn')
          .as('mapLike');
        cy.get('@mapLike').click();
        cy.contains('likes 1');
        cy.get('@mapLike').click();
        cy.contains('likes 2');
        cy.contains('Reduce').find('button').click();
        cy.get('.blog').then((blogs) => {
          console.log(blogs.length, blogs, blogs[0]);
          cy.wrap(blogs[0])
            .should('contain', '3')
            .and('contain', 'React is kinda good');
          cy.wrap(blogs[1])
            .should('contain', '2')
            .and('contain', 'Map function');
          cy.wrap(blogs[2])
            .should('contain', '0')
            .and('contain', 'Reduce function');
        });
        cy.get('@mapLike').click();
        cy.contains('Map function').parent().contains('likes 3');
        cy.get('@mapLike').click();
        cy.contains('likes 4');
        cy.get('.blog').then((blogs) => {
          cy.wrap(blogs[0])
            .should('contain', '4')
            .and('contain', 'Map function');
          cy.wrap(blogs[1])
            .should('contain', '3')
            .and('contain', 'React is kinda good');
          cy.wrap(blogs[2])
            .should('contain', '0')
            .and('contain', 'Reduce function');
        });
      });
    });
  });
});
