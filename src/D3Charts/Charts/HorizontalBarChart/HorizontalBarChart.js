import React, { useEffect } from 'react';
import * as d3 from 'd3';
import Tooltip from './../../ChartAssets/Tooltip';
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
        barHeight = options?.barHeight ?? defaultOptions.barHeight,
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
        dataLabelsWrapper = {
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

    var xScale = d3.scaleLinear()
        .range([0, ((data && data.length > 0) ? (width - yAxisTextWidth - (dataLabels.enabled ? dataLabels.height * 1.5 : 0)) : 0)])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    var yScale = d3.scaleBand()
        .range([0, (data && data.length > 0) ? (height - xAxisTextHeight) : 0])
        .padding(0.1)
        .domain(data.map(function (d) {
            return d.key;
        }));

    const svg = d3.select(node)
        .attr("class", "horizontalBarSvg")
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

    var bars = parentGroup.selectAll(".horizontalBar").data(data);

    bars.exit()
        .transition().duration(1000)
        .attr("width", 0)
        .style("opacity", 0)
        .remove();

    bars.enter().append("rect")
        .attr("width", 0)
        .attr("x", 0)
        .attr("y", function (d) {
            return yScale(d.key) - ((barHeight && barHeight > 0) ? ((barHeight - yScale.bandwidth()) / 2) : 0);
        })
        .attr("class", "horizontalBar")
        .attr("fill", function (d) { return d.fill; })
        .merge(bars)
        .style("cursor", (options?.callback) ? "pointer" : "default")
        .on("click", function (d) { return options?.callback(d); })
        .on('mousemove', function (event, d) { Tooltip(event, d, { className: "horizontalTooltip" }); })
        .on('mouseout', Tooltip.hide)
        .attr("height", function (d) { return (barHeight && barHeight > 0) ? barHeight : (yScale.bandwidth()) })
        .transition().duration(1000)
        .attr("fill", function (d) { return d.fill; })
        // .attr("x", function (d) {
        //     return yScale(d.key) + ((barHeight && barHeight > 0) ? ((yScale.bandwidth() + barHeight) / 2) - barHeight : 0);
        // })
        .attr("y", function (d) {
            return yScale(d.key) - ((barHeight && barHeight > 0) ? ((barHeight - yScale.bandwidth()) / 2) : 0);
        })
        .attr("rx", barTopRadius)
        .attr("ry", barBottomRadius)
        .attr("height", function (d) { return (barHeight && barHeight > 0) ? barHeight : (yScale.bandwidth()) })
        .attr("width", function (d) {
            return xScale(d.value);
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
            let translateY = yScale(d.key) + (barHeight / 2) + ((barHeight && barHeight > 0) ? ((yScale.bandwidth() + barHeight) / 2) - barHeight : 0);
            let translateX = 0;
            return "translate(" + translateX + "," + translateY + ")";
        })
        .on('mousemove', function (event, d) { Tooltip(event, d, { className: "horizontalTooltip" }); })//onMouseMove)
        .on('mouseout', Tooltip.hide)//onMouseOut)
        .merge(textWrapperGroup)
        .transition()
        .duration(1000)
        .attr("transform", function (d) {
            let translateY = yScale(d.key) + 5 + (barHeight / 2) + ((barHeight && barHeight > 0) ? ((yScale.bandwidth() + barHeight) / 2) - barHeight : 0);
            let translateX = xScale(d.value) + (dataLabels.enabled ? dataLabels.height : 0);
            return "translate(" + translateX + "," + translateY + ")";
        })
        .each(function (eachData) {
            let group = d3.select(this);

            let text = group.selectAll(".horizontalBarText").data([eachData]);
            text.exit()
                .transition().duration(1000)
                // .attr("y", height)
                .style("opacity", 0)
                .remove();

            if (dataLabels.enabled) {
                text.enter()
                    .append("text")
                    .attr("class", "horizontalBarText")
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

            text = group.selectAll(".horizontalBarText");

            let textWrapper = group.selectAll(".horizontalBarTextWrapper").data([text]);
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
                    .insert("rect", ".horizontalBarText")
                    .attr("class", "horizontalBarTextWrapper")
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
                    .attr("y", function (d) {
                        return - d.node().getBBox().height - dataLabelsWrapper.padding.top + 3;
                    })
                    .transition()
                    .duration(1000)
                    .style("opacity", 1);

                wrapperArrow.enter()
                    .append("path")
                    .attr("class", "wrapperArrow")
                    .attr("d", triangle)
                    .attr("fill", dataLabelsWrapper.fill)
                    .attr("transform", function (d) {
                        return "translate(" + (-dataLabels.height / 2) + ", " + (-dataLabelsWrapper.arrowSize / 4 - 0.5) + ") rotate(-90)";
                    });
            }
        });
}

const HorizontalBarChart = ({ data = Data, options }) => {
    const svgNode = React.useRef();
    useEffect(() => {
        getChart(svgNode.current, data, options);
    }, [data, options]);
    return (
        <div className="chartWrapper horizontalBarChartWrapper">
            <svg ref={svgNode} />
        </div>
    );
}


export default HorizontalBarChart;

