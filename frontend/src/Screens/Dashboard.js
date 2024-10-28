import React, { useState, useEffect } from "react";
import "../Styles/Dashboard.css";
import Header from "../Components/Header";
import ProjectSidebar from "../Components/ProjectSidebar";
import { fetchUserDetails } from "../Utils/userDetailsApi";
import { Routes, Route } from "react-router-dom";
import Project from "./Project";

export default function Dashboard() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            const response =await fetchUserDetails();
            console.log(response);
        }
        fetchDetails();
    }, []); 

    return (
        <div className="page-container">
            <div className="container-header">
                <Header />
            </div>
            <div className="container-content">
                <div className={`content-left ${isCollapsed ? 'collapsed' : ''}`}>
                    <span className="material-icons sp" onClick={toggleSidebar}>
                        {isCollapsed ? 'chevron_left' : 'chevron_right'}
                    </span>
                    {isCollapsed ? null : <ProjectSidebar />}
                </div>
                <div className={`content-right ${isCollapsed ? 'expanded' : ''}`}>
                    <Routes>
                        <Route path="/" element={<Project/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
