import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showPages } from "../../../store/actions/menuActions";
import { setImageBrightness, setImageZoom } from "../../../store/actions/readerActions";

import If from "../../../operator/If";
import { MainTitle, Title, Close, Header, Section, HorizontalContainer } from "../style";
import { Button } from "../../../styles/global";
const Reader = props => {
    const visibility = props.menu.activityPages[props.menu.activityPages.length - 1] === props.target

    function closePage() {
        const activityPages = props.menu.activityPages
        activityPages.pop()
        props.showPages(activityPages)
    }

    function setBright(event, bright) {
        Array.from(event.target.parentElement.children).forEach(button => {
            button.classList.remove('actived')
        })
        event.target.classList.add('actived')
        props.setImageBrightness(bright)
    }
    function setZoom(event, zoom) {
        Array.from(event.target.parentElement.children).forEach(button => {
            button.classList.remove('actived')
        })
        event.target.classList.add('actived')
        props.setImageZoom(zoom)
    }

    return (
        <If test={visibility}>
            <div className="menu-page reader">
                <Header>
                    <Close onClick={closePage}>&times;</Close>
                    <MainTitle>Reader</MainTitle>
                </Header>
                <Section>
                    <Title>Brightness</Title>
                    <HorizontalContainer>
                        <Button onClick={(event) => setBright(event, 50)} className={`flex ${props.reader.imageBrightness === 50 ? 'actived' : ''}`}>50%</Button>
                        <Button onClick={(event) => setBright(event, 75)} className={`flex ${props.reader.imageBrightness === 75 ? 'actived' : ''}`}>75%</Button>
                        <Button onClick={(event) => setBright(event, 100)} className={`flex ${props.reader.imageBrightness === 100 ? 'actived' : ''}`}>100%</Button>
                    </HorizontalContainer>
                </Section>
                <Section>
                    <Title>Zoom</Title>
                    <HorizontalContainer>
                        <Button onClick={(event) => setZoom(event, 70)} className={`flex ${props.reader.zoom === 70 ? 'actived' : ''}`}>70%</Button>
                        <Button onClick={(event) => setZoom(event, 80)} className={`flex ${props.reader.zoom === 80 ? 'actived' : ''}`}>80%</Button>
                        <Button onClick={(event) => setZoom(event, 90)} className={`flex ${props.reader.zoom === 90 ? 'actived' : ''}`}>90%</Button>
                        <Button onClick={(event) => setZoom(event, 100)} className={`flex ${props.reader.zoom === 100 ? 'actived' : ''}`}>100%</Button>
                    </HorizontalContainer>
                </Section>
                
            </div>
        </If>
    )
}

const mapStateToProps = state => ({ menu: state.menu, reader: state.reader })
const mapDispatchToProps = dispatch => bindActionCreators({showPages, setImageBrightness, setImageZoom}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Reader);