import React from 'react';
import { timeAgo } from '../utils/date'; 

const Article = ({ article }) => {
    const publicationDate = article.pubDate; // assuming pubDate is always present

    return (
        <div className="article">
            {article.mediaContent && (
                <img src={article.mediaContent.url} alt="Article Image" />
            )}
            <div className='article-content'> 
                <h4>{article.title}</h4>
                <p className="article-meta">
                    {article.author && (
                        <span className="article-author">{article.author}</span>
                    )}
                    <span className="article-date" style={{ marginLeft: article.author ? '15px' : '0' }}>
                        {timeAgo(publicationDate)}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Article;