import React from 'react';
import ChartViewer from '../../ChartViewer';
import TreeMap from './TreeMap';
import Data from './data.json';

const getRandomText = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const dataGenerator = (defaultGenerator) => {
    let getChildren = (level, dataCount) => {
        let children = defaultGenerator({
            key: "",
            value: 0,
            displayKey: {
                label: "Type",
                value: ""
            },
            displayValue: {
                label: "Value",
                value: "40"
            },
            fill: "#b3e2cd"
        }, { diffFill: true, dataCount })
        return children.map(child => {
            let children = (level < 2) ? getChildren(level + 1, 2) : [];
            return { ...child, children: children, value: (children.length > 0) ? null : child.value, displayValue: (children.length > 0) ? { ...child.displayValue, value: null } : child.displayValue };
        });
    };

    let parentText = getRandomText(Math.random() * 10);
    return {
        key: parentText,
        value: null,
        displayKey: {
            label: "Type",
            value: parentText
        },
        displayValue: null,
        children: getChildren(1, 10),
        fill: "#" + Math.random().toString(16).slice(2, 8).toUpperCase()
    };
};

const TreeMapViewer = () => {
    return (
        <ChartViewer chart={TreeMap} data={Data} options={{}} title={"Tree Map"} generator={dataGenerator} />
    );
};

export default TreeMapViewer;