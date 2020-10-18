import React from 'react';
import {Image} from 'react-bootstrap';
import "./defaultPage-styles.scss";
import CssAnimationImage from './../assets/css_animation.gif';

const DefaultPage = () => {
    return (
        <div className="defaultPageContainer">
            <h4 className="mB20">CSS Arts</h4>
            <p>
                This is a collection of pure CSS arts.
            </p>
            <p className="pT20">
                <strong>Note:-</strong>
                    The CSS arts that are striked out, are not yet completed.
            </p>
            <div className="imageContainer pT20">
                <Image src={CssAnimationImage} fluid alt={"CSS Animation gif"} className="image" />
            </div>
        </div>
    );
}

export default DefaultPage;