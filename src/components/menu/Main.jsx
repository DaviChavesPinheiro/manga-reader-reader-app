import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showPages } from "../../store/actions/menuActions";
import If from "../../operator/If";

import { MainTitle, Title, Close, Item } from "./style";

const Main = props => {
    const visibility = props.menu.activityPages[props.menu.activityPages.length - 1] === props.target

    function closePage() {
        const activityPages = props.menu.activityPages
        activityPages.pop()
        props.showPages(activityPages)
    }

    function addPage(page) {
        if(props.menu.activityPages[props.menu.activityPages.length - 1] === page) return
        props.showPages([...props.menu.activityPages, page])
    }

    return (
        <If test={visibility}>
            <div className="menu-page main">
                <header>
                    <Close onClick={closePage}>&times;</Close>
                    <MainTitle>More</MainTitle>
                </header>
                <section>
                    <Title>Configuration</Title>
                    <Item onClick={() => addPage('theme')}><i className="fa fa-lightbulb-o"></i>Theme</Item>
                    <Item onClick={() => addPage('reader')}><i className="fa fa-book"></i>Reader</Item>
                </section>
                <section>
                    <Title>About Us</Title>
                    <Item><i className="fa fa-gamepad"></i>Discord</Item>
                    <Item><i className="fa fa-instagram"></i>Instagram</Item>
                </section>
            </div>
        </If>
    )
}

const mapStateToProps = state => ({ menu: state.menu })
const mapDispatchToProps = dispatch => bindActionCreators({showPages}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Main);