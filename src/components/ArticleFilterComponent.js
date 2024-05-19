import React from 'react';

const ArticleFilterComponent = ({ categories, onFilterChange }) => {
    const handleSelectChange = (event) => {
        const { value } = event.target;
        onFilterChange(value);
    };

    return (
        <div>
            <label htmlFor="category-select">Filter by Category:</label>
            <select id="category-select" onChange={handleSelectChange}>
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default ArticleFilterComponent;
