import React from "react";
import "../Styles/ProjectSidebar.css";

export default function ProjectSidebar() {
    return (
        <div className="project-sidebar">
            <div className="project-sidebar-header">
                <p className="p-logo">PH</p><p className="p-title">Project Hub</p>
            </div>
            <div className="project-sidebar-body">
                <div className="projects-level items-p">
                    <p className="icon"><span className="material-icons">dashboard</span></p>
                    <p className="p-text">Dashboard</p>
                </div>
                <div className="Members">
                    <p className="icon"><span className="material-icons">person</span>
                    <p className="p-text">Members</p></p>
                    <p className="plus"><span className="material-icons">add</span></p>
                </div>
                <div className="Project-hub-settings items-p">
                    <p className="icon"><span className="material-icons">settings</span></p>
                    <p className="p-text">Project Hub Settings</p>
                </div>
                <div className="Project-hub-views ">
                    <p>Project Hub Views</p>
                    <div className="Table-view items-p">
                        <p className="icon"><i className="material-icons">table_chart</i></p>
                        <p className="p-text">Table View</p>
                    </div>
                    <div className="List-view items-p">
                        <p className="icon"><i className="material-icons">list</i></p>
                        <p className="p-text">Calender View</p>
                    </div>
                </div>
                <div className="Projects">
                    <p> Your Projects</p>
                    <div className="Project-1 items-p">
                        <p className="icon"><i className="material-icons">list</i></p>
                        <p>Project 1</p>
                    </div>
                    <div className="Project-2 items-p">
                        <p className="icon"><i className="material-icons">list</i></p>
                        <p>Project 2</p>
                    </div>
                    <div className="Project-3 items-p">
                        <p className="icon"><i className="material-icons">list</i></p>
                        <p>Project 3</p>
                    </div>
                </div>
            </div>
        </div>
    );
}