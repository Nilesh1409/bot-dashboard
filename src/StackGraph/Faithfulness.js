import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./StackedBarChart.css";

const StackedBarChart = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 550;
    const height = 550;
    const margin = { top: 40, right: 150, bottom: 150, left: 50 };

    svg.selectAll("*").remove(); // Clear previous contents

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.intent))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3
      .scaleOrdinal()
      .domain(Object.keys(data[0].faithfulness))
      .range([
        "#4682b4",
        "#32cd32",
        "#158a32",
        "#ffb347",
        "#87cefa",
        "#929693",
      ]); // Modern color palette

    const stack = d3
      .stack()
      .keys(Object.keys(data[0].faithfulness))
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const series = stack(
      data.map((d) => {
        const total = Object.values(d.faithfulness).reduce((a, b) => a + b, 0);
        return {
          High: (d.faithfulness.High / total) * 100,
          Medium: (d.faithfulness.Medium / total) * 100,
          Low: (d.faithfulness.Low / total) * 100,
          // Undetermined: (d.faithfulness.Undetermined / total) * 100,
          count: {
            High: d.faithfulness.High,
            Medium: d.faithfulness.Medium,
            Low: d.faithfulness.Low,
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
      .attr("x", (d, i) => x(data[i].intent))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("class", (d) => `bar bar-${d.key}`)
      .on("mouseover", function (event, d) {
        console.log("🚀 ~ d:112", d);
        const dataEntries = Object.entries(d.data);
        dataEntries.pop();
        console.log("🚀 ~ dataEntries:", dataEntries);
        const tooltipContent = dataEntries
          .map(([key, value]) => {
            return `<span><strong>${key}</strong>: ${
              d.data.count[key]
            } (${value.toFixed(2)}%)</span>`;
          })
          .join("<br/>");

        tooltip
          .style("opacity", 1)
          .html(tooltipContent)
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
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

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .text("Faithfulness");

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
  }, [data]);

  return (
    <div className="chart-container">
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} className="tooltip-bar"></div>
    </div>
  );
};

export default StackedBarChart;
