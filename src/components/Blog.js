import React, { useState } from 'react';
import { remove, update } from '../services/blogs';
const Blog = ({ blog, setErrorMessage }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { title, likes, author, url, id, user } = blog;
  const likeBlog = async () => {
    const newBlog = {
      title,
      author,
      likes: likes + 1,
      url,
      user: user?.id || '611fe444369165cf7cb3717f',
    };
    await update(id, newBlog);
  };
  const deleteBlog = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (confirm) {
      try {
        await remove(id);
      } catch (e) {
        setErrorMessage(e.message);
        setTimeout(() => setErrorMessage(null), 4000);
      }
    }
  };
  if (showDetails) {
    return (
      <div className="blog">
        <p>
          {title}
          <button
            className="btn"
            onClick={() => setShowDetails((b) => !b)}
          >
            hide
          </button>
        </p>
        <p>{url}</p>
        <p>
          likes {likes}{' '}
          <button className="btn" onClick={likeBlog}>
            like
          </button>
        </p>
        <p>{author}</p>
        <button onClick={deleteBlog}>remove</button>
      </div>
    );
  }
  return (
    <div className="blog">
      {title} {author}{' '}
      <button
        className="btn"
        onClick={() => setShowDetails((b) => !b)}
      >
        view
      </button>
    </div>
  );
};

export default Blog;
