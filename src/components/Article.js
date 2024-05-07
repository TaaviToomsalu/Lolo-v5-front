import React from 'react';

const Article = ({ article }) => {
  return (
    <div className="article">
      <h2>{article.title}</h2>
      <p>{article.excerpt}</p>
      {/* Add more details if needed */}
    </div>
  );
};

export default Article;