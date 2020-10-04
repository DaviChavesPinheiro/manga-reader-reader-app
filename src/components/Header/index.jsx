import React from "react";
import { Container, HeaderContainer, TabsContainer, Tab } from "./style";

const Header = props => {

    return (
        <Container>
            <HeaderContainer>
                <h1>{props.title}</h1>
                {props.children}
            </HeaderContainer>
            <TabsContainer className="tabs-container">
                <Tab className={props.activeTab === 'All' ? 'active' : ''} onClick={() => props.setActiveTab('All')}>ALL</Tab>
                <Tab className={props.activeTab === 'For You' ? 'active' : ''} onClick={() => props.setActiveTab('For You')}>FOR YOU</Tab>
                <Tab className={props.activeTab === 'Popular' ? 'active' : ''} onClick={() => props.setActiveTab('Popular')}>POPULAR</Tab>
            </TabsContainer>
        </Container>
    )
}

export default Header;