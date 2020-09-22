import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Display from "../components/NavBar/Display";
import "./NavBar.css";

const NavBar = props => {
    var prevScrollpos = window.pageYOffset
    var yUpScrollAmount = 0
    const navBarRef = useRef()
    useEffect(() => {
        const hideOnScroll = () => {
            if(!props.hideOnScroll) return

            const currentScrollpos = window.pageYOffset

            if (currentScrollpos > prevScrollpos) {
                navBarRef.current.classList.add("hide")
                yUpScrollAmount = 0
            } else {
                yUpScrollAmount += prevScrollpos - currentScrollpos
                if(yUpScrollAmount >= 200){
                    navBarRef.current.classList.remove("hide")
                }
            }

            prevScrollpos = currentScrollpos
                
        }
        window.addEventListener("scroll", hideOnScroll)

        return () => {
            window.removeEventListener("scroll", hideOnScroll)
        }
    }, [props.hideOnScroll])

    return (
        <div className={`nav-bar`} ref={navBarRef}>
            <Display></Display>
            <div className="buttons-container">
                {props.children}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({hideOnScroll: state.navBar.hideOnScroll})

export default connect(mapStateToProps)(NavBar);