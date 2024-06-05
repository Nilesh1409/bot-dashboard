import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Heatmap = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const margin = { top: 50, right: 80, bottom: 30, left: 200 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Clear the previous SVG
    d3.select(ref.current).select("svg").remove();

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const topics = Array.from(
      new Set(
        data.flatMap((d) =>
          Object.keys(d).filter((key) => key !== "year" && key !== "month")
        )
      )
    );
    const months = Array.from(new Set(data.map((d) => d.month)));

    const heatmapData = data.flatMap((d) =>
      Object.keys(d)
        .filter((key) => key !== "year" && key !== "month")
        .map((key) => ({
          month: d.month,
          topic: key,
          count: d[key],
        }))
    );

    const x = d3.scaleBand().range([0, width]).domain(months).padding(0.01);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "16px");

    const y = d3.scaleBand().range([height, 0]).domain(topics).padding(0.01);

    svg
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "16px");

    const myColor = d3
      .scaleSequential()
      .interpolator(d3.interpolateReds)
      .domain([0, d3.max(heatmapData, (d) => d.count)]);

    // Create a tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(0, 0, 0, 0.6)")
      .style("color", "#fff")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("text-align", "center")
      .style("font-size", "14px");

    svg
      .selectAll()
      .data(heatmapData, function (d) {
        return d.month + ":" + d.topic;
      })
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.month))
      .attr("y", (d) => y(d.topic))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", (d) => myColor(d.count))
      .on("mouseover", function (event, d) {
        tooltip.style("visibility", "visible").text(`Count: ${d.count}`);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 20 + "px")
          .style("left", event.pageX + 20 + "px");
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
      });

    // Add a legend
    const legendHeight = 200;
    const legendWidth = 20;

    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width + 20},${(height - legendHeight) / 2})`
      );

    const legendScale = d3
      .scaleLinear()
      .domain([0, d3.max(heatmapData, (d) => d.count)])
      .range([legendHeight, 0]);

    const legendAxis = d3.axisRight(legendScale).ticks(6);

    legend
      .selectAll("rect")
      .data(d3.range(legendHeight), (d) => d)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d) => d)
      .attr("width", legendWidth)
      .attr("height", 1)
      .style("fill", (d) => myColor(legendScale.invert(d)));

    legend
      .append("g")
      .attr("transform", `translate(${legendWidth},0)`)
      .call(legendAxis);

    // Add title to the axes
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "22px")
      .style("font-weight", "700")
      .text("Topic Count Month Wise");

    // svg
    //   .append("text")
    //   .attr("transform", `translate(${width / 2},${height + 40})`)
    //   .attr("text-anchor", "middle")
    //   .style("font-size", "18px")
    //   .text("Months");
  }, [data]);

  return <div ref={ref}></div>;
};

export default Heatmap;
