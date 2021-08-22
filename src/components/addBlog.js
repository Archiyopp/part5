import React, { useState } from 'react';
import { create } from '../services/blogs';

export default function AddBlog({
  setSuccessMessage,
  setErrorMessage,
}) {
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
    try {
      await create(newBlog);
      setSuccessMessage(`A new blog ${title} by ${author} added`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setAuthor('');
      setTitle('');
      setUrl('');
    } catch (e) {
      setErrorMessage(e.message);
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <p>
          title:{' '}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name="title"
          />
        </p>
        <p>
          author:{' '}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name="author"
          />
        </p>
        <p>
          url:{' '}
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name="url"
          />
        </p>
        <button type="submit">Add new blog</button>
      </form>
    </div>
  );
}