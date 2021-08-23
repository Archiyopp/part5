import React, { useState, useEffect } from 'react';
import AddBlog from './components/addBlog';
import Blog from './components/Blog';
import LoginForm from './components/loginForm';
import { create, getAll, setToken, update } from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser =
      window.localStorage.getItem('loggedBlogAppUser') || null;
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const createBlog = async (newObject) => {
    try {
      const returnedBlog = await create(newObject);
      setBlogs([...blogs, returnedBlog]);
      setSuccessMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (e) {
      setErrorMessage(e.message);
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  const blogsToDisplay = [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => {
      const { title, author, likes, url, user } = blog;
      const likeBlog = async () => {
        const newBlog = {
          title,
          author,
          likes: likes + 1,
          url,
          user: user?.id,
        };
        await update(blog.id, newBlog);
      };
      return (
        <Blog
          key={blog.id}
          blog={blog}
          setErrorMessage={setErrorMessage}
          likeBlog={likeBlog}
        />
      );
    });

  return (
    <div className="container">
      {user === null ? (
        <LoginForm
          setUser={setUser}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
        />
      ) : (
        <>
          <h2>blogs</h2>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && (
            <p className="notification">{successMessage}</p>
          )}
          <p>
            {user.name} logged-in{' '}
            <button
              onClick={() => {
                window.localStorage.removeItem('loggedBlogAppUser');
                setUser(null);
              }}
              className="btn"
            >
              Log out
            </button>
          </p>
          {showCreateForm ? (
            <AddBlog
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
              hideCreateForm={() => setShowCreateForm(false)}
              createBlog={createBlog}
            />
          ) : (
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn"
            >
              Create new blog
            </button>
          )}
          {blogsToDisplay}
        </>
      )}
    </div>
  );
};

export default App;
