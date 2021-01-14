import React, { useEffect } from 'react';
import * as d3 from 'd3';
// import { set } from 'd3';
import Tooltip from '../../ChartAssets/Tooltip';
import Data from './data.json';

const defaultOptions = {
    width: 600,
    height: 465,
    margin: {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    },
    cornerRadius: 0
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
        radius = Math.min(width, height) / 2,
        thickness = options?.thickness ?? radius * 0.25;

    const arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius - thickness);

    const pie = d3.pie()
        .sort(null)
        .value(function (d) { return d.value; });

    const svg = d3.select(node)
        .attr("class", "donutChartSvg")
        .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom) + "");

    let parentGroup = svg.selectAll(".parentGroup").data([0]);
    parentGroup.enter()
        .append("g")
        .attr("class", "parentGroup")
        .attr("transform", "translate(" +
            ((margin.left - margin.right) +
                width / 2
            ) +
            "," +
            ((margin.top - margin.bottom) +
                height / 2
            ) +
            ")"
        );
    parentGroup = svg.selectAll(".parentGroup");

    const donutArc = parentGroup.selectAll(".arc").data(pie(data));

    donutArc.exit().remove();

    donutArc
        .enter()
        .append("path")
        .attr("class", "arc")
        .on('mousemove', function (event, d) { Tooltip(event, d.data, { className: "donutTooltip" }); })
        .on('mouseout', Tooltip.hide)
        .merge(donutArc)
        .style("fill", function (d) { return d.data.fill; })
        .transition()
        .duration(500)
        .attrTween('d', function (d) {
            var i = d3.interpolate(d.startAngle, d.endAngle);
            return function (t) {
                d.endAngle = i(t);
                return arc(d)
            }
        });
}

const DonutChart = ({ data = Data, options }) => {
    const svgNode = React.useRef();
    useEffect(() => {
        getChart(svgNode.current, data, options);
    }, [data, options]);
    return (
        <div className="chartWrapper donutChartWrapper">
            <svg ref={svgNode} />
        </div>
    );
}

export default DonutChart;