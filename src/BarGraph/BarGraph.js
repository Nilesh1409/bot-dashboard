import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./BarGraph.css";

const BarGraph = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const margin = { top: 20, right: 30, bottom: 80, left: 40 };
    const width = 20 * 50 + margin.left + margin.right; // 20 groups, each 50px wide
    const height = 600 - margin.top - margin.bottom;

    // Calculate cumulative count and percentage for each group
    const totalUsers = data.length;
    const usersPerGroup = Math.ceil(totalUsers / 20);
    const totalMessages = data.reduce((acc, curr) => acc + curr.count, 0);

    const groupedData = [];
    for (let i = 0; i < 20; i++) {
      const groupStartIndex = i * usersPerGroup;
      const groupEndIndex = Math.min((i + 1) * usersPerGroup, totalUsers);
      const group = data.slice(0, groupEndIndex);
      const groupMessageCount = group.reduce(
        (acc, curr) => acc + curr.count,
        0
      );
      const groupUserPercentage = (groupEndIndex / totalUsers) * 100;
      const groupMessagePercentage = (groupMessageCount / totalMessages) * 100;

      groupedData.push({
        groupIndex: i + 1,
        groupUserPercentage,
        groupMessagePercentage,
      });
    }
    console.log("🚀 ~ useEffect ~ groupedData:", groupedData);

    svg
      .attr("width", width)
      .attr("height", height + margin.top + margin.bottom);

    const x = d3
      .scaleBand()
      .domain(groupedData.map((d) => d.groupIndex))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, 100]) // Because we are working with percentages
      .nice()
      .range([height, margin.top]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height})`)
        .call(
          d3.axisBottom(x).tickFormat((d, i) => `${i * 5} - ${(i + 1) * 5}`)
        );

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove())
        .selectAll("text")
        .style("font-size", "16px");

    svg
      .select(".x-axis")
      .call(xAxis)
      .selectAll("text")
      .style("font-size", "16px")
      .style("white-space", "pre") // Ensure line breaks are preserved
      .attr("transform", "rotate(30)")
      .style("text-anchor", "start");

    svg.select(".y-axis").call(yAxis);

    svg
      .select(".bars")
      .selectAll(".bar")
      .data(groupedData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.groupIndex))
      .attr("y", (d) => y(d.groupMessagePercentage))
      .attr("height", (d) => y(0) - y(d.groupMessagePercentage))
      .attr("width", x.bandwidth())
      .attr("fill", "#00A94F")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `
          <div class="tooltip-content">
            <h3>Group ${d.groupIndex}</h3>
            <p>User Percentage: <strong>${d.groupUserPercentage.toFixed(
              2
            )}% </strong></p>
            <p>Message Percentage: <strong>${d.groupMessagePercentage.toFixed(
              2
            )}% </strong></p>
          </div>
        `
          )
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mousemove", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `
          <div class="tooltip-content">
            <h3>Group ${d.groupIndex}</h3>
            <p>User Percentage: <strong>${d.groupUserPercentage.toFixed(
              2
            )}% </strong></p>
            <p>Message Percentage: <strong>${d.groupMessagePercentage.toFixed(
              2
            )}% </strong></p>
          </div>
        `
          )
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
  }, [data]);

  return (
    <div style={{ overflowX: "scroll", width: "80vw" }}>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="bars" />
      </svg>
      <div ref={tooltipRef} className="tooltip" />
    </div>
  );
};

export default BarGraph;
