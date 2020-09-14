import React from 'react';
import "./defaultPage-styles.scss";
import ChartAnimationImage from './../ChartAssets/assets/chart_animations.gif';

const DefaultPage = () => {
    return (
        <div className="defaultPageContainer">
            <h4 className="mB20">D3 Charts</h4>
            <p>
                This is a collection of sample charts created using D3.js, a JavaScript library.
            </p>
            <p>
                The charts are customisable and have nice animation for better experience.
            </p>
            <p className="pT20">
                <strong>Note:-</strong>
                    The chart that are striked out, are not yet completed.
            </p>
            <div className="imageContainer pT20">
                <img src={ChartAnimationImage} alt={"Charts"} className="image" />
            </div>
        </div>
    );
}

export default DefaultPage;