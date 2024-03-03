// Filter.js
import React from "react";

const Filter = ({ onFilterChange }) => {
  return (
    <div>
      <label htmlFor="filter">Filter Results:</label>
      <input
        id="filter"
        type="text"
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default Filter;
