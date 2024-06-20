import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./StackedBarChart.css";

const TopicVsFaithfulnessBarChart = ({ data, overall }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [yAxisType, setYAxisType] = useState("percentage");

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = overall ? 350 : 550;
    const height = overall ? 450 : 550;
    const margin = { top: 40, right: 150, bottom: 200, left: 50 };

    svg.selectAll("*").remove(); // Clear previous contents

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.topic))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yDomain =
      yAxisType === "percentage"
        ? [0, 100]
        : [0, d3.max(data, (d) => d3.sum(Object.values(d.faithfulness)))];
    const y = d3
      .scaleLinear()
      .domain(yDomain)
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3
      .scaleOrdinal()
      .domain(Object.keys(data[0].faithfulness))
      .range(["rgb(44, 160, 44)", "#FF7F0E", "#d62728", "#1f77b4"]); // Modern color palette

    const stack = d3
      .stack()
      .keys(Object.keys(data[0].faithfulness))
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const series = stack(
      data.map((d) => {
        const total = Object.values(d.faithfulness).reduce((a, b) => a + b, 0);
        return {
          "High Faithfulness":
            yAxisType === "percentage"
              ? (d.faithfulness["High Faithfulness"] / total) * 100
              : d.faithfulness["High Faithfulness"],
          "Medium Faithfulness":
            yAxisType === "percentage"
              ? (d.faithfulness["Medium Faithfulness"] / total) * 100
              : d.faithfulness["Medium Faithfulness"],
          "Low Faithfulness":
            yAxisType === "percentage"
              ? (d.faithfulness["Low Faithfulness"] / total) * 100
              : d.faithfulness["Low Faithfulness"],
          //   Undetermined:
          //     yAxisType === "percentage"
          //       ? (d.faithfulness.Undetermined / total) * 100
          //       : d.faithfulness.Undetermined,
          count: {
            "High Faithfulness": d.faithfulness["High Faithfulness"],
            "Medium Faithfulness": d.faithfulness["Medium Faithfulness"],
            "Low Faithfulness": d.faithfulness["Low Faithfulness"],
            // Undetermined: d.faithfulness.Undetermined,
          },
        };
      })
    );

    const bars = svg
      .append("g")
      .selectAll("g")
      .data(series)
      .enter()
      .append("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("x", (d, i) => x(data[i].topic))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("class", (d) => `bar bar-${d.key}`)
      .on("mouseover", function (event, d) {
        const dataEntries = Object.entries(d.data);
        console.log("🚀 ~ dataEntries11:", dataEntries, d.data);
        dataEntries.pop();
        const tooltipContent = dataEntries
          .map(([key, value]) => {
            console.log("🚀 ~ .map ~ value:22", value);
            return `<span><strong>${key}</strong>: ${
              d.data.count[key]
            } (${value?.toFixed(2)}${
              yAxisType === "percentage" ? "%" : ""
            })</span>`;
          })
          .join("<br/>");

        tooltip
          .style("opacity", 1)
          .html(tooltipContent)
          .style("left", event.offsetX + 5 + "px")
          .style("top", event.offsetY - 28 + "px");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.offsetX + 5 + "px")
          .style("top", event.offsetY - 28 + "px");
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .style("font-size", "14px") // Change x-axis font size
      .attr("transform", "rotate(30)")
      .attr("text-anchor", "start")
      .attr("x", 10)
      .attr("y", 10);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "16px"); // Change y-axis font size

    // Legend container
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - margin.right + 10}, ${margin.top})`
      )
      .attr("class", "legend-container");

    // Legend items
    legend
      .selectAll("legend-item")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 25})`)
      .each(function (d) {
        d3.select(this)
          .append("rect")
          .attr("width", 18)
          .attr("height", 18)
          .attr("fill", color(d))
          .attr("class", "legend-rect");

        d3.select(this)
          .append("text")
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", "0.35em")
          .text(d)
          .style("font-size", "14px")
          .style("font-family", "Arial, sans-serif");
      });

    // Add hover interaction
    d3.selectAll(".legend-item")
      .on("mouseover", function (event, d) {
        d3.selectAll(".bar").style("opacity", 0.2);
        d3.selectAll(`.bar-${d}`).style("opacity", 1);
      })
      .on("mouseout", function () {
        d3.selectAll(".bar").style("opacity", 1);
      });
  }, [data, yAxisType]);

  return (
    <div className={`inner-chart-container ${overall ? "inline" : ""}`}>
      <div
        style={{
          marginLeft: "0",
          display: "flex",
          alignItems: "flex-end",
          alignItems: "center",
        }}
      >
        <label htmlFor="yAxisSelect">Y-Axis Type:</label>
        <select
          id="yAxisSelect"
          onChange={(e) => setYAxisType(e.target.value)}
          value={yAxisType}
          style={{
            fontSize: "16px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            outline: "none",
            cursor: "pointer",
            marginTop: "10px",
            width: "150px",
          }}
        >
          <option value="percentage">Percentage</option>
          <option value="count">Count</option>
        </select>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <svg ref={svgRef}></svg>
      </div>
      <div ref={tooltipRef} className="tooltip-bar"></div>
    </div>
  );
};

export default TopicVsFaithfulnessBarChart;
