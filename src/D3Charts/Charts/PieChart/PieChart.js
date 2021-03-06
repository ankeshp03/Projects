import React, { useEffect } from 'react';
import * as d3 from 'd3';
// import { set } from 'd3';
import Tooltip from './../../ChartAssets/Tooltip';
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
    tooltip: true,
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
        };
        // cornerRadius = options?.cornerRadius ?? defaultOptions.cornerRadius;

    var radius = Math.min(width, height) / 2;

    var arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    var pie = d3.pie()
        .sort(null)
        .value(function (d) { return d.value; });

    var svg = d3.select(node)
        .attr("class", "pieChartSvg")
        .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom) + "");

    var parentGroup = svg.selectAll(".parentGroup").data([0]);
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
        );;
    parentGroup = svg.selectAll(".parentGroup");

    var pieArc = parentGroup.selectAll(".arc").data(pie(data));

    // var oldData = parentGroup.select(".slices")
    //     .selectAll("path")
    //     .data().map(function (d) { return d.data });

    // if (oldData.length === 0) oldData = data;

    // var was = mergeWithFirstEqualZero(data, oldData);
    // var is = mergeWithFirstEqualZero(oldData, data);

    // var key = function (d) { return d.data.label; };

    // var slice = parentGroup.select(".slices")
    //     .selectAll("path")
    //     .data(pie(was), key);

    // slice.enter()
    //     .insert("path", ".slices")
    //     .attr("class", "slice")
    //     .style("fill", function (d) { return d.data.fill; })
    //     .each(function (d) {
    //         this._current = d;
    //     });

    // slice = parentGroup.select(".slices")
    //     .selectAll("path")
    //     .data(pie(is), key);

    // slice.transition()
    //     .duration(500)
    //     .attrTween("d", function (d) {
    //         var interpolate = d3.interpolate(this._current, d);
    //         var _this = this;
    //         return function (t) {
    //             _this._current = interpolate(t);
    //             return arc(_this._current);
    //         };
    //     });

    // slice = parentGroup.select(".slices")
    //     .selectAll("path")
    //     .data(pie(data), key);

    // slice.exit()
    //     .transition()
    //     .delay(500)
    //     .duration(0)
    //     .remove();

    // function mergeWithFirstEqualZero(first, second) {

    //     var secondSet = new Set();

    //     second.forEach(function (d) { secondSet.add(d.label); });

    //     var onlyFirst = first
    //         .filter(function (d) { return !secondSet.has(d.label) })
    //         .map(function (d) { return { label: d.label, value: 0 }; });

    //     var sortedMerge = d3.merge([second, onlyFirst])
    //         .sort(function (a, b) {
    //             return d3.ascending(a.label, b.label);
    //         });

    //     return sortedMerge;
    // }

    pieArc.exit().remove();

    pieArc
        .enter()
        .append("path")
        .attr("class", "arc")
        .on('mousemove', function (event, d) { Tooltip(event, d.data, { className: "pieTooltip" }); })
        .on('mouseout', Tooltip.hide)
        .merge(pieArc)
        .style("fill", function (d) { return d.data.fill; })
        // .attr("d", arc);
        .transition()
        // .delay(function (d, i) {
        //     return i * 500;
        // })
        .duration(500)
        .attrTween('d', function (d) {
            var i = d3.interpolate(d.startAngle, d.endAngle);
            return function (t) {
                d.endAngle = i(t);
                return arc(d)
            }
        });
    // .each(function (d) {
    //     this._current = d; // Store the displayed angles in _current.
    // })
    // .transition()
    // .delay(function (d, i) {
    //     return i * 500;
    // })
    // .duration(500)
    // .attrTween("d", arcTween);

    // pieArc = parentGroup.selectAll(".arc")
    //     .transition()
    //     .duration(500)
    //     .attrTween("d", arcTween);

    // function arcTween(d) {
    //     var i = d3.interpolate(this._current, d);
    //     return function (t) {
    //         return arc(i(t));
    //     };
    // }
}

const PieChart = ({ data = Data, options }) => {
    const svgNode = React.useRef();
    useEffect(() => {
        getChart(svgNode.current, data, options);
    }, [data, options]);
    return (
        <div className="chartWrapper pieChartWrapper">
            <svg ref={svgNode} />
        </div>
    );
}

export default PieChart;