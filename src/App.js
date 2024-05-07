import React, { useState, useEffect } from 'react';
import CustomRSSFeedsComponent from './components/CustomRSSFeedsComponent';
import ArticleFilterComponent from './components/ArticleFilterComponent';
import Article from './components/Article';
import axios from 'axios';

const App = () => {
    // State to store custom RSS feeds
    const [customFeeds, setCustomFeeds] = useState([]);
  
    // State to store articles
    const [articles, setArticles] = useState([]);
  
    // State to store selected categories for filtering
    const [selectedCategories, setSelectedCategories] = useState([]);
  
    // Fetch initial articles from the provided RSS feed
    useEffect(() => {
      fetchArticles();
    }, []);
  
    // Function to fetch articles from the RSS feed
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
  
    // Function to handle adding custom RSS feeds
    const handleAddFeed = async (url) => {
      try {
        // Send POST request to add the custom feed
        await axios.post('/feeds', { url });
        // Update the list of custom feeds
        setCustomFeeds([...customFeeds, url]);
        // Fetch articles again to include articles from the newly added feed
        fetchArticles();
      } catch (error) {
        console.error('Error adding custom RSS feed:', error);
      }
    };
  
    // Function to handle category filter change
    const handleFilterChange = (selectedCategories) => {
      setSelectedCategories(selectedCategories);

      const filteredArticles = articles.filter(article => {
        // Check if the article's category matches any of the selected categories
        return selectedCategories.some(category => article.categories.includes(category));
      });
      
      // Update the displayed articles with the filtered articles
      setFilteredArticles(filteredArticles);

    };
  
    return (
        <div>
          <h1>Lolo v5</h1>
          <CustomRSSFeedsComponent onSubmit={handleAddFeed} />
          <ArticleFilterComponent categories={['Category 1', 'Category 2']} onFilterChange={handleFilterChange} />
          <div className="articles-container">
            {articles.map((article, index) => (
              <Article key={index} article={article} />
            ))}
          </div>
        </div>
      );
  };
  
  export default App;