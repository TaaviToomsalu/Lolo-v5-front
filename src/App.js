import React, { useState, useEffect } from 'react';
import CustomRSSFeedsComponent from './components/CustomRSSFeedsComponent';
import ArticleFilterComponent from './components/ArticleFilterComponent';
import Article from './components/Article';
import ModalComponent from './components/ModalComponent';
import axios from 'axios';
import './styles/main.css';

const App = () => {
    const [customFeeds, setCustomFeeds] = useState([]);
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        fetchFeeds();
        fetchArticles().then((fetchedArticles) => {
            processArticles(fetchedArticles);
        });
    }, []);

    const fetchFeeds = async () => {
        try {
            const response = await axios.get('/feeds');
            setCustomFeeds(response.data);
        } catch (error) {
            console.error('Error fetching feeds:', error);
        }
    };

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
            fetchFeeds();
            fetchArticles().then((fetchedArticles) => {
                processArticles(fetchedArticles);
            });
        } catch (error) {
            console.error('Error adding custom RSS feed:', error);
        }
    };

    const handleDeleteFeed = async (url) => {
        try {
            await axios.delete(`/feeds/${encodeURIComponent(url)}`);
            fetchFeeds();
            fetchArticles().then((fetchedArticles) => {
                processArticles(fetchedArticles);
            });
        } catch (error) {
            console.error('Error deleting custom RSS feed:', error);
        }
    };

    const handleFilterChange = (category) => {
        setSelectedCategories(category ? [category] : []);
    };

    const handleArticleClick = async (url) => {
        try {
            const response = await axios.post('/fetch-article-content', { url });
            setModalContent(response.data.content);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching article content:', error);
        }
    };

    const filteredArticles = articles.filter(article => {
        return selectedCategories.length === 0 || article.categories.some(category => selectedCategories.includes(category));
    });

    return (
        <div>
            <h1>Lolo v5</h1>
            <CustomRSSFeedsComponent onSubmit={handleAddFeed} customFeeds={customFeeds} handleDeleteFeed={handleDeleteFeed} />
            <ArticleFilterComponent categories={categories} onFilterChange={handleFilterChange} />
            <div className="container">
                <div className="articles-container">
                    {filteredArticles.map((article, index) => (
                        <Article key={index} article={article} onArticleClick={handleArticleClick} />
                    ))}
                </div>
            </div>
            <ModalComponent
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                content={modalContent}
            />
        </div>
    );
};

export default App;
