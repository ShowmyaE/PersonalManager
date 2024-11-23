import React, { useState } from "react";
import "./SearchBox.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); 
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="Search title or category"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;