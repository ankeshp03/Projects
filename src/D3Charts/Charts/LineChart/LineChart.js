import React, { useEffect } from 'react';
import * as d3 from 'd3';
import Tooltip from '../../ChartAssets/Tooltip';
import Data from './data.json';

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
    lineFill: "#999",
    circleRadius: 5,
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
        xAxisOptions = {
            tick: options?.xAxis?.tick ?? defaultOptions.xAxis.tick,
            domain: options?.xAxis?.domain ?? defaultOptions.xAxis.domain,
            lines: options?.xAxis?.lines ?? defaultOptions.xAxis.lines,
            visibility: options?.xAxis?.visibility ?? defaultOptions.xAxis.visibility,
            images: options?.xAxis?.images ?? defaultOptions.xAxis.images
        },
        yAxisOptions = {
            tick: options?.yAxis?.tick ?? defaultOptions.yAxis.tick,
            domain: options?.yAxis?.domain ?? defaultOptions.yAxis.domain,
            lines: options?.yAxis?.lines ?? defaultOptions.yAxis.lines,
            visibility: options?.yAxis?.visibility ?? defaultOptions.yAxis.visibility
        },
        lineFill = options?.lineFill ?? defaultOptions.lineFill,
        circleRadius = options?.circleRadius ?? defaultOptions.circleRadius,
        xAxisTextHeight = options?.xAxisTextHeight ?? defaultOptions.xAxisTextHeight,
        yAxisTextWidth = options?.yAxisTextWidth ?? defaultOptions.yAxisTextWidth;

    var xScale = d3.scaleBand()
        .range([0, ((data && data.length > 0) ? (width - yAxisTextWidth) : 0)])
        .padding(0.1)
        .domain(data.map(function (d) {
            return d.key;
        }));

    var yScale = d3.scaleLinear()
        .range([(data && data.length > 0) ? (height - xAxisTextHeight) : 0, 0])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    var line = d3.line()
        .x(function (d) {
            return xScale(d.key) + xScale.bandwidth() / 2;
        })
        .y(function (d) {
            return yScale(d.value);
        });

    const svg = d3.select(node)
        .attr("class", "LineSvg")
        .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom) + "");

    var parentGroup = svg.selectAll(".parentGroup").data([data]);
    parentGroup.exit().remove();
    parentGroup
        .enter()
        .append("g")
        .merge(parentGroup)
        .attr("class", "parentGroup")
        .attr("transform", "translate(" + (margin.left + yAxisTextWidth) + "," + margin.top + ")");

    parentGroup = svg.selectAll(".parentGroup");

    if (xAxisOptions.visibility === true) {

        var xAxisGroup = parentGroup.selectAll(".xAxis").data((data?.length > 0) ? [0] : []);
        xAxisGroup.exit().remove();
        xAxisGroup.enter().append("g")
            .attr('transform', 'translate(0,' + (height - xAxisTextHeight) + ')')
            .attr('class', "xAxis")
            .merge(xAxisGroup)
            .transition().duration(1000)
            .call(d3.axisBottom(xScale));

        xAxisGroup = parentGroup.selectAll(".xAxis");

        if (xAxisOptions.tick === false) {
            parentGroup.selectAll("g.xAxis").style("display", "none");
        }
        if (xAxisOptions.domain === false) {
            parentGroup.selectAll("g.xAxis .domain").style("display", "none");
        }
        if (xAxisOptions.lines === false) {
            parentGroup.selectAll("g.xAxis .tick line").style("display", "none");
        }
    }

    if (yAxisOptions.visibility === true) {

        var yAxisGroup = parentGroup.selectAll(".yAxis").data((data?.length > 0) ? [0] : []);
        yAxisGroup.exit().remove();
        yAxisGroup.enter()
            .append("g")
            .attr('class', 'yAxis')
            .merge(yAxisGroup)
            .attr('transform', 'translate(-1, 0)')
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        if (yAxisOptions.tick === false) {
            parentGroup.selectAll("g.yAxis ").style("display", "none");
        }
        if (yAxisOptions.domain === false) {
            parentGroup.selectAll("g.yAxis .domain").style("display", "none");
        }
        if (yAxisOptions.lines === false) {
            parentGroup.selectAll("g.yAxis .tick line").style("display", "none");
        }
    }

    var linePath = parentGroup.selectAll(".linePath").data([0]);
    linePath.exit().remove();
    linePath.enter().append("path")
        .attr("class", "linePath")
        .merge(linePath)
        .call(transition)
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("stroke", lineFill)
        .attr("d", line(data));

    function transition(path) {
        path
            .transition()
            .duration(1700)
            .attrTween("stroke-dasharray", tweenDash);
    }
    function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function (t) { return i(t); };
    }

    var dot = parentGroup.selectAll(".dot").data(data);
    dot
        .exit()
        .transition().duration(1000)
        .attr("r", 0)
        .remove();
    dot
        .enter().append("circle")
        .attr("class", "dot")
        .on('mousemove', function (event, d) { Tooltip(event, d, { className: "lineTooltip" }); })
        .on('mouseout', Tooltip.hide)
        .attr("cx", function (d) { return xScale(d.key) + xScale.bandwidth() / 2 })
        .attr("cy", (height - xAxisTextHeight))
        .attr("fill", "#fff")
        .merge(dot)
        .attr("stroke-width", 2)
        .transition().duration(1000)
        .attr("stroke", function (d) { return d.fill; })
        .attr("r", circleRadius)
        .attr("cx", function (d) { return xScale(d.key) + xScale.bandwidth() / 2 })
        .attr("cy", function (d) { return yScale(d.value) });
}

const LineChart = ({ data = Data, options }) => {
    const svgNode = React.useRef();
    useEffect(() => {
        getChart(svgNode.current, data, options);
    }, [data, options]);
    return (
        <div className="chartWrapper lineChartWrapper">
            <svg ref={svgNode} />
        </div>
    );
}


export default LineChart;

