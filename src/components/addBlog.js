import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function AddBlog({ hideCreateForm, createBlog }) {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      author,
      title,
      url,
    };
    await createBlog(newBlog);
    hideCreateForm();
    setAuthor('');
    setTitle('');
    setUrl('');
  };
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <p>
          title:{' '}
          <input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name="title"
          />
        </p>
        <p>
          author:{' '}
          <input
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name="author"
          />
        </p>
        <p>
          url:{' '}
          <input
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name="url"
          />
        </p>
        <button type="submit" className="btn">
          Add new blog
        </button>
      </form>
      <button onClick={hideCreateForm} className="btn">
        cancel
      </button>
    </div>
  );
}

AddBlog.propTypes = {
  setSuccessMessage: PropTypes.func,
  setErrorMessage: PropTypes.func,
  hideCreateForm: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
};
