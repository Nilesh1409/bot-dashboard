import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./LineChart.css";

const LineChartWithTimeSeries = ({ data }) => {
  console.log("🚀 ~ LineChartWithTimeSeries ~ data1111:", data);
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 1100;
    const height = 550;
    const margin = { top: 20, right: 50, bottom: 50, left: 100 };

    svg.attr("width", width).attr("height", height);

    // Extract keys dynamically (excluding month and year keys)
    const keys = Object.keys(data[0]).filter(
      (key) => key !== "month" && key !== "year" && key !== "monthInt"
    );

    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.month))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.max(keys, (key) => d[key]))])
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
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "16px");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "16px");

    const colors = d3.schemeCategory10;

    keys.forEach((key, idx) => {
      const keyData = data.map((d) => {
        return {
          month: d.month,
          value: d[key],
          percentage:
            ((d[key] ?? 0) / keys.reduce((sum, k) => sum + d[k], 0)) * 100,
        };
      });

      svg
        .append("path")
        .datum(keyData)
        .attr("fill", "none")
        .attr("stroke", colors[idx % colors.length])
        .attr("stroke-width", 2.5)
        .attr("d", line);

      svg
        .selectAll(`.dot-${key}`)
        .data(keyData)
        .enter()
        .append("circle")
        .attr("class", `dot-${key}`)
        .attr("cx", (d) => x(d.month))
        .attr("cy", (d) => y(d.value))
        .attr("r", 5)
        .attr("fill", colors[idx % colors.length])
        .on("mouseover", (event, d) => {
          tooltip
            .style("display", "block")
            .style("left", `${event.offsetX + 5}px`)
            .style("top", `${event.offsetY - 28}px`)
            .html(
              `<strong>${d.month}</strong><br>${key}: ${
                d.value
              } (${d.percentage.toFixed(2)}%)`
            );
        })
        .on("mouseout", () => {
          tooltip.style("display", "none");
        });
    });

    const legend = svg
      .selectAll(".legend")
      .data(keys)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend
      .append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d, i) => colors[i % colors.length]);

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

export default LineChartWithTimeSeries;
