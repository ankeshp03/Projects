import React from "react";

const DataLoader = ({ options }) => {
    return (
        <div
            className={`loaderContainer${
                options?.class?.container ? " " + options.class.container : ""
            }`}
        >
            <div className="spinner"></div>
            <h6 className="loadingText mT5 mB0">Loading</h6>
        </div>
    );
};

export default DataLoader;
