import React, { useState } from "react";
import "./HomeHeader.css";

const HomeHeader = props => {

    return (
        <header className="home-header">
            <div className="tabs-container">
                <button className={`tab-links ${props.activeTab === 'All' ? 'active' : ''}`} onClick={() => props.setActiveTab('All')}>ALL</button>
                <button className={`tab-links ${props.activeTab === 'For You' ? 'active' : ''}`} onClick={() => props.setActiveTab('For You')}>FOR YOU</button>
                <button className={`tab-links ${props.activeTab === 'Latest' ? 'active' : ''}`} onClick={() => props.setActiveTab('Latest')}>LATEST</button>
            </div>
        </header>
    )
}

export default HomeHeader;