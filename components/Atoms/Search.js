import React, { useState } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        handleSearch(event.target.value);
    };

    const handleSearch = (query) => {
        console.log('Searching for:', query);
        // 検索ロジックをここに追加
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="検索..."
            />
        </div>
    );
};

export default Search;