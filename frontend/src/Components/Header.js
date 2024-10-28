import React from "react";
import "../Styles/Header.css";

export default function Header() {
    return(
        <>
            <div className="header-left">
                <div className="project-title">
                    <h1 className="title">
                        <span className="project">Project</span>
                        <span className="flow">Flow</span>
                        <span className="finder">Finder</span>
                    </h1>
                </div>
                <div className="nav-links">
                    <ul>
                        <li>Project Hub<span class="material-symbols-outlined">stat_minus_1</span></li>
                        <li>Recent<span class="material-symbols-outlined">stat_minus_1</span></li>
                        <li>Favourites<span class="material-symbols-outlined">stat_minus_1</span></li>
                        <li><button>Create Project</button></li>
                    </ul>
                </div>
            </div>
            <div className="header-right">
                <div className="search-input">
                    <input type="text" placeholder="Search..."/>
                </div>
                <div className="profile">
                    <div className="Notifications">
                        <span className="material-icons">notifications</span>
                    </div>
                    <div className="information">
                        <span className="material-icons">info</span>
                    </div>
                    <div className="profile-photo">
                        <p>SW</p>
                    </div>
                </div>
            </div>
        </>
    )
}