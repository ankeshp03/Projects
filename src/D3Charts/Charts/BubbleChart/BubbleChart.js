import React, { useEffect } from "react";
import * as d3 from "d3";
import Tooltip from '../../ChartAssets/Tooltip';
import Data from "./data.json";

const defaultOptions = {
    width: 600,
    height: 465,
    margin: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    },
    xAxis: {
        visibility: true,
        tick: true,
        domain: true,
        lines: true
    },
    yAxis: {
        visibility: true,
        tick: true,
        domain: true,
        lines: true
    },
    legends: false,
    tooltip: true,
    barHeight: 25,
    barTopRadius: 0,
    barBottomRadius: 0,
    xAxisTextHeight: 50,
    yAxisTextWidth: 50,
    dataLabels: {
        enabled: true,
        fill: "#444",
        fontSize: 13,
        height: 30
    },
    dataLabelsWrapper: {
        enabled: true,
        fill: "#ececec",
        fontSize: 13,
        radius: 2,
        showArrow: true,
        arrowSize: 20,
        padding: {
            top: 0.5,
            left: 10,
            right: 10,
            bottom: 0.5
        }
    }
};

const getChart = (node, data = [], options = {}) => {
    let width = options?.width ?? defaultOptions.width,
        height = options?.height ?? defaultOptions.height,
        margin = {
            top: options?.margin?.top ?? defaultOptions.margin.top,
            right: options?.margin?.right ?? defaultOptions.margin.right,
            bottom: options?.margin?.bottom ?? defaultOptions.margin.bottom,
            left: options?.margin?.left ?? defaultOptions.margin.left
        },
        diameter = Math.min(width, height),
        radius = diameter / 2,
        color = d3.scaleOrdinal(d3.schemeCategory10),
        prevZoomScale = 1,
        modifiedData = {},
        bubblePadding = (typeof (options.bubblePadding) === "number") ? options.bubblePadding : 1.5,
        textSize = (typeof (options.textSize) === "string") ? options.textSize : "15px",
        displayText = (typeof (options.displayText) === "boolean") ? options.displayText : true,
        substringAlphaVlue = (typeof (options.substringAlphaVlue) === "number") ? options.substringAlphaVlue : 3;

    var bubble = d3.pack()
        .size([diameter, diameter])
        .padding(bubblePadding);

    var zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", zoomed);

    const svg = d3.select(node)
        .attr("class", "BubbleSvg")
        .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom) + "");

    if (data && data.length > 0) {
        modifiedData = {
            children: data
        }
    }

    var root = d3.hierarchy(classes(modifiedData))
        .sum(function (d) { return d.value; })
        .sort(function (a, b) { return b.value - a.value; });

    var parentGroup = svg.selectAll(".parentGroup").data([data]);
    parentGroup.exit().remove();
    parentGroup
        .enter()
        .append("g")
        .merge(parentGroup)
        .attr("class", "parentGroup")
        .attr("transform", "translate(" + (margin.left + width / 9) + "," + margin.top + ")")
        .call(zoom);

    parentGroup = svg.selectAll(".parentGroup");

    bubble(root);
    var circleTextGroup = parentGroup.selectAll(".circleTextGroup").data(root.children ?? []);
    circleTextGroup.exit()
        .transition()
        .duration(1000)
        .style("opacity", "0")
        .remove();
    circleTextGroup.enter()
        .append("g")
        .attr("class", "circleTextGroup")
        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
        .merge(circleTextGroup)
        .transition()
        .duration(1000)
        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
        .each(function (eachData) {
            let circle = d3.select(this).selectAll(".circle").data([eachData]);
            circle.exit()
                .transition()
                .duration(1000)
                .attr("r", 0)
                .remove();

            circle.enter()
                .append("circle")
                .attr("class", "circle")
                .attr("r", 0)
                .style("opacity", 0)
                .style("fill", "transparent")
                .merge(circle)
                .on('mousemove', function (event, d) { Tooltip(event, d.data.originalData, { className: "bubbleTooltip" }); })
                .on('mouseout', Tooltip.hide)
                .transition()
                .duration(1000)
                .style("opacity", 1)
                .style("fill", function (d) {
                    return d?.data?.originalData?.fill ?? color(d.data.packageName);
                })
                .attr("r", function (d) { return d.r; });

            d3.select(this).selectAll(".circleText")
                .transition()
                .duration(1000)
                .style("opacity", 0)
                .remove();

            d3.select(this)
                .append("text")
                .data((displayText) ? [eachData] : [])
                .attr("class", "circleText")
                .style("cursor", "default")
                .on('mousemove', function (event, d) { Tooltip(event, d.data.originalData, { className: "bubbleTooltip" }); })
                .on('mouseout', Tooltip.hide)
                .style("opacity", 0)
                .attr("dy", ".3em")
                .style("text-anchor", "middle")
                .style("font-size", textSize)
                .transition()
                .duration(1000)
                .style("opacity", 1)
                .text(function (d) {
                    return d?.data?.originalData?.displayKey?.value?.substring?.(0, d.r / substringAlphaVlue) ?? d?.data?.originalData?.key?.substring?.(0, d.r / substringAlphaVlue) ?? "";
                });
        });

    function classes(root) {
        let classes = [];
        function recurse(name, node) {
            if (Object.keys(node).length > 0) {
                if (node.children) node.children.forEach(function (child) { recurse(node.key, child); });
                else classes.push({ packageName: name, value: node.value, originalData: node });
            }
        }
        recurse(null, root);
        return { children: classes };
    }

    function zoomed(event) {
        let transform = event.transform;
        if (prevZoomScale !== transform.k && transform.k === 1) {
            prevZoomScale = transform.k;
            parentGroup
                .transition()
                .duration(500)
                .attr("transform", "translate(" + (width / 2 - radius) + "," + (height / 2 - radius) + ")")
                .call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1));
        }
        else {
            parentGroup
                .attr("transform", "translate(" + ((width / 2 - radius) + transform.x) + "," + ((height / 2 - radius) + transform.y) + ") scale(" + transform.k + ")");
        }
        prevZoomScale = transform.k;
    }
}

const BubbleChart = ({ data = Data, options }) => {
    const svgNode = React.useRef();
    useEffect(() => {
        getChart(svgNode.current, data, options);
    }, [data, options]);
    return (
        <div className="chartWrapper bubbleChartWrapper">
            <svg ref={svgNode} />
        </div>
    );
}

export default BubbleChart;
