import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showPages } from "../../store/actions/menuActions";
import { setImageBrightness, setImageZoom } from "../../store/actions/readerActions";

import If from "../../operator/If";

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
                <header>
                    <button onClick={closePage}>&times;</button>
                    <h2>Reader</h2>
                </header>
                <section>
                    <h3>Brightness</h3>
                    <div className="buttons-container">
                        <button onClick={(event) => setBright(event, 50)} className={`styled ${props.reader.imageBrightness === 50 ? 'actived' : ''}`}>50%</button>
                        <button onClick={(event) => setBright(event, 75)} className={`styled ${props.reader.imageBrightness === 75 ? 'actived' : ''}`}>75%</button>
                        <button onClick={(event) => setBright(event, 100)} className={`styled ${props.reader.imageBrightness === 100 ? 'actived' : ''}`}>100%</button>
                    </div>
                </section>
                <section>
                    <h3>Zoom</h3>
                    <div className="buttons-container">
                        <button onClick={(event) => setZoom(event, 70)} className={`styled ${props.reader.zoom === 70 ? 'actived' : ''}`}>70%</button>
                        <button onClick={(event) => setZoom(event, 80)} className={`styled ${props.reader.zoom === 80 ? 'actived' : ''}`}>80%</button>
                        <button onClick={(event) => setZoom(event, 90)} className={`styled ${props.reader.zoom === 90 ? 'actived' : ''}`}>90%</button>
                        <button onClick={(event) => setZoom(event, 100)} className={`styled ${props.reader.zoom === 100 ? 'actived' : ''}`}>100%</button>
                    </div>
                </section>
                
            </div>
        </If>
    )
}

const mapStateToProps = state => ({ menu: state.menu, reader: state.reader })
const mapDispatchToProps = dispatch => bindActionCreators({showPages, setImageBrightness, setImageZoom}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Reader);