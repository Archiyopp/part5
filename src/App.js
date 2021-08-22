import React, { useState, useEffect } from 'react';
import AddBlog from './components/addBlog';
import Blog from './components/Blog';
import LoginForm from './components/loginForm';
import { getAll, setToken } from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  return (
    <div>
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
            >
              Log out
            </button>
          </p>
          <AddBlog
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
