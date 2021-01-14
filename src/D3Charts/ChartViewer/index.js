import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import JsonView from 'react-json-view';
import './chartViewer-styles.scss';

const getRandomText = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const getRandomColor = () => "#" + Math.random().toString(16).slice(2, 8).toUpperCase();

const generateData = (data, options) => {
    let dataCount = (options?.randomizeDataCount === undefined || options?.randomizeDataCount === true) ? Math.random() * (options.dataCount ?? 10) : options.dataCount;
    let result = [];
    let randomFill = getRandomColor();
    let hasKeyLabel = data?.displayKey?.label ? true : false;
    let hasValueLabel = data?.displayValue?.label ? true : false;
    for (let i = 0; i < dataCount; i++) {
        let randomKey = getRandomText(Math.ceil(Math.random() * (i + 2)));
        let randomValue = Math.ceil(Math.random() * 10);
        let displayKey = (hasKeyLabel)
            ? {
                label: data.displayKey.label,
                value: randomKey
            }
            : randomKey;

        let displayValue = (hasValueLabel)
            ? {
                label: data.displayValue.label,
                value: randomValue
            }
            : randomValue;

        const resultObj = {
            key: randomKey,
            value: randomValue,
            displayKey,
            displayValue
        };

        if (!options?.noFill) {
            resultObj["fill"] = options?.diffFill ? getRandomColor() : randomFill;
        }
        result.push(resultObj);
    }
    return result;
};

const ChartViewer = ({ chart: Chart, data: defaultData, options, title, generatorOptions = {}, generator = null }) => {
    const [data, setData] = useState(defaultData);
    const getData = () => {
        setData(generator?.(generateData, getRandomText, getRandomColor) ?? generateData(data[0], generatorOptions));
    }
    return (
        <Row className="chartViewerRow">
            <Col md={7}>
                <h5>{title}</h5>
                <Chart data={data} options={options} />
            </Col>
            <Col md={5} className="dataViewerContainer borderLeft">
                <h5 className="headerContainer">
                    <span className="header">Data</span>
                    <Button className="randomDataBtn" onClick={getData}>Randomize Data</Button>
                </h5>
                <Row className="jsonViewContainer-row">
                    <Col sm={12} className="fullHeight">
                        <div className="jsonViewContainer">
                            <JsonView
                                src={data}
                                enableClipboard={false}
                                displayDataTypes={false}
                                groupArraysAfterLength={10}
                                collapseStringsAfterLength={10}
                                theme="shapeshifter:inverted"
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ChartViewer;