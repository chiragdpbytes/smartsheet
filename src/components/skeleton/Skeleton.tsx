import React from "react";
import "./Skeleton.scss";

export const Skeleton = () => {
    return (
        <div className="skeleton-div">
            <div className="shine one"></div>
            <div className="shine two"></div>
            <div className="shine three"></div>
        </div>
    );
}