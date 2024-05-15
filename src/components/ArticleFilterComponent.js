import React from 'react';


const ArticleFilterComponent = ({ categories, onFilterChange }) => {
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        onFilterChange(value, checked);
    };

    return (
        <div>
            <label>Filter by Category:</label>
            <div className="checkbox-container">
                {categories.map((category, index) => (
                    <div key={index} className="checkbox-item">
                        <input 
                            type="checkbox" 
                            id={`category-${index}`} 
                            value={category} 
                            onChange={handleCheckboxChange} 
                        />
                        <label htmlFor={`category-${index}`}>{category}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleFilterComponent;
