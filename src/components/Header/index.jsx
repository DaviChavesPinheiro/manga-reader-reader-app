import React from "react";
import { Container, HeaderContainer, TabsContainer, Tab } from "./style";
import If from "../../operator/If"

const Header = props => {

    return (
        <Container>
            <HeaderContainer>
                <h1>{props.title}</h1>
                {props.children}
            </HeaderContainer>
            <If test={props.activeTab !== undefined}>
                <TabsContainer className="tabs-container">
                    <Tab className={props.activeTab === 'All' ? 'active' : ''} onClick={() => props.setActiveTab('All')}>TODOS</Tab>
                    <Tab className={props.activeTab === 'For You' ? 'active' : ''} onClick={() => props.setActiveTab('For You')}>RECOMENDADO</Tab>
                    <Tab className={props.activeTab === 'Popular' ? 'active' : ''} onClick={() => props.setActiveTab('Popular')}>POPULAR</Tab>
                </TabsContainer>
            </If>
        </Container>
    )
}

export default Header;