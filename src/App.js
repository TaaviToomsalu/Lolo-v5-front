import React, { useState, useEffect } from 'react';
import CustomRSSFeedsComponent from './components/CustomRSSFeedsComponent';
import ArticleFilterComponent from './components/ArticleFilterComponent';
import Article from './components/Article';
import axios from 'axios';
import './style.css';

const App = () => {
    const [customFeeds, setCustomFeeds] = useState([]);
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        fetchArticles().then((fetchedArticles) => {
            processArticles(fetchedArticles);
        });
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('/articles');
            return response.data;
        } catch (error) {
            console.error('Error fetching articles:', error);
            return [];
        }
    };

    const processArticles = (articles) => {
        setArticles(articles);
        const allCategories = articles.reduce((acc, article) => {
            article.categories.forEach(category => {
                if (!acc.includes(category)) {
                    acc.push(category);
                }
            });
            return acc;
        }, []);
        setCategories(allCategories);
    };

    const handleAddFeed = async (url) => {
        try {
            await axios.post('/feeds', { url });
            setCustomFeeds([...customFeeds, url]);
            // Refetch articles from all feeds
            fetchArticles().then((fetchedArticles) => {
                processArticles(fetchedArticles);
            });
        } catch (error) {
            console.error('Error adding custom RSS feed:', error);
        }
    };

    const handleFilterChange = (category, isSelected) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (isSelected) {
                return [...prevSelectedCategories, category];
            } else {
                return prevSelectedCategories.filter((c) => c !== category);
            }
        });
    };

    const filteredArticles = articles.filter(article => {
        return selectedCategories.length === 0 || selectedCategories.some(category => article.categories.includes(category));
    });

    return (
        <div>
            <h1>Lolo v5</h1>
            <CustomRSSFeedsComponent onSubmit={handleAddFeed} />
            <ArticleFilterComponent categories={categories} onFilterChange={handleFilterChange} />
            <div className="container">
                <div className="articles-container">
                    {filteredArticles.map((article, index) => (
                        <Article key={index} article={article} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
