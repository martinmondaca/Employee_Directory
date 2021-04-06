import React from "react";
import "./style.css"

function Header() {
    return (
        <header className="container-fluid">
            <nav className="navbar navbar-dark bg-dark text-center row my-auto">
                <h2 className="navbar-brand col" id="appTitle">
                    Employee Directory
                </h2>
            </nav>
        </header>)
}

export default Header;