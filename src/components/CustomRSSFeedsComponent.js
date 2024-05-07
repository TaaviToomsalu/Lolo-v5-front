import React, { useState } from 'react';

const CustomRSSFeedsComponent = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation here if needed
    onSubmit(url);
    setUrl('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter RSS feed URL"
        />
        <button type="submit">Add Feed</button>
      </form>
    </div>
  );
};

export default CustomRSSFeedsComponent;