import React, { useState } from 'react';
const Blog = ({ blog, deleteBlog, likeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { title, likes, author, url } = blog;
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
          <button className="btn like-btn" onClick={likeBlog}>
            like
          </button>
        </p>
        <p>{author}</p>
        <button onClick={deleteBlog} className="btn" id="remove-btn">
          remove
        </button>
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
