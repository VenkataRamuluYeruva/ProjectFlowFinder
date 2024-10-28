import React from "react";
import ProjectHeader from "../Components/ProjectHeader";
import "../Styles/Project.css";

export default function Project() {

    return (
        <>
            <div className="content-header">
                <ProjectHeader />
            </div>
            <div className="content-body">
                {/* Add any content you want to render here */}
                <div className="">
                    <h1>Project</h1>
                    <p>Project content goes here</p>
                </div>
            </div>
        </>
    );
}