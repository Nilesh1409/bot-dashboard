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

const ClassificationsStackedBarChart = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  const [intent, setIntent] = useState("High Relevance");
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
      "High Relevance": {
        good: 54,
        bad: 5,
        // //none: 156,
      },
      "Low Faithfulness": {
        good: 20,
        bad: 4,
        // //none: 56,
      },
      "Medium Faithfulness": {
        good: 10,
        bad: 1,
        // //none: 23,
      },
      "High Faithfulness": {
        good: 60,
        bad: 4,
        // //none: 166,
      },
      "Low Relevance": {
        good: 22,
        bad: 2,
        //none: 69,
      },
      "Medium Relevance": {
        good: 18,
        bad: 3,
        //none: 35,
      },
    },
    {
      year: 2023,
      month: "December",
      "High Relevance": {
        good: 0,
        bad: 0,
        // //none: 156,
      },
      "Low Faithfulness": {
        good: 0,
        bad: 0,
        // //none: 56,
      },
      "Medium Faithfulness": {
        good: 0,
        bad: 0,
        // //none: 23,
      },
      "High Faithfulness": {
        good: 0,
        bad: 0,
        // //none: 166,
      },
      "Low Relevance": {
        good: 0,
        bad: 0,
        //none: 69,
      },
      "Medium Relevance": {
        good: 0,
        bad: 0,
        //none: 35,
      },
    },
    {
      year: 2024,
      month: "January",
      "High Faithfulness": {
        good: 45,
        bad: 3,
        //none: 217,
      },
      "High Relevance": {
        good: 53,
        bad: 3,
        //none: 218,
      },
      "Medium Relevance": {
        good: 13,
        bad: 1,
        //none: 47,
      },
      "Low Faithfulness": {
        good: 22,
        bad: 1,
        //none: 54,
      },
      "Low Relevance": {
        good: 22,
        bad: 0,
        //none: 77,
      },
      "Medium Faithfulness": {
        good: 17,
        bad: 0,
        //none: 43,
      },
    },
    {
      year: 2023,
      month: "February",
      "High Relevance": {
        good: 0,
        bad: 0,
        // //none: 156,
      },
      "Low Faithfulness": {
        good: 0,
        bad: 0,
        // //none: 56,
      },
      "Medium Faithfulness": {
        good: 0,
        bad: 0,
        // //none: 23,
      },
      "High Faithfulness": {
        good: 0,
        bad: 0,
        // //none: 166,
      },
      "Low Relevance": {
        good: 0,
        bad: 0,
        //none: 69,
      },
      "Medium Relevance": {
        good: 0,
        bad: 0,
        //none: 35,
      },
    },
    {
      year: 2024,
      month: "March",
      "Medium Faithfulness": {
        good: 2,
        bad: 0,
        //none: 41,
      },
      "Medium Relevance": {
        good: 2,
        bad: 0,
        //none: 80,
      },
      "High Relevance": {
        good: 32,
        bad: 5,
        //none: 359,
      },
      "High Faithfulness": {
        good: 32,
        bad: 5,
        //none: 388,
      },
      "Low Relevance": {
        good: 8,
        bad: 2,
        //none: 72,
      },
      "Low Faithfulness": {
        good: 5,
        bad: 1,
        //none: 32,
      },
    },
    {
      year: 2024,
      month: "April",
      "Medium Faithfulness": {
        good: 0,
        bad: 1,
        //none: 4,
      },
      "High Relevance": {
        good: 2,
        bad: 3,
        //none: 56,
      },
      "High Faithfulness": {
        good: 1,
        bad: 5,
        //none: 110,
      },
      "Low Relevance": {
        good: 0,
        bad: 0,
        //none: 14,
      },
      "Medium Relevance": {
        good: 0,
        bad: 1,
        //none: 20,
      },
      "Low Faithfulness": {
        good: 0,
        bad: 0,
        //none: 6,
      },
    },
    {
      year: 2024,
      month: "May",
      "High Faithfulness": {
        good: 38,
        bad: 7,
        //none: 459,
      },
      "High Relevance": {
        good: 23,
        bad: 4,
        //none: 319,
      },
      "Medium Relevance": {
        good: 5,
        bad: 1,
        //none: 69,
      },
      "Medium Faithfulness": {
        good: 2,
        bad: 0,
        //none: 28,
      },
      "Low Faithfulness": {
        good: 0,
        bad: 1,
        //none: 26,
      },
      "Low Relevance": {
        good: 3,
        bad: 0,
        //none: 58,
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
  console.log("🚀 ~ IntentFeedbackStackedBarChart234 ~ data:", data);

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

    const color = d3
      .scaleOrdinal()
      .domain(Object.keys(data[0].data).filter((key) => key !== "counts"))
      .range([
        // "#4682b4",
        "#32cd32",
        "rgb(151, 25, 25)",

        // "#158a32",
        // "#ffb347",
        // "#87cefa",
        // "#929693",
      ]); // Modern color palette
    console.log(
      "🚀 ~ useEffect ~ color:",
      color,
      Object.keys(data[0].data).filter((key) => key !== "counts")
    );

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
        console.log("🚀 ~ d:1234", d);
        const total = Object.values(d.data).reduce(
          (sum, value) => sum + value,
          0
        );
        const dataEntries = Object.entries(d.data);

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
    //   .text("Accuracy vs Feedback");

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
          Accuracy vs Feedback
          <p>
            Compares positive and negative feedback for responses across
            different relevance levels over time.
          </p>
        </div>
        {barChart ? <svg ref={svgRef}></svg> : <SimpleLineChart data={data} />}
      </div>
      <span style={{ width: "170px", marginLeft: "30px" }}>
        <div>
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
            <option value="High Relevance">High Relevance</option>
            <option value="Medium Relevance">Medium Relevance</option>
            <option value="Low Relevance">Low Relevance</option>
            <option value="High Faithfulness">High Faithfulness</option>
            <option value="Medium Faithfulness">Medium Faithfulness</option>
            <option value="Low Faithfulness">Low Faithfulness</option>
          </select>
        </div>
      </span>

      <div ref={tooltipRef} className="tooltip-bar"></div>
    </div>
  );
};

export default ClassificationsStackedBarChart;
