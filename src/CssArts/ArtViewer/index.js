import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import parse from 'html-react-parser';
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwlLight";
import { Pre, Line, LineNo, LineContent } from "./HighlightStyles";
import Loader from './../../DataLoader';
import './artViewer-styles.scss';

const getComponent = (key) => {
    switch (key) {
        case 'pikachu': return import('./../Arts/Pikachu');
        case 'mobileScreen': return import('./../Arts/MobileScreen');
        case 'tesseract': return import('./../Arts/Tesseract');
        case 'IndianFlag': return import('./../Arts/IndianFlag');
        case 'cssMenu': return import('./../Arts/CssMenu');
        case 'umbrella': return import('./../Arts/Umbrella');
        case 'hamburgerMenu': return import('./../Arts/HamburgerMenu');
        case 'sevenSegmentDisplay': return import('./../Arts/SevenSegmentDisplay');
        default: return import('./../Arts/Pikachu');
    }
};

const getHighlightedCode = (code, language) => {
    return (
        <Highlight {...defaultProps} theme={theme} code={code} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre className={`${className} scrollbar`} style={style}>
                    {tokens.map((line, i) => (
                        <Line key={i} {...getLineProps({ line, key: i })}>
                            <LineNo>{i + 1}</LineNo>
                            <LineContent>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </LineContent>
                        </Line>
                    ))}
                </Pre>
            )}
        </Highlight>
    );
};

const ArtViewer = ({ data: { key = "", title = "" } = {} }) => {
    const [elementDetails, setDetails] = useState({ html: "", css: "" });
    useEffect(() => {
        const getDetails = async () => {
            let details = await getComponent(key);
            setDetails(details.default);
        }
        getDetails();
    }, [key]);
    return (
        <Row className="artViewerRow">
            <Col lg={7}>
                <h5>{title}</h5>
                {
                    elementDetails.html
                        ? (
                            <div className="artWrapper">
                                {
                                    parse(elementDetails.html)
                                }
                            </div>
                        )
                        : <Loader />
                }
            </Col>
            <Col lg={5} className="codeViewerContainer borderLeft">
                <Tabs defaultActiveKey="html" id="codeTab" className="codeTab">
                    <Tab eventKey="html" title="HTML">
                        <Row className="codeContainer-row">
                            <Col sm={12} className="fullHeight">
                                <div className="codeContainer">
                                    {
                                        elementDetails.html
                                            ? getHighlightedCode(elementDetails.html, "html")
                                            : <Loader />
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="css" title="CSS">
                        <Row className="codeContainer-row">
                            <Col sm={12} className="fullHeight">
                                <div className="codeContainer">
                                    {
                                        elementDetails.css
                                            ? getHighlightedCode(elementDetails.css, "css")
                                            : <Loader />
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </Col>
        </Row >
    );
};

export default ArtViewer;