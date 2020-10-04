import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import Display from "./Display/index";

import { Container } from "./style";

const NavBar = props => {
    const prevScrollposRef = useRef(window.pageYOffset)
    const yUpScrollAmountRef = useRef(0)
    const navBarRef = useRef()
    useEffect(() => {
        const hideOnScroll = () => {
            if(!props.hideOnScroll) return

            const currentScrollpos = window.pageYOffset

            if (currentScrollpos > prevScrollposRef.current) {
                navBarRef.current.classList.add("hide")
                yUpScrollAmountRef.current = 0
            } else {
                yUpScrollAmountRef.current += prevScrollposRef.current - currentScrollpos
                if(yUpScrollAmountRef.current >= 200){
                    navBarRef.current.classList.remove("hide")
                }
            }

            prevScrollposRef.current = currentScrollpos
                
        }
        window.addEventListener("scroll", hideOnScroll)

        return () => {
            window.removeEventListener("scroll", hideOnScroll)
        }
    }, [props.hideOnScroll])

    return (
        <Container className="nav-bar" ref={navBarRef}>
            <Display></Display>
            <div className="buttons-container">
                {props.children}
            </div>
        </Container>
    )
}

const mapStateToProps = state => ({hideOnScroll: state.navBar.hideOnScroll})

export default connect(mapStateToProps)(NavBar);