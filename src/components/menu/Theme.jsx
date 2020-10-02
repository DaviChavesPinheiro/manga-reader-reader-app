import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showPages } from "../../store/actions/menuActions";
import { setTheme } from "../../store/actions/geralActions";

import If from "../../operator/If";

const Theme = props => {
    const visibility = props.menu.activityPages[props.menu.activityPages.length - 1] === props.target

    function closePage() {
        const activityPages = props.menu.activityPages
        activityPages.pop()
        props.showPages(activityPages)
    }

    function setTheme(theme) {
        props.setTheme(theme)
    }
   

    return (
        <If test={visibility}>
            <div className="menu-page reader">
                <header>
                    <button onClick={closePage}>&times;</button>
                    <h2>Theme</h2>
                </header>
                <section>
                    <h3>Themes</h3>
                    <div className="buttons-container">
                        <button onClick={() => setTheme('dark')} className="styled">Dark</button>
                        <button onClick={() => setTheme('light')} className="styled">Light</button>
                    </div>
                </section>
            </div>
        </If>
    )
}

const mapStateToProps = state => ({menu: state.menu, geral: state.geral })
const mapDispatchToProps = dispatch => bindActionCreators({setTheme, showPages}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Theme);