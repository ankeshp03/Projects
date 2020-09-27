import React, { useEffect } from 'react';
import * as d3 from 'd3';
import Tooltip from './../../ChartAssets/Tooltip';
import Data from './data.json';

const defaultOptions = {
    width: 600,
    height: 425,
    margin: {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
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
        formatNumber = d3.format(',d'),
        grandParentHeight = 30;
    // displayText = (typeof (options.displayText) === "boolean") ? options.displayText : true,
    // displayValue = (typeof (options.displayValue) === "boolean") ? options.displayValue : true;

    const x = d3.scaleLinear()
        .domain([0, width])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, height])
        .range([0, height]);

    const svg = d3.select(node)
        .attr("class", "treeMapSvg")
        .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom) + "");

    var parentGroup = svg.selectAll(".parentGroup").data([data]);
    parentGroup.exit().remove();
    parentGroup
        .enter()
        .append("g")
        .merge(parentGroup)
        .attr("class", "parentGroup")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    parentGroup = svg.selectAll(".parentGroup");

    let grandParent = parentGroup.selectAll('.grandParent').data([0]);
    grandParent
        .exit()
        .remove();

    var treemap = d3.treemap()
        .size([width, height - grandParentHeight])
        .paddingInner(0)
        .round(false);

    const root = d3.hierarchy(data);
    treemap(root
        .sum(function (d) {
            return d.value;
        })
        .sort(function (a, b) {
            return b.height - a.height || b.value - a.value;
        })
    );

    function display(d) {
        grandParent
            .enter()
            .append('g')
            .attr('class', 'grandParent')
            .merge(grandParent)
            .datum(d.parent)
            .style('cursor', function (eachData) {
                if (eachData) {
                    return 'pointer';
                } else {
                    return 'default';
                }
            })
            .on('click', function (_event, eachData) {
                if (eachData) {
                    zoom(eachData);
                } else {
                    return false;
                }
            });

        grandParent = parentGroup.selectAll('.grandParent');

        let grandParentRect = grandParent.selectAll('.grandParentRect').data([0]);
        grandParentRect
            .exit()
            .remove();
        grandParentRect
            .enter()
            .append('rect')
            .attr('class', 'grandParentRect')
            .attr('y', 0)
            .attr('width', width)
            .attr('height', grandParentHeight)
            .attr('fill', '#eee')
            .merge(grandParentRect)
            .datum(d.parent);

        grandParent.selectAll('.grandParentText')
            .transition()
            .duration(500)
            .style("opacity", 0)
            .remove();

        grandParent
            .append('text')
            .data([0])
            .attr('class', 'grandParentText')
            .style('font-size', '1em')
            .attr('x', 6)
            .attr('y', grandParentHeight / 1.5)
            .text(name(d))
            .style("opacity", 0)
            .transition()
            .duration(500)
            .style("opacity", 1);

        let depth = parentGroup.selectAll('.depth').data([0]);
        depth
            .exit()
            .remove();
        depth
            .enter()
            .insert('g', '.grandParent')
            .attr('class', 'depth')
            .attr('transform', 'translate(0,' + (grandParentHeight) + ')')
            .merge(depth)
            .datum(d);

        depth = parentGroup.selectAll('.depth');

        let children = depth.selectAll('.children').data(d.children);
        children
            .exit()
            .transition()
            .duration(500)
            .style("opacity", 0)
            .remove();
        children
            .enter()
            .append('g')
            .attr('class', 'children')
            .merge(children)
            .style('cursor', function (eachChildren) {
                if (eachChildren.height) {
                    return 'pointer';
                } else {
                    return 'default';
                }
            })
            .on('click', function (_event, eachChildren) {
                if (eachChildren.height) {
                    zoom(eachChildren);
                } else {
                    return false;
                }
            })
            .each(function (eachChildren, i) {
                const thisChildren = d3.select(this);
                const child = thisChildren.selectAll('.child').data(eachChildren.children || [eachChildren]);
                child
                    .exit()
                    .remove();
                child
                    .enter()
                    .insert('rect', '.parent')
                    .attr('class', 'child')
                    .style('stroke', 'white')
                    .style('stroke-width', '5px')
                    .merge(child)
                    .transition('childTransition')
                    .duration(500)
                    .call(rect);

                const parent = thisChildren.selectAll('.parent').data([eachChildren]);
                parent
                    .exit()
                    .remove();
                parent
                    .enter()
                    .append('rect')
                    .attr('class', 'parent')
                    .style('stroke', 'white')
                    .style('stroke-width', '5px')
                    .merge(parent)
                    .on('mouseover', function (event, d) {
                        d3.select(this)
                            .transition('toggleOpacity')
                            .duration(500)
                            .style('opacity', 0.25);
                        Tooltip(event, { displayKey: d.data.displayKey, displayValue: { ...d.data.displayValue, value: d.value } }, { className: "treeMapTooltip" });
                    })
                    .on('mousemove', function (event, d) {
                        d3.select(this)
                            .transition('toggleOpacity')
                            .duration(500)
                            .style('opacity', 0.25);
                        Tooltip(event, { displayKey: d.data.displayKey, displayValue: { ...d.data.displayValue, value: d.value } }, { className: "treeMapTooltip" });
                    })
                    .on('mouseout', function () {
                        d3.select(this)
                            .transition('toggleOpacity')
                            .duration(500)
                            .style('opacity', 1);
                        Tooltip.hide();
                    })
                    .transition('parentTransition')
                    .duration(500)
                    .call(rect);

                thisChildren.selectAll('.parentText')
                    .transition()
                    .duration(500)
                    .style("opacity", 0)
                    .remove();

                thisChildren
                    .data([eachChildren])
                    .append('text')
                    .attr('class', 'parentText')
                    .style("opacity", 0)
                    .attr('transform', function (eachData) {
                        return 'translate(' + (x(eachData.x0) + 10) + ',' + y(0) + ')';
                    })
                    .text(eachChildren.data.key + ' (' + formatNumber(eachChildren.value) + ')')
                    .on('mouseover', function (event, d) {
                        d3.select(this.parentNode).selectAll(".parent")
                            .transition('toggleOpacity')
                            .duration(500)
                            .style('opacity', 0.25);
                        Tooltip(event, { displayKey: d.data.displayKey, displayValue: { ...d.data.displayValue, value: d.value } }, { className: "treeMapTooltip" });
                    })
                    .on('mousemove', function (event, d) {
                        d3.select(this.parentNode).selectAll(".parent")
                            .transition('toggleOpacity')
                            .duration(500)
                            .style('opacity', 0.25);
                        Tooltip(event, { displayKey: d.data.displayKey, displayValue: { ...d.data.displayValue, value: d.value } }, { className: "treeMapTooltip" });
                    })
                    .on('mouseout', function () {
                        d3.select(this.parentNode).selectAll(".parent")
                            .transition('toggleOpacity')
                            .duration(500)
                            .style('opacity', 1);
                        Tooltip.hide();
                    })
                    .transition()
                    .duration(500)
                    .attr('transform', function (eachData) {
                        return 'translate(' + (x(eachData.x0) + 10) + ',' + (y(eachData.y0) + 20) + ')';
                    })
                    .style("opacity", 1);
            });

        children = depth.selectAll('.children');

        function zoom(eachData) {
            x.domain([eachData.x0, eachData.x1]);
            y.domain([eachData.y0, eachData.y1]);
            display(eachData);
        }
    }

    function rect(eachRect) {
        eachRect
            .attr('x', function (d) {
                return x(d.x0);
            })
            .attr('y', function (d) {
                return y(d.y0);
            })
            .attr('width', function (d) {
                return x(d.x1) - x(d.x0);
            })
            .attr('height', function (d) {
                return y(d.y1) - y(d.y0);
            })
            .attr('fill', function (d) {
                return d.data.fill;
            });
    }

    function name(d) {
        return d.parent
            ? name(d.parent) + ' / ' + d.data.key + ' (' + formatNumber(d.value) + ')'
            : d.data.key + ' (' + formatNumber(d.value) + ')';
    }

    display(root);
}

const TreeMap = ({ data = Data, options }) => {
    const svgNode = React.useRef();
    useEffect(() => {
        getChart(svgNode.current, data, options);
    }, [data, options]);
    return (
        <div className="chartWrapper treeMapWrapper">
            <svg ref={svgNode} />
        </div>
    );
}

export default TreeMap;