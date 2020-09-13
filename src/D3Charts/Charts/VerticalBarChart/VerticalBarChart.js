import React, { useEffect } from 'react';
import * as d3 from 'd3';
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
    barWidth: 25,
    barTopRadius: 0,
    barBottomRadius: 0,
    xAxisTextHeight: 20,
    yAxisTextWidth: 60,
    dataLabels: {
        enabled: true,
        fill: "#444",
        fontSize: 13,
        height: 20
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
        barWidth = options?.barWidth ?? defaultOptions.barWidth,
        barTopRadius = options?.barTopRadius ?? defaultOptions.barTopRadius,
        barBottomRadius = options?.barBottomRadius ?? defaultOptions.barBottomRadius,
        xAxisTextHeight = options?.xAxisTextHeight ?? defaultOptions.xAxisTextHeight,
        yAxisTextWidth = options?.yAxisTextWidth ?? defaultOptions.yAxisTextWidth,
        dataLabels = {
            enabled: options?.dataLabels?.enabled ?? defaultOptions.dataLabels.enabled,
            fill: options?.dataLabels?.fill ?? defaultOptions.dataLabels.fill,
            fontSize: options?.dataLabels?.fontSize ?? defaultOptions.dataLabels.fontSize,
            height: options?.dataLabels?.fontSize ?? defaultOptions.dataLabels.height
        },
        dataLabelsWrapper =
        {
            enabled: options?.dataLabelsWrapper?.enabled ?? defaultOptions.dataLabelsWrapper.enabled,
            fill: options?.dataLabelsWrapper?.fill ?? defaultOptions.dataLabelsWrapper.fill,
            fontSize: options?.dataLabelsWrapper?.fontSize ?? defaultOptions.dataLabelsWrapper.fontSize,
            radius: options?.dataLabelsWrapper?.radius ?? defaultOptions.dataLabelsWrapper.radius,
            showArrow: options?.dataLabelsWrapper?.showArrow ?? defaultOptions.dataLabelsWrapper.showArrow,
            arrowSize: options?.dataLabelsWrapper?.arrowSize ?? defaultOptions.dataLabelsWrapper.arrowSize,
            padding: {
                top: options?.dataLabelsWrapper?.padding?.top ?? defaultOptions.dataLabelsWrapper.padding.top,
                left: options?.dataLabelsWrapper?.padding?.left ?? defaultOptions.dataLabelsWrapper.padding.left,
                right: options?.dataLabelsWrapper?.padding?.right ?? defaultOptions.dataLabelsWrapper.padding.right,
                bottom: options?.dataLabelsWrapper?.padding?.bottom ?? defaultOptions.dataLabelsWrapper.padding.bottom
            }
        };

    var xScale = d3.scaleBand()
        .range([0, ((data && data.length > 0) ? (width - yAxisTextWidth) : 0)])
        .padding(0.5)
        .domain(data.map(function (d) {
            return d.key;
        }));

    var yScale = d3.scaleLinear()
        .range([(data && data.length > 0) ? (height - xAxisTextHeight - (dataLabels.enabled ? dataLabels.height : 0)) : 0, 0])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    const svg = d3.select(node)
        .attr("class", "verticalBarSvg")
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
            .attr('transform', 'translate(0,' + (dataLabels.enabled ? dataLabels.height : 0) + ')')
            .transition().duration(1000)
            .call(d3.axisLeft(yScale).ticks(5));

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

    var bars = parentGroup.selectAll(".verticalBar").data(data);

    bars.exit()
        .transition().duration(1000)
        .attr("y", (height - xAxisTextHeight))
        .attr("height", 0)
        .remove();

    bars.enter().append("rect")
        .attr("height", 0)
        .attr("x", function (d) {
            return xScale(d.key) + ((barWidth && barWidth > 0) ? ((xScale.bandwidth() + barWidth) / 2) - barWidth : 0);
        })
        .attr("y", (height - xAxisTextHeight))
        .attr("class", "verticalBar")
        .attr("fill", function (d) { return d.fill; }) //function (d) { return d.fill; })
        .merge(bars)
        .attr('transform', 'translate(' + 0 + ',0)')
        .style("cursor", (options?.callback) ? "pointer" : "default")
        .on("click", function (d) { return options?.callback(d); })
        .on('mousemove', function (event, d) { Tooltip(event, d, { className: "verticalTooltip" }); })//onMouseMove)
        .on('mouseout', Tooltip.hide)//onMouseOut)
        .attr("width", function (d) { return (barWidth && barWidth > 0) ? barWidth : (xScale.bandwidth()) })
        .transition().duration(1000)
        .attr("fill", function (d) { return d.fill; })
        .attr("x", function (d) {
            return xScale(d.key) + ((barWidth && barWidth > 0) ? ((xScale.bandwidth() + barWidth) / 2) - barWidth : 0);
        })
        .attr("y", function (d) {
            return yScale(d.value) + (dataLabels.enabled ? dataLabels.height : 0);
        })
        .attr("rx", barTopRadius)
        .attr("ry", barBottomRadius)
        .attr("height", function (d) {
            return (height - xAxisTextHeight - yScale(d.value) - (dataLabels.enabled ? dataLabels.height : 0));
        });

    let textWrapperGroup = parentGroup.selectAll(".textWrapperGroup").data(dataLabels.enabled ? data : []);

    textWrapperGroup.exit()
        .transition().duration(1000)
        .style("opacity", 0)
        .remove();

    textWrapperGroup.enter()
        .append("g")
        .attr("class", "textWrapperGroup")
        .attr("transform", function (d) {
            let translateX = xScale(d.key) + (barWidth / 2) + ((barWidth && barWidth > 0) ? ((xScale.bandwidth() + barWidth) / 2) - barWidth : 0);
            let translateY = (height - xAxisTextHeight);
            return "translate(" + translateX + "," + translateY + ")";
        })
        .on('mousemove', function (event, d) { Tooltip(event, d, { className: "verticalTooltip" }); })//onMouseMove)
        .on('mouseout', Tooltip.hide)//onMouseOut)
        .merge(textWrapperGroup)
        .transition()
        .duration(1000)
        .attr("transform", function (d) {
            let translateX = xScale(d.key) + (barWidth / 2) + ((barWidth && barWidth > 0) ? ((xScale.bandwidth() + barWidth) / 2) - barWidth : 0);
            let translateY = yScale(d.value) - 10 + (dataLabels.enabled ? dataLabels.height : 0);
            return "translate(" + translateX + "," + translateY + ")";
        })
        .each(function (eachData) {
            let group = d3.select(this);

            let text = group.selectAll(".verticalBarText").data([eachData]);
            text.exit()
                .transition().duration(1000)
                // .attr("y", height)
                .style("opacity", 0)
                .remove();

            if (dataLabels.enabled) {
                text.enter()
                    .append("text")
                    .attr("class", "verticalBarText")
                    .style("opacity", 0)
                    .text(function (d) { return (d?.displayValue?.value ?? d?.displayValue ?? "") })
                    .merge(text)

                    .style("fill", dataLabels.fill)
                    .style("font-size", dataLabels.fontSize)
                    .style("cursor", "default")
                    .style("text-anchor", "middle")
                    .attr("transform", options.rotateTextValue)
                    .transition().duration(1000)
                    .style("opacity", 1)

                    .text(function (d) { return (d?.displayValue?.value ?? d?.displayValue ?? "") });
            }

            text = group.selectAll(".verticalBarText");

            let textWrapper = group.selectAll(".verticalBarTextWrapper").data([text]);
            textWrapper.exit()
                .transition().duration(1000)
                .style("opacity", 0)
                .remove();

            let wrapperArrow = group.selectAll(".wrapperArrow").data([eachData]);
            wrapperArrow.exit()
                .transition().duration(1000)
                .style("opacity", 0)
                .remove();

            if (dataLabelsWrapper.enabled) {
                var triangle = d3.symbol().type(d3.symbolTriangle).size([dataLabelsWrapper.arrowSize]);
                textWrapper.enter()
                    .insert("rect", ".verticalBarText")
                    .attr("class", "verticalBarTextWrapper")
                    .style("opacity", 0)
                    .style("text-anchor", "middle")
                    .attr("rx", dataLabelsWrapper.radius)
                    .merge(textWrapper)
                    .attr('width', function (d) {
                        return (d.node().getBBox().width + dataLabelsWrapper.padding.left + dataLabelsWrapper.padding.right);
                    })
                    .attr('height', function (d) {
                        return (d.node().getBBox().height + dataLabelsWrapper.padding.top + dataLabelsWrapper.padding.bottom);
                    })
                    .attr("fill", dataLabelsWrapper.fill)
                    .attr("x", function (d) {
                        return -(d.node().getBBox().width / 2) - dataLabelsWrapper.padding.left;
                    })
                    .transition()
                    .duration(1000)
                    .style("opacity", 1)
                    .attr("y", function (d) {
                        return - d.node().getBBox().height - dataLabelsWrapper.padding.top + 3;
                    });

                wrapperArrow.enter()
                    .append("path")
                    .attr("class", "wrapperArrow")
                    .attr("d", triangle)
                    .attr("fill", dataLabelsWrapper.fill)
                    .attr("transform", function (d) {
                        return "translate(0, " + (dataLabelsWrapper.arrowSize / 4 - 0.5) + ") rotate(180)";
                    });
            }
        });
}

const VerticalBarChart = ({ data = Data, options }) => {
    const svgNode = React.useRef();
    useEffect(() => {
        getChart(svgNode.current, data, options);
    }, [data, options]);
    return (
        <div className="chartWrapper verticalChartWrapper">
            <svg ref={svgNode} />
        </div>
    );
}

export default VerticalBarChart;