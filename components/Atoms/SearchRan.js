import React, { useState } from 'react';

const SearchRan = ({ onSearch }) => {
    const [queryA, setQueryA] = useState('');
    const [queryB, setQueryB] = useState('');

    const handleInputChangeA = (e) => {
        setQueryA(e.target.value);
    };

    const handleInputChangeB = (e) => {
        setQueryB(e.target.value);
    };

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <div>
                <input
                    type="text"
                    id="locationA"
                    value={queryA}
                    onChange={handleInputChangeA}
                    placeholder="地点A"
                />
            </div>
            <div>
                <input
                    type="text"
                    id="locationB"
                    value={queryB}
                    onChange={handleInputChangeB}
                    placeholder="地点B"
                />
            </div>
        </div>
    );
};

export default SearchRan;