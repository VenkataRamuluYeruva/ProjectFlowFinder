import React from "react";
import "../Styles/ProjectHeader.css";

export default function ProjectHeader() {
    return(
        <>
            <div className="projectheader-left">
                <div className="project-name">
                    <p>My Trello Hub</p>
                </div>
                <div className="project-icons">
                    <div className="project-icon">
                        {/* <span className="material-icons">star_border</span> */}
                        <span className="material-icons">star</span>
                    </div>
                    <div className="project-icon">
                        <span className="material-icons">visibility</span>
                    </div>
                </div>
                <div className="add">
                    <span>project</span>
                </div>
            </div>
            <div className="projectheader-right">
                <div className="filters items">
                    <span className="material-icons">filter_list</span>
                    <span className="text">Filter</span>
                </div>
                <div className="add items">
                    <span className="material-icons">person_add</span>
                    <span className="text">share</span>
                </div>
                <div className="project-admin items">
                    <p>Ad</p>
                </div>
                <div className="project-more items">
                    <span className="material-icons">more_horiz</span>
                </div>
            </div>
        </>
    )
}