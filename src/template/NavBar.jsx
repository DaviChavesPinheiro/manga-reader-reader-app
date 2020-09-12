import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";

const NavBar = props => {
    // Colocar o hideOnScroll so no readerPage
    var prevScrollpos = window.pageYOffset
    const navBarRef = useRef()
    
    useEffect(() => {
        const hideOnScroll = () => {
            const currentScrollpos = window.pageYOffset
            
            if (prevScrollpos < currentScrollpos) {
                navBarRef.current.style.bottom = "-50px"
            } else {
                navBarRef.current.style.bottom = "0px"
            }

            prevScrollpos = currentScrollpos
        }
        window.addEventListener("scroll", hideOnScroll)

        return () => {
            window.removeEventListener("scroll", hideOnScroll)
        }
    }, [])

    return (
        <div className={`nav-bar ${props.position}`} ref={navBarRef}>
            {props.children}
        </div>
    )
}

export default NavBar;