import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";

const NavBar = props => {

    var prevScrollpos = window.pageYOffset
    const navBarRef = useRef()
    console.log("NavBar", navBarRef)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            const currentScrollpos = window.pageYOffset
            
            if (prevScrollpos < currentScrollpos) {
                navBarRef.current.style.bottom = "-50px"
            } else {
                navBarRef.current.style.bottom = "0px"
            }

            prevScrollpos = currentScrollpos
        })

        return () => {
            window.removeEventListener("scroll")
        }
    }, [])

    return (
        <div className={`nav-bar ${props.position}`} ref={navBarRef}>
            {props.children}
        </div>
    )
}

export default NavBar;