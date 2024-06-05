// src/components/StackedBarChart.js
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./StackedBarChart.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SimpleLineChart from "../SimpleLineChart/SimpleLineChart";

const DifficultyFeedbackStackedBarChart = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  const [intent, setIntent] = useState("Difficult");
  const [barChart, setBarChart] = useState(false);

  const focusStyle = {
    borderColor: "#3f51b5",
    boxShadow: "0 0 0 0.2rem rgba(63, 81, 181, 0.25)",
  };

  const blurStyle = {
    borderColor: "rgba(0, 0, 0, 0.23)",
    boxShadow: "none",
  };

  const [style, setStyle] = React.useState({});

  const masterData = [
    {
      year: 2023,
      month: "November",
      Easy: {
        good: 44,
        bad: 11,
      },
      Standard: {
        good: 163,
        bad: 15,
      },
      Difficult: {
        good: 177,
        bad: 15,
      },
      "Fairly Difficult": {
        good: 159,
        bad: 27,
      },
      Unspecified: {
        good: 31,
        bad: 34,
      },
      "Fairly Easy": {
        good: 82,
        bad: 13,
      },
      "Very Confusing": {
        good: 34,
        bad: 1,
      },
      "Very Easy": {
        good: 8,
        bad: 0,
      },
    },
    {
      year: 2023,
      month: "December",
      "Fairly Easy": {
        good: 42,
        bad: 8,
      },
      "Fairly Difficult": {
        good: 71,
        bad: 16,
      },
      Standard: {
        good: 65,
        bad: 10,
      },
      Easy: {
        good: 17,
        bad: 2,
      },
      Difficult: {
        good: 53,
        bad: 5,
      },
      "Very Confusing": {
        good: 5,
        bad: 0,
      },
    },
    {
      year: 2024,
      month: "January",
      Standard: {
        good: 92,
        bad: 22,
      },
      Difficult: {
        good: 56,
        bad: 9,
      },
      "Fairly Difficult": {
        good: 86,
        bad: 15,
      },
      "Fairly Easy": {
        good: 44,
        bad: 8,
      },
      "Very Confusing": {
        good: 4,
        bad: 0,
      },
      Easy: {
        good: 7,
        bad: 2,
      },
    },
    {
      year: 2024,
      month: "February",
      Standard: {
        good: 175,
        bad: 23,
      },
      Difficult: {
        good: 190,
        bad: 22,
      },
      "Fairly Easy": {
        good: 70,
        bad: 21,
      },
      "Very Confusing": {
        good: 20,
        bad: 1,
      },
      Easy: {
        good: 20,
        bad: 4,
      },
      "Fairly Difficult": {
        good: 186,
        bad: 27,
      },
      "Very Easy": {
        good: 2,
        bad: 1,
      },
    },
    {
      year: 2024,
      month: "March",
      Difficult: {
        good: 195,
        bad: 31,
      },
      "Fairly Easy": {
        good: 75,
        bad: 24,
      },
      "Very Confusing": {
        good: 41,
        bad: 7,
      },
      "Fairly Difficult": {
        good: 186,
        bad: 31,
      },
      Standard: {
        good: 177,
        bad: 36,
      },
      Easy: {
        good: 59,
        bad: 33,
      },
    },
    {
      year: 2024,
      month: "April",
      Easy: {
        good: 96,
        bad: 64,
      },
      Difficult: {
        good: 140,
        bad: 20,
      },
      Standard: {
        good: 89,
        bad: 28,
      },
      "Fairly Difficult": {
        good: 101,
        bad: 37,
      },
      "Very Confusing": {
        good: 20,
        bad: 2,
      },
      "Fairly Easy": {
        good: 56,
        bad: 20,
      },
      "Very Easy": {
        good: 1,
        bad: 1,
      },
    },
    {
      year: 2024,
      month: "May",
      Difficult: {
        good: 31,
        bad: 5,
      },
      Standard: {
        good: 28,
        bad: 6,
      },
      "Fairly Easy": {
        good: 12,
        bad: 8,
      },
      Easy: {
        good: 12,
        bad: 5,
      },
      "Fairly Difficult": {
        good: 20,
        bad: 9,
      },
      "Very Confusing": {
        good: 7,
        bad: 1,
      },
    },
  ];

  function getIntentFeedback(intentName) {
    return masterData.map((entry) => {
      const total = entry[intentName]
        ? entry[intentName].good + entry[intentName].bad
        : 0;
      return {
        month: entry.month,
        data: {
          Good: total > 0 ? (entry[intentName].good / total) * 100 : 0,
          Bad: total > 0 ? (entry[intentName].bad / total) * 100 : 0,
          counts: entry[intentName], // add counts
        },
      };
    });
  }

  // Example usage:
  let data = getIntentFeedback(intent);
  console.log("🚀 ~ DifficultyFeedbackStackedBarChart ~ data:", data);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 800;
    const height = 600;
    const margin = { top: 60, right: 150, bottom: 150, left: 50 };

    svg.selectAll("*").remove(); // Clear previous contents

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal().domain(Object.keys(data[0].data)).range([
      // "#4682b4",
      "#32cd32",
      "rgb(151, 25, 25)",

      // "#158a32",
      // "#ffb347",
      // "#87cefa",
      // "#929693",
    ]); // Modern color palette

    const stack = d3
      .stack()
      .keys(Object.keys(data[0].data))
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const series = stack(data.map((d) => d.data));

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
      .attr("x", (d, i) => x(data[i].month))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("class", (d) => `bar bar-${d.key}`)
      .on("mouseover", function (event, d) {
        const total = Object.values(d.data).reduce(
          (sum, value) => sum + value,
          0
        );
        const dataEntries = Object.entries(d.data);
        const colorScale = d3.scaleOrdinal().domain(Object.keys(d.data)).range([
          // "#4682b4",
          "#32cd32",
          "rgb(151, 25, 25)",
          // "#158a32",
          // "#ffb347",
          // "#87cefa",
          // "#929693",
        ]);

        const tooltipContent = `<span><strong>Good</strong>: ${
          d.data.counts.good
        } (${d.data.Good.toFixed(2)}%)</span><br/><span><strong>Bad</strong>: ${
          d.data.counts.bad
        } (${d.data.Bad.toFixed(2)}%)</span>`;

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
      .style("font-size", "16px") // Change x-axis font size
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

    // svg
    //   .append("text")
    //   .attr("x", width / 2)
    //   .attr("y", margin.top / 2)
    //   .attr("text-anchor", "middle")
    //   .style("font-size", "24px")
    //   // .style("text-decoration", "underline")
    //   .text("Feedback vs Readability");

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
      .data(color.domain().filter((key) => key !== "counts"))
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
    console.log("intent", intent);
    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.month) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.data.Good + d.data.Bad) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-family", "Arial, sans-serif")
      .text((d) => d.data.counts.good + d.data.counts.bad);
  }, [data, intent]);

  return (
    <div className="chart-container flex">
      <div>
        <div className="chart-title">
          Feedback vs Readability
          <p>
            Tracks positive and negative feedback based on the readability of
            responses over time.
          </p>
        </div>
        {barChart ? <svg ref={svgRef}></svg> : <SimpleLineChart data={data} />}
      </div>
      <span style={{ width: "170px", marginLeft: "20px" }}>
        <div>
          <span
            style={{
              marginBottom: "10px",
              display: "inline-block",
            }}
          >
            <b>Select Graph Type:</b>
          </span>
          <select
            style={{
              fontSize: "16px",
              padding: "10px 24px 10px 12px",
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
              outline: "none",
              appearance: "none",
              width: "100%",
              maxWidth: "300px",
              height: "40px",
              backgroundColor: "white",
              boxShadow: "none",
              transition:
                "border-color 300ms ease-out, box-shadow 300ms ease-out",
              ...style,
            }}
            onFocus={() => setStyle(focusStyle)}
            onBlur={() => setStyle(blurStyle)}
            onChange={(e) => setBarChart(!barChart)}
          >
            <option value="line">Line Graph</option>
            <option value="bar">Bar Graph</option>
          </select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <span style={{ marginBottom: "10px", display: "inline-block" }}>
            <b>Select Classifications:</b>
          </span>
          <select
            style={{
              fontSize: "16px",
              padding: "10px 24px 10px 12px",
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
              outline: "none",
              appearance: "none",
              width: "100%",
              maxWidth: "300px",
              height: "40px",
              backgroundColor: "white",
              boxShadow: "none",
              transition:
                "border-color 300ms ease-out, box-shadow 300ms ease-out",
              ...style,
            }}
            onFocus={() => setStyle(focusStyle)}
            onBlur={() => setStyle(blurStyle)}
            onChange={(e) => setIntent(e.target.value)}
          >
            {/* Unclear: { good: 25, bad: 168 },
      Farming_related: { good: 634, bad: 1227 },
      Change_crop: { good: 34, bad: 136 },
      Exit: { good: 0, bad: 18 },
      Referring_back: { good: 2, bad: 70 },
      Disappointment: { good: 2, bad: 4 },
      Greeting: { good: 1, bad: 8 }, */}
            <option value="Difficult">Difficult</option>
            <option value="Easy">Easy</option>
            <option value="Standard">Standard</option>
            <option value="Fairly Difficult">Fairly Difficult</option>
            <option value="Fairly Easy">Fairly Easy</option>
            <option value="Very Confusing">Very Confusing</option>
            <option value="Very Easy">Very Easy</option>
          </select>
        </div>
      </span>
      <div ref={tooltipRef} className="tooltip-bar"></div>
    </div>
  );
};

export default DifficultyFeedbackStackedBarChart;
