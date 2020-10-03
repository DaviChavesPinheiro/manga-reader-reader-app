import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showPages } from "../../store/actions/menuActions";
import { setTheme } from "../../store/actions/geralActions";

import If from "../../operator/If";

import { Container, MainTitle, Title, Close } from "./style";
import { Button as GlobalButton } from "../../styles/global";

import styled from "styled-components";

const Theme = props => {
    const visibility = props.menu.activityPages[props.menu.activityPages.length - 1] === props.target
    
    function closePage() {
        const activityPages = props.menu.activityPages
        activityPages.pop()
        props.showPages(activityPages)
    }

    const Button = styled(GlobalButton)`
        margin-bottom: 20px;

    `

    return (
        <If test={visibility}>
            <div className="menu-page reader">
                <header>
                    <Close onClick={closePage}>&times;</Close>
                    <MainTitle>Theme</MainTitle>
                </header>
                <section>
                    <Title>Themes</Title>
                    <Container>
                        <Button className={`expanded ${props.geral.theme === 'dark' ? 'actived' : ''}`} onClick={() => props.setTheme('dark')}>Dark</Button>
                        <Button className={`expanded ${props.geral.theme === 'light' ? 'actived' : ''}`} onClick={() => props.setTheme('light')}>Light</Button>
                        <Button className={`expanded ${props.geral.theme === 'blue' ? 'actived' : ''}`} onClick={() => props.setTheme('blue')}>Blue</Button>
                        <Button className={`expanded ${props.geral.theme === 'pink' ? 'actived' : ''}`} onClick={() => props.setTheme('pink')}>Pink</Button>
                        <Button className={`expanded ${props.geral.theme === 'dark-blue' ? 'actived' : ''}`} onClick={() => props.setTheme('dark-blue')}>Dark Blue</Button>
                    </Container>
                </section>
            </div>
        </If>
    )
}

const mapStateToProps = state => ({ menu: state.menu, geral: state.geral })
const mapDispatchToProps = dispatch => bindActionCreators({ setTheme, showPages }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Theme);