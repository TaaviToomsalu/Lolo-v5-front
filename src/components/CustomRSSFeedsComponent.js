import React, { useState } from 'react';

const CustomRSSFeedsComponent = ({ onSubmit }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(url);
        setUrl('');
    };

    return (
        <div>
            <h2>Add Custom RSS Feed</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    placeholder="Enter RSS feed URL" 
                    required 
                />
                <button type="submit">Add Feed</button>
            </form>
        </div>
    );
};

export default CustomRSSFeedsComponent;
