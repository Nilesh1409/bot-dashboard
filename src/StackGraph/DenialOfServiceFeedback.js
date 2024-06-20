import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./StackedBarChart.css";

const DenialOfServiceFeedbackStackedBarChart = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const masterData = [
    {
      year: 2023,
      month: "December",
      "In Content": {
        good: 253,
        bad: 41,
      },
      "In Context": {
        good: 253,
        bad: 41,
      },
      "In Collection": {
        good: 253,
        bad: 41,
      },
    },
    {
      year: 2023,
      month: "November",
      "In Content": {
        good: 698,
        bad: 116,
      },
      "In Context": {
        good: 698,
        bad: 116,
      },
      "In Collection": {
        good: 698,
        bad: 116,
      },
    },
    {
      year: 2024,
      month: "April",
      "In Content": {
        good: 503,
        bad: 172,
      },
      "In Context": {
        good: 503,
        bad: 172,
      },
      "In Collection": {
        good: 503,
        bad: 172,
      },
    },
    {
      year: 2024,
      month: "February",
      "In Content": {
        good: 663,
        bad: 99,
      },
      "In Context": {
        good: 663,
        bad: 99,
      },
      "In Collection": {
        good: 663,
        bad: 99,
      },
    },
    {
      year: 2024,
      month: "January",
      "In Content": {
        good: 289,
        bad: 56,
      },
      "In Context": {
        good: 289,
        bad: 56,
      },
      "In Collection": {
        good: 289,
        bad: 56,
      },
    },
    {
      year: 2024,
      month: "March",
      "In Content": {
        good: 733,
        bad: 162,
      },
      "In Context": {
        good: 733,
        bad: 162,
      },
      "In Collection": {
        good: 733,
        bad: 162,
      },
    },
    {
      year: 2024,
      month: "May",
      "In Content": {
        good: 110,
        bad: 34,
      },
      "In Context": {
        good: 110,
        bad: 34,
      },
      "In Collection": {
        good: 110,
        bad: 34,
      },
    },
  ];

  const [intent, setIntent] = useState("In Content");

  const focusStyle = {
    borderColor: "#3f51b5",
    boxShadow: "0 0 0 0.2rem rgba(63, 81, 181, 0.25)",
  };

  const blurStyle = {
    borderColor: "rgba(0, 0, 0, 0.23)",
    boxShadow: "none",
  };

  const [style, setStyle] = React.useState({});

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

  let data = getIntentFeedback(intent);
  console.log("🚀 ~ DenialOfServiceFeedbackStackedBarChart ~ data:", data);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 800;
    const height = 600;
    const margin = { top: 60, right: 150, bottom: 150, left: 50 };

    svg.selectAll("*").remove();

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
      .range(["#32cd32", "rgb(151, 25, 25)"]);

    const stack = d3
      .stack()
      .keys(Object.keys(data[0].data).filter((key) => key !== "counts"))
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
        console.log("🚀 ~ d:11", d, data);
        // const counts = data.find((entry) => entry.month === d.data.month).data
        // .counts;
        const tooltipContent = `<span><strong>Good</strong>: ${
          d.data.counts.good
        } (${d.data.Good.toFixed(2)}%)</span><br/><span><strong>Bad</strong>: ${
          d.data.counts.bad
        } (${d.data.Bad.toFixed(2)}%)</span>`;

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
      .style("font-size", "16px")
      .attr("transform", "rotate(30)")
      .attr("text-anchor", "start")
      .attr("x", 10)
      .attr("y", 10);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "16px");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .text("Denial of Service vs Feedback");

    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - margin.right + 10}, ${margin.top})`
      )
      .attr("class", "legend-container");

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

    d3.selectAll(".legend-item")
      .on("mouseover", function (event, d) {
        d3.selectAll(".bar").style("opacity", 0.2);
        d3.selectAll(`.bar-${d}`).style("opacity", 1);
      })
      .on("mouseout", function () {
        d3.selectAll(".bar").style("opacity", 1);
      });
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
      <svg ref={svgRef}></svg>
      <span style={{ width: "170px" }}>
        <span style={{ marginBottom: "10px", display: "inline-block" }}>
          <b>Select intent:</b>
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
          <option value="In Content">In Content</option>
          <option value="In Context">In Context</option>
          <option value="In Collection">In Collection</option>
        </select>
      </span>
      <div ref={tooltipRef} className="tooltip-bar"></div>
    </div>
  );
};

export default DenialOfServiceFeedbackStackedBarChart;
