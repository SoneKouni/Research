import React from 'react';

const SearchButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      検索
    </button>
  );
};

export default SearchButton;