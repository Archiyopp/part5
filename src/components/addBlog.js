import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialData = { author: '', title: '', url: '' };
export default function AddBlog({ hideCreateForm, createBlog }) {
  const [formData, setFormData] = useState(initialData);
  const { title, url, author } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBlog(formData);
    hideCreateForm();
    setFormData(initialData);
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
            onChange={({ target }) =>
              setFormData({ ...formData, title: target.value })
            }
            name="title"
          />
        </p>
        <p>
          author:{' '}
          <input
            id="author"
            type="text"
            value={author}
            onChange={({ target }) =>
              setFormData({ ...formData, author: target.value })
            }
            name="author"
          />
        </p>
        <p>
          url:{' '}
          <input
            id="url"
            type="text"
            value={url}
            onChange={({ target }) =>
              setFormData({ ...formData, url: target.value })
            }
            name="url"
          />
        </p>
        <button type="submit" className="btn" id="submit-blog">
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
