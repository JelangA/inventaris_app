import React from "react";
import {Link} from "react-router-dom";

function Header() {
    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link ms-4" data-widget="pushmenu" to="#" role="button">
                            <i className="fas fa-bars"></i>
                        </Link>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to={"/"} className={"nav-link"}>Home</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
