import React, { useState, useEffect } from 'react';
import CustomRSSFeedsComponent from './components/CustomRSSFeedsComponent';
import ArticleFilterComponent from './components/ArticleFilterComponent';
import Article from './components/Article';
import axios from 'axios';
import './style.css';

const App = () => {

    const [customFeeds, setCustomFeeds] = useState([]);
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
  
    useEffect(() => {
      fetchArticles();
    }, []);

    
    useEffect(() => {
        console.log(articles);
      }, [filteredArticles]);
    

    const fetchArticles = async () => {
      try {
        const response = await axios.get('/articles');
        
        
        setArticles(response.data.rss.channel[0].item);
        // Initialize filteredArticles with all articles initially
        setFilteredArticles(response.data.rss.channel[0].item);
        
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
  
    const handleAddFeed = async (url) => {
      try {
        await axios.post('/feeds', { url });
        setCustomFeeds([...customFeeds, url]);
        fetchArticles();
      } catch (error) {
        console.error('Error adding custom RSS feed:', error);
      }
    };
  

    const handleFilterChange = (selectedCategories) => {
      setSelectedCategories(selectedCategories);

      const filteredArticles = articles.filter(article => {
        // Check if the article's category matches any of the selected categories
        return selectedCategories.length === 0 || selectedCategories.some(category => article.categories.includes(category));
      });
      
      // Update the displayed articles with the filtered articles
      setFilteredArticles(filteredArticles);

    };
  
    return (
        <div>
          <h1>Lolo v5</h1>
          <CustomRSSFeedsComponent onSubmit={handleAddFeed} />
          <ArticleFilterComponent categories={['Category 1', 'Category 2']} onFilterChange={handleFilterChange} />
          <div class="container">
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