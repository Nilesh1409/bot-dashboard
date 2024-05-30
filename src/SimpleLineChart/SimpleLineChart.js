import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./LineChart.css";

const LineChart = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 900;
    const height = 550;
    const margin = { top: 20, right: 50, bottom: 50, left: 100 }; // Increase left margin

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.month))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(d.month))
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`) // Position y-axis within the margin
      .call(d3.axisLeft(y).tickFormat((d) => `${d}%`))
      .selectAll("text")
      .style("font-size", "16px");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "16px");

    const levels = ["Good", "Bad"];
    const colors = d3.schemeCategory10.slice(0, levels.length);

    levels.forEach((level, idx) => {
      const levelData = data.map((d) => {
        return {
          month: d.month,
          value: d.data[level],
          originalValue: d.data[level],
          count: d.data.counts[level.toLowerCase()],
        };
      });

      svg
        .append("path")
        .datum(levelData)
        .attr("fill", "none")
        .attr("stroke", colors[idx])
        .attr("stroke-width", 2.5)
        .attr("d", line);

      svg
        .selectAll(`.dot-${level}`)
        .data(levelData)
        .enter()
        .append("circle")
        .attr("class", `dot-${level}`)
        .attr("cx", (d) => x(d.month))
        .attr("cy", (d) => y(d.value))
        .attr("r", 5)
        .attr("fill", colors[idx])
        .on("mouseover", (event, d) => {
          tooltip
            .style("display", "block")
            .style("left", `${event.offsetX + 5}px`)
            .style("top", `${event.offsetY - 28}px`)
            .html(
              `<strong>${d.month}</strong><br>Value: ${d.originalValue.toFixed(
                2
              )}%<br>Count: ${d.count}`
            );
        })
        .on("mouseout", () => {
          tooltip.style("display", "none");
        });
    });

    const legend = svg
      .selectAll(".legend")
      .data(levels)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend
      .append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d, i) => colors[i]);

    legend
      .append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text((d) => d);
  }, [data]);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef} className="line-chart" width={600} height={450}></svg>
      <div
        ref={tooltipRef}
        className="tooltip"
        style={{
          position: "absolute",
          background: "white",
          color: "black",
          borderRadius: "5px",
          border: "1px solid black",
          padding: "5px",
          display: "none",
          pointerEvents: "none",
        }}
      ></div>
    </div>
  );
};

export default LineChart;
