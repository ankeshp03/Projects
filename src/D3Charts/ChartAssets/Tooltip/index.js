import * as d3 from 'd3';
import './tooltip-styles.scss';

let tooltipEl = d3.select("body").selectAll(".custom-tooltip").data([0]);
tooltipEl.exit().remove();
tooltipEl.enter().append("div").attr("class", "custom-tooltip");
tooltipEl = d3.select("body").selectAll(".custom-tooltip");

let Tooltip = (event, data, options) => {
    let hasLabel = data?.displayKey?.label && data?.displayValue?.label;

    tooltipEl.style('top', (event.pageY) + 'px')
        .style('left', (event.pageX + 20) + 'px')
        .style("display", "block")
        .attr("class", `custom-tooltip ${options?.className}`)
        .html(
            `<div class='container pT5 pB5'>
                <div class='row'>
                    <div class='col col-sm-12'>` +
                    (hasLabel
                        ? `<p class='tooltipHeader mB0'>
                            <span class='tooltipHeader-label'>${data?.displayKey?.label}: </span>
                            <span class='tooltipHeader-value'>${data?.displayKey?.value ?? ""}</span>
                            </p>
                            <p class='tooltipValue mB0'>
                                <span class='tooltipValue-label'>${data?.displayValue.label}: </span>
                                <span class='tooltipValue-value'>${data?.displayValue?.value ?? ""}</span>
                            </p>`
                        : `<p class='tooltipHeaderValue-container mB0'>
                                <span class='tooltipHeader'>${data?.displayKey ?? ""}</span>
                                <span class='tooltipValue'>${data?.displayValue ?? ""}</span>
                            </p>`
                    ) +
                    `</div>
                </div>
            </div>`
        );

    let screenWidth = window.innerWidth,
        pointerXPosition = event.pageX,
        tooltipWidth = document.querySelector(`.${options?.className}`)?.clientWidth,
        tooltipHeight = document.querySelector(`.${options?.className}`)?.clientHeight;
    if ((pointerXPosition + tooltipWidth + 45) >= screenWidth) {
        tooltipEl.style('left', (event.pageX - tooltipWidth - 20) + 'px');
    }
    tooltipEl.style('top', (event.pageY - (tooltipHeight / 2)) + 'px');
};

Tooltip.hide = () => {
    tooltipEl.style("display", "none");
};

export default Tooltip;