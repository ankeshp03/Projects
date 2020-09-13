import React from "react";
import * as d3 from "d3";
// import { interpolatePath } from 'd3-interpolate-path';
import Tooltip from './../../ChartAssets/Tooltip';
import Data from "./data.json";

class GaugeChart extends React.Component {
    constructor() {
        super();
        this.createGaugeChart = this.createGaugeChart.bind(this);
    }

    componentDidMount() {
        d3.selectAll(".custom-tooltip").style("display", "none");
        this.createGaugeChart();
    }

    componentDidUpdate() {
        d3.selectAll(".custom-tooltip").style("display", "none");
        this.createGaugeChart();
    }

    createGaugeChart() {
        var node = this.node;

        var defaultOptions = {
            title: "",
            width: 800,
            height: 465,
            margin: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5,
            },
            tooltip: true,
            tooltipFor: {
                pointer: true,
                arcs: true
            },
            thickness: 35,
            minAngle: -135,
            maxAngle: 135,
            currentValueText: {
                fill: "333",
                position: "bottom"
            },
            outerRing: {
                show: true,
                gap: 15,
                thickness: 40,
                fill: "#ccc"
            },
            pointerOptions: {
                pointer: {
                    show: true,
                    width: 7,
                    tailLength: 45,
                    headLengthPercent: 1,
                    maxValue: 100,
                    currentValue: 0,
                    fill: "#000"
                },
                circle: {
                    show: true,
                    radius: 20,
                    fill: "#4b83fc"
                }
            }
        };

        /**
         * Get the translate values of the current value text based on the position.
         * @param {string} position - Position of the center value text.
         * @param {string} radius - Radius of the outer ring (if show is true) or the gauge arcs.
         * @returns {string} The calculated translate value.
         */
        const getTextPosition = (position, radius) => {
            switch (position.toLowerCase()) {
                case "bottom": return `(0, ${(radius / 2)})`;
                case "left": return `(${(-radius / 2)}, ${0})`;
                case "right": return `(${(radius / 2)}, ${0})`;
                default: return `(0, ${(-radius / 2)})`;
            }
        };

        var data = this.props.data ?? Data,

            options = this.props.options ?? {},

            width = options?.width ?? defaultOptions.width,
            height = options?.height ?? defaultOptions.height,

            margin = {
                top: options?.margin?.top ?? defaultOptions.margin.top,
                right: options?.margin?.right ?? defaultOptions.margin.right,
                bottom: options?.margin?.bottom ?? defaultOptions.margin.bottom,
                left: options?.margin?.left ?? defaultOptions.margin.left
            };

        /** @description - Options for the pointer needle and the circle. */
        var pointerOptions = {
            pointer: {
                show: options?.pointerOptions?.pointer.show ?? defaultOptions?.pointerOptions?.pointer.show,
                width: options?.pointerOptions?.pointer.width ?? defaultOptions?.pointerOptions?.pointer.width,
                tailLength: options?.pointerOptions?.pointer.tailLength ?? defaultOptions?.pointerOptions?.pointer.tailLength,
                headLengthPercent: options?.pointerOptions?.pointer.headLengthPercent ?? defaultOptions?.pointerOptions?.pointer.headLengthPercent,
                maxValue: data?.maxValue ?? defaultOptions?.pointerOptions?.pointer.maxValue,
                currentValue: data.value ?? defaultOptions?.pointerOptions?.pointer.currentValue,
                fill: options?.pointerOptions?.pointer.fill ?? defaultOptions?.pointerOptions?.pointer.fill
            },
            circle: {
                show: options?.pointerOptions?.circle?.show ?? defaultOptions.pointerOptions.circle.show,
                radius: options?.pointerOptions?.circle?.radius ?? defaultOptions.pointerOptions.circle.radius,
                fill: options?.pointerOptions?.circle?.fill ?? defaultOptions.pointerOptions.circle.fill
            }
        },

            outerRingOptions = {
                show: options?.outerRing?.show ?? defaultOptions.outerRing.show,
                gap: options?.outerRing?.gap ?? defaultOptions.outerRing.gap,
                thickness: options?.outerRing?.thickness ?? defaultOptions.outerRing.thickness,
                fill: options?.outerRing?.fill ?? defaultOptions.outerRing.fill
            },

            currentDisplayValue = data?.displayValue ?? null,
            currentDisplayKey = data?.displayKey ?? "Current",

            /** @description - Starting angle of the arc of the gauge chart. */
            minAngle = data?.minAngle ?? defaultOptions.minAngle,

            /** @description - Starting angle of the arc of the gauge chart. */
            maxAngle = data?.maxAngle ?? defaultOptions.maxAngle,

            /** 
             * @description - Calculate the radius of the arcs of the gauge chart. 
             * Calulated using the minimum of width and height, margin and outer ring (if shown).
             * Margin, and the outer ring gap and thickness, is subtracted from the width or height, whichever is minimum.
             */
            radius = Math.min(((width / 2) - (margin.left + margin.right)), ((height / 2) - (margin.top + margin.bottom))) - (outerRingOptions.show ? (outerRingOptions.gap + outerRingOptions.thickness) : 0),

            //? Checking if chart can be adjusted based on the angle if outer ring is not shown.
            // radius = Math.min(((width / 2) - (margin.left + margin.right)), ((height / 2) + ((height / 2) * (Math.max(Math.abs(minAngle), maxAngle) * Math.PI / 180 - Math.PI / 2)) - (margin.top + margin.bottom))) - (outerRingOptions.show ? (outerRingOptions.gap + outerRingOptions.thickness) : 0), // - (!isWidthLess ? config.pointerTailLength : 0),

            currentValueTextOptions = {
                fill: options?.currentValueText?.fill ?? defaultOptions.currentValueText.fill,
                position: getTextPosition((options?.currentValueText?.position ?? defaultOptions.currentValueText.position), radius)
            },

            arcThickness = options?.thickness ?? defaultOptions.thickness,

            title = options?.title ?? defaultOptions.title,

            tooltip = options?.tooltip ?? defaultOptions.tooltip,

            tooltipFor = {
                pointer: options?.tooltipFor?.pointer ?? defaultOptions.tooltipFor.pointer,
                arcs: options?.tooltipFor?.arcs ?? defaultOptions.tooltipFor.arcs
            },

            /**
             * Sets the pointer needle length.
             * @defaultValue radius of the arcs.
             */
            pointerHeadLength = Math.round(
                radius * pointerOptions.pointer.headLengthPercent
            ),

            /** @description - Pointer data used to create the lines for the pointer needle path. */
            lineData = [
                [pointerOptions.pointer.width - 1 / 2, 0],
                [0, -pointerHeadLength],
                [-(pointerOptions.pointer.width - 1 / 2), 0],
                [0, pointerOptions.pointer.tailLength],
                [pointerOptions.pointer.width / 2, 0],
            ],

            /** @description - Calculating the angle of the current value pointer needle based on the minimum and maximum angle. */
            angle = (1 - (pointerOptions.pointer.currentValue / pointerOptions.pointer.maxValue)) * minAngle + (pointerOptions.pointer.currentValue / pointerOptions.pointer.maxValue) * maxAngle;

        /**
         * Converts the degree to radian
         * @param {number} deg - Degree to be converted to radian.
         */
        const deg2rad = (deg) => (deg * Math.PI) / 180;

        var pointerLine = d3.line().curve(d3.curveLinear);

        var pie = d3.pie()
            .sort(null)
            .value(function (d) {
                return d.value;
            })
            .startAngle(deg2rad(minAngle))
            .endAngle(deg2rad(maxAngle));

        var arc = d3
            .arc()
            .outerRadius(radius)
            .innerRadius(radius - arcThickness);

        var svg = d3
            .select(node)
            .attr("class", "gaugeChart " + title)
            .attr("viewBox", "0 0 " + (width) + " " + (height) + "");

        var parentGroup = svg.selectAll(".parentGroup").data([0]);

        parentGroup
            .enter()
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

        let arcs = parentGroup.selectAll(".arcs").data(pie(data.arcs));
        arcs.exit().remove();
        arcs
            .enter()
            .insert("path", ".pointerGroup")
            .classed("arcs", true)
            .style("fill", "transparent")
            .merge(arcs)
            .attr("d", arc)
            // .attrTween('d', (d, i, el) => {
            //     const prev = d3.select(el[i]).attr('d');
            //     const next = arc(d);
            //     return interpolatePath(prev, next);
            //   })
            // .transition()
            // .duration(1000)
            .style("fill", (d) => d.data.fill);

        arcs = parentGroup.selectAll(".arcs");

        let currentValueText = parentGroup.selectAll(".currentValueText").data(currentDisplayValue ? [currentDisplayValue] : []);
        currentValueText.exit().remove();

        currentValueText
            .enter()
            .append("text")
            .attr("class", "currentValueText")
            .attr("text-anchor", "middle")
            .style("fill", currentValueTextOptions.fill)
            .merge(currentValueText)
            .style("font-size", "30px")
            .attr("transform", "translate" + currentValueTextOptions.position)
            .text(currentDisplayValue);

        var pointerGroup = parentGroup.selectAll(".pointerGroup").data([lineData]);
        pointerGroup.exit().remove();

        if (pointerOptions.pointer.show) {
            pointerGroup
                .enter()
                .append("g")
                .attr("class", "pointerGroup")
                .attr("transform", "translate(0, 0)")
                .merge(pointerGroup)
                .each(function (eachdata) {
                    let pointer = d3
                        .select(this)
                        .selectAll(".pointer")
                        .data([eachdata]);
                    pointer.exit().remove();
                    pointer
                        .enter()
                        .append("path")
                        .attr("class", "pointer")
                        .attr("transform", "rotate(" + minAngle + ")")
                        .attr("d", pointerLine)
                        .style("stroke", pointerOptions.pointer.fill)
                        .style("stroke-width", "1px")
                        .style("stroke-linejoin", "round")
                        .attr("fill", pointerOptions.pointer.fill)
                        .merge(pointer)
                        .transition()
                        .duration(2000)
                        .ease(d3.easeElastic)
                        .attr("transform", "rotate(" + angle + ")");
                })
                .transition()
                .duration(500)
                .attr("fill", "black");
        }

        pointerGroup = parentGroup.selectAll(".pointerGroup");

        let circle = parentGroup.selectAll(".circle").data([0]);
        circle.exit().remove();

        if (pointerOptions.circle.show) {
            circle
                .enter()
                .append("circle")
                .attr("class", "circle")
                .merge(circle)
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", pointerOptions.circle.radius)
                .attr("fill", pointerOptions.circle.fill);
        }

        circle = parentGroup.selectAll(".circle");

        let outerRing = parentGroup.selectAll(".outerRing").data([0]);
        outerRing.exit().remove();

        if (outerRingOptions.show) {
            let ringPie = d3.pie();
            let ringArc = d3.arc()
                .outerRadius(radius + outerRingOptions.gap + outerRingOptions.thickness)
                .innerRadius(radius + outerRingOptions.gap);
            outerRing
                .enter()
                .datum(ringPie([1]))
                .append("path")
                .classed("outerRing", true)
                .attr("d", (d) => {
                    return ringArc(d[0])
                })
                .style("fill", outerRingOptions.fill)
                .style("stroke-width", outerRingOptions.thickness);
        }

        if (tooltip) {
            tooltip = d3.select("body").selectAll(".custom-tooltip").data([0]);
            tooltip.enter().append("div").attr("class", "custom-tooltip");
            tooltip = d3.select("body").selectAll(".custom-tooltip");

            if (tooltipFor.pointer) {
                pointerGroup
                    .on("mousemove", function (event, d) { Tooltip(event, { displayKey: currentDisplayKey, displayValue: currentDisplayValue }, { className: "gaugeChartTooltip" }); })
                    //     onMouseMove(event, `${currentDisplayKey}: ${currentDisplayValue}`);
                    // })
                    .on("mouseout", Tooltip.hide);

                circle = parentGroup.selectAll(".circle")
                    .on("mousemove", function (event, d) { Tooltip(event, { displayKey: currentDisplayKey, displayValue: currentDisplayValue }, { className: "gaugeChartTooltip" }); })
                    // .on("mousemove", function (event, d) {
                    //     onMouseMove(event, `${currentDisplayKey}: ${currentDisplayValue}`);
                    // })
                    .on("mouseout", Tooltip.hide);
            }

            if (tooltipFor.arcs) {
                arcs
                    .on("mousemove", function (event, d) { Tooltip(event, d.data, { className: "gaugeChartTooltip" }); })
                    // .on("mousemove", function (event, d) {
                    //     onMouseMove(event, `${d.data.displayKey}: ${d.data.displayValue}`);
                    // })
                    .on("mouseout", Tooltip.hide);
            }
        }

    }

    render() {
        return (
            <div className="gaugeChart-wrapper">
                <svg ref={(node) => (this.node = node)} />
            </div>
        );
    }
}

export default GaugeChart;
