import React, { useEffect } from "react";
import * as d3 from "d3";
import Tooltip from "../../ChartAssets/Tooltip";
import Data from "./data.json";
import FontAwesome from "react-fontawesome";

const defaultOptions = {
    nodeRadius: 4,
    width: 300,
    height: 300,
    factor: 1,
    factorLegend: 0.85,
    levels: 4,
    areaOpacity: 0.2,
    margin: {
        top: 30,
        left: 80,
        right: 80,
        bottom: 30
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
        nodeRadius = options?.nodeRadius ?? defaultOptions.nodeRadius,
        factor = options?.factor ?? defaultOptions.factor,
        factorLegend = options?.factorLegend ?? defaultOptions.factorLegend,
        levels = options?.levels ?? defaultOptions.levels,
        areaOpacity = options?.areaOpacity ?? defaultOptions.areaOpacity,
        radians = 2 * Math.PI,
        duration = 750;

    let maxValue = Math.max(
        d3.max(data, function (d) {
            return d3.max(
                d.axes.map(function (axis) {
                    return axis.value;
                })
            );
        })
    );

    const allAxis = data[0].axes.map(function (d) {
        return d.displayKey.value;
    });
    const total = allAxis.length;
    const radius = factor * Math.min((width / 2), (height / 2));

    const svg = d3
        .select(node)
        .attr("class", "radarChart")
        .attr(
            "viewBox",
            "0 0 " +
            (width + margin.left + margin.right) +
            " " +
            (height + margin.top + margin.bottom) +
            ""
        );

    let parentGroup = svg.selectAll(".parentGroup").data([0]);
    parentGroup.exit().remove();
    parentGroup
        .enter()
        .append("g")
        .attr("class", "parentGroup")
        .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");

    parentGroup = svg.selectAll(".parentGroup");

    // Circular segments
    let polygonPathGroup = parentGroup.selectAll(".polygonPathGroup").data([0]);
    polygonPathGroup.exit().remove();
    polygonPathGroup.enter()
        .append("g")
        .attr("class", "polygonPathGroup");

    polygonPathGroup = parentGroup.selectAll(".polygonPathGroup");

    for (let j = 0; j < levels; j++) {
        const levelFactor = factor * radius * ((j + 1) / levels);
        const poly = d3
            .line()
            .x(function (d, i) {
                return levelFactor * (1 - Math.sin((i * radians) / total));
            })
            .y(function (d, i) {
                return levelFactor * (1 - Math.cos((i * radians) / total));
            })
            .curve(d3.curveLinearClosed);

        const polygonPath = polygonPathGroup.selectAll(".polygonPath-" + j).data(allAxis);
        polygonPath.exit().remove();
        polygonPath
            .enter()
            .append("path")
            .attr("class", "polygonPath polygonPath-" + j)
            .attr("stroke", "lightgrey")
            .attr("stroke-width", 0.2)
            .attr("transform", "translate(" + ((width / 2) - levelFactor) + ", " + ((height / 2) - levelFactor) + ")")
            .attr("fill", "transparent")
            .merge(polygonPath)
            .transition()
            .duration(duration)
            .attr("d", poly(allAxis));
    }

    let axisGroup = parentGroup.selectAll(".axisGroup").data([0]);
    axisGroup.exit().remove();
    axisGroup.enter()
        .append("g")
        .attr("class", "axisGroup");

    axisGroup = parentGroup.selectAll(".axisGroup");

    const axis = axisGroup.selectAll(".axis").data(allAxis);
    axis.exit().remove();
    axis
        .enter()
        .append("g")
        .attr("class", "axis")
        .merge(axis)
        .each(function (d, i) {
            const line = d3.select(this).selectAll(".line").data([d]);
            line.exit().remove();
            line
                .enter()
                .append("line")
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-dasharray", "2")
                .style("stroke-width", 0.4)
                .attr("x1", width / 2)
                .attr("y1", height / 2)
                .attr("x2", width / 2)
                .attr("y2", height / 2)
                .merge(line)
                .transition()
                .duration(duration)
                .attr("x2", (width / 2) * (1 - factor * Math.sin((i * radians) / total)))
                .attr("y2", (height / 2) * (1 - factor * Math.cos((i * radians) / total)));

            const axisLegend = d3.select(this).selectAll(".axisLegend").data([d]);
            axisLegend.exit().transition().duration(duration).style("opacity", 0).remove();
            axisLegend
                .enter()
                .append("text")
                .attr("class", "axisLegend")
                .style("font-family", "sans-serif")
                .style("font-size", "11px")
                .attr("text-anchor", "middle")
                .attr("dy", "1.5em")
                .attr("transform", "translate(0, -10)")
                .style("opacity", 0)
                .attr(
                    "x",
                    (width / 2) * (1 - factorLegend * Math.sin((i * radians) / total)) -
                    60 * Math.sin((i * radians) / total)
                )
                .attr(
                    "y",
                    (height / 2) * (1 - Math.cos((i * radians) / total)) -
                    20 * Math.cos((i * radians) / total)
                )
                .merge(axisLegend)
                .transition()
                .duration(duration)
                .text(d)
                .style("opacity", 1)
                .attr(
                    "x",
                    (width / 2) * (1 - factorLegend * Math.sin((i * radians) / total)) -
                    55 * Math.sin((i * radians) / total)
                )
                .attr(
                    "y",
                    (height / 2) * (1 - Math.cos((i * radians) / total)) -
                    15 * Math.cos((i * radians) / total)
                );
        });

    let seriesGroup = parentGroup.selectAll(".seriesGroup").data([0]);
    seriesGroup.exit()
        .transition().duration(duration).remove();
    seriesGroup.enter()
        .append("g")
        .attr("class", "seriesGroup");

    seriesGroup = parentGroup.selectAll(".seriesGroup");

    let seriesData = [];
    data.forEach(function (y) {
        let dataValues = [];
        y.axes.forEach(function (j, i) {
            dataValues.push([
                (width / 2) *
                (1 -
                    (parseFloat(Math.max(j.value, 0).toString()) / maxValue) *
                    factor *
                    Math.sin((i * radians) / total)),
                (height / 2) *
                (1 -
                    (parseFloat(Math.max(j.value, 0).toString()) / maxValue) *
                    factor *
                    Math.cos((i * radians) / total))
            ]);
        });
        dataValues.push(dataValues[0]);
        seriesData.push({ ...y, data: dataValues });
    });

    const radarChartSeries = seriesGroup
        .selectAll(".seriesPolygon")
        .data(seriesData);
    radarChartSeries.exit()
        .transition()
        .duration(duration)
        .style("opacity", 0)
        .attr("points", function (d) {
            let str = "";
            for (let pti = 0; pti < d.data.length; pti++) {
                str = str + (width / 2) + "," + (height / 2) + " ";
            }
            return str;
        })
        .remove();
    radarChartSeries
        .enter()
        .append("polygon")
        .attr("class", function (_d, i) { return "seriesPolygon seriesPolygon-" + i; })
        .style("stroke-width", "1px")
        .on("mouseover", function (d) {
            d3.select(this).transition().duration(duration).style("fill-opacity", 0.5);
        })
        .on("mouseout", function () {
            d3.select(this)
                .transition()
                .duration(duration)
                .style("fill-opacity", areaOpacity);
        })
        .style("opacity", 0)
        .style("fill-opacity", areaOpacity)
        .attr("points", function (d) {
            let str = "";
            for (let pti = 0; pti < d.data.length; pti++) {
                str = str + (width / 2) + "," + (height / 2) + " ";
            }
            return str;
        })
        .merge(radarChartSeries)
        .transition()
        .duration(duration)
        .style("opacity", 1)
        .style("fill", d => d.fill)
        .style("stroke", d => d.fill)
        .attr("points", function (d) {
            let str = "";
            for (let pti = 0; pti < d.data.length; pti++) {
                str = str + d.data[pti][0] + "," + d.data[pti][1] + " ";
            }
            return str;
        });

    let seriesCircleGroup = parentGroup.selectAll(".seriesCircleGroup").data(seriesData);
    seriesCircleGroup.exit()
        .transition()
        .duration(duration)
        .selectAll(".seriesCircle")
        .attr("r", 0)
        .style("opacity", 0)
        .attr("cx", (width / 2))
        .attr("cy", (height / 2))
        .remove();
    seriesCircleGroup.enter()
        .append("g")
        .attr("class", "seriesCircleGroup")
        .merge(seriesCircleGroup)
        .transition()
        .duration(duration)
        .each(function (eachData, index) {
            const circleNodes = d3.select(this)
                .selectAll(".seriesCircle")
                .data(eachData.axes);
            circleNodes.exit()
                .transition()
                .duration(duration)
                .attr("r", 0)
                .style("opacity", 0)
                .attr("cx", (width / 2))
                .attr("cy", (height / 2))
                .remove();
            circleNodes
                .enter()
                .append("circle")
                .attr("class", "seriesCircle")
                .on("mousemove", function (event, d) {
                    const getTooltipText = (classnames) => {
                        return `<h6 class='seriesName mB5'>${eachData.name}</h6>
                        <p class='${classnames.headerContainerClass} mB0'>
                            <span class='${classnames.headerLabelClass}'>${d?.displayKey?.label}: </span>
                            <span class='${classnames.headerValueClass}'>${d?.displayKey?.value ?? ""}</span>
                        </p>
                        <p class='${classnames.valueContainerClass} mB0'>
                            <span class='${classnames.valueLabelClass}'>${d?.displayValue.label}: </span>
                            <span class='${classnames.valueValueClass}'>${d?.displayValue?.value ?? ""}</span>
                        </p>`
                    };
                    seriesGroup.selectAll(".seriesPolygon-" + index)
                        .transition()
                        .duration(duration)
                        .style("fill-opacity", 0.5);
                    Tooltip(event, d, { className: "radarTooltip", customRenderer: getTooltipText });
                })
                .on("mouseout", function () {
                    seriesGroup.selectAll(".seriesPolygon-" + index)
                        .transition()
                        .duration(duration)
                        .style("fill-opacity", areaOpacity);
                    Tooltip.hide();
                })
                .attr("cx", (width / 2))
                .attr("cy", (height / 2))
                .style("stroke", "#fff")
                .style("opacity", 1)
                .merge(circleNodes)
                .transition()
                .duration(duration)
                .attr("r", nodeRadius)
                .style("fill", eachData.fill)
                .attr("cx", function (j, i) {
                    // const dataValues = [];
                    // const cMax = parseFloat(Math.max(j.value, 0).toString()) / maxValue;
                    // const cRads = (i * radians) / total;
                    // dataValues.push([
                    //     (width / 2) * (1 - cMax * factor * Math.sin(cRads)),
                    //     (height / 2) * (1 - cMax * factor * Math.cos(cRads))
                    // ]);
                    return (
                        (width / 2) *
                        (1 -
                            (Math.max(j.value, 0) / maxValue) *
                            factor *
                            Math.sin((i * radians) / total))
                    );
                })
                .attr("cy", function (j, i) {
                    return (
                        (height / 2) *
                        (1 -
                            (Math.max(j.value, 0) / maxValue) *
                            factor *
                            Math.cos((i * radians) / total))
                    );
                });
        });
};

const RadarChart = ({ data = Data, options }) => {
    const svgNode = React.useRef();
    useEffect(() => {
        getChart(svgNode.current, data, options);
    }, [data, options]);
    return (
        <div className="chartWrapper radarChartWrapper">
            {
                options.legends &&
                <ul className="legendsContainer scrollbar pL0 pT10 pB10" style={{ display: "flex", listStyleType: "none", overflow: "auto" }}>
                    {
                        data.map(({ name, fill }) => (
                            <li key={name} className="legend mR15" style={{ whiteSpace: "nowrap" }}>
                                <FontAwesome name="circle" style={{ color: fill }} className=" legendCircle mR10" />
                                <span className="legendLabel">{name}</span>
                            </li>
                        ))
                    }
                </ul>
            }
            <svg ref={svgNode} />
        </div>
    );
};

export default RadarChart;
