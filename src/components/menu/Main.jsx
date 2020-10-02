import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showPages } from "../../store/actions/menuActions";
import If from "../../operator/If";

const Main = props => {
    const visibility = props.menu.activityPages[props.menu.activityPages.length - 1] === props.target

    function closePage() {
        const activityPages = props.menu.activityPages
        activityPages.pop()
        props.showPages(activityPages)
    }

    function openReaderPage() {
        if(props.menu.activityPages[props.menu.activityPages.length - 1] === 'reader') return
        props.showPages([...props.menu.activityPages, 'reader'])
    }

    return (
        <If test={visibility}>
            <div className="menu-page main">
                <header>
                    <button onClick={closePage}>&times;</button>
                    <h2>More</h2>
                </header>
                <section>
                    <h3>Configuration</h3>
                    <button><i className="fa fa-lightbulb-o"></i>Theme</button>
                    <button onClick={openReaderPage}><i className="fa fa-book"></i>Reader</button>
                </section>
                <section>
                    <h3>About Us</h3>
                    <button><i className="fa fa-gamepad"></i>Discord</button>
                    <button><i className="fa fa-instagram"></i>Instagram</button>
                </section>
            </div>
        </If>
    )
}

const mapStateToProps = state => ({ menu: state.menu })
const mapDispatchToProps = dispatch => bindActionCreators({showPages}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Main);