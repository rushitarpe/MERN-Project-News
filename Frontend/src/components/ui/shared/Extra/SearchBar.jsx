import React, { useState } from 'react';
import './Fancy.css'; // Add this line for custom CSS

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`search-container ${isFocused ? 'focused' : ''}`}>
            <input
                type="text"
                className="search-input"
                placeholder="Search the universe..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <div className="icon-container">
                <span className="search-icon">&#x1F50D;</span>
            </div>
        </div>
    );
};

export default SearchBar;
