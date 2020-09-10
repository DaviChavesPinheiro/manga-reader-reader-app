import React, { useState } from 'react';
import { Input } from 'antd';
import "./SearchBar.css";

const { Search } = Input;


const SearchBar = props => {
    return (
        <div className="search-bar-container">
            <Search placeholder="input search text" onSearch={value => props.onSearch(value)} enterButton />
        </div>
    )
}

export default SearchBar;
