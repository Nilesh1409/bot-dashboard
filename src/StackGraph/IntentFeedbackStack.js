import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./StackedBarChart.css";

const IntentFeedbackStackedBarChart = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const masterData = [
    {
      year: 2023,
      month: "November",
      Farming_related: { good: 634, bad: 93 },
      Change_crop: { good: 34, bad: 12 },
      Unclear: { good: 25, bad: 10 },
      Disappointment: { good: 2, bad: 1 },
      Referring_back: { good: 2, bad: 0 },
      Greeting: { good: 1, bad: 0 },
    },
    {
      year: 2023,
      month: "December",
      Farming_related: { good: 212, bad: 29 },
      Exit: { good: 3, bad: 0 },
      Unclear: { good: 14, bad: 10 },
      Change_crop: { good: 20, bad: 2 },
      Referring_back: { good: 3, bad: 0 },
      Disappointment: { good: 1, bad: 0 },
    },
    {
      year: 2024,
      month: "January",
      Farming_related: { good: 247, bad: 44 },
      Change_crop: { good: 18, bad: 4 },
      Unclear: { good: 18, bad: 8 },
      Referring_back: { good: 5, bad: 0 },
      Exit: { good: 1, bad: 0 },
    },
    {
      year: 2024,
      month: "February",
      Farming_related: { good: 603, bad: 81 },
      Referring_back: { good: 1, bad: 2 },
      Unclear: { good: 30, bad: 6 },
      Change_crop: { good: 24, bad: 9 },
      Exit: { good: 3, bad: 0 },
      Greeting: { good: 2, bad: 1 },
    },
    {
      year: 2024,
      month: "March",
      Farming_related: { good: 685, bad: 142 },
      Unclear: { good: 21, bad: 10 },
      Greeting: { good: 3, bad: 1 },
      Change_crop: { good: 22, bad: 9 },
      Exit: { good: 2, bad: 0 },
    },
    {
      year: 2024,
      month: "April",
      Farming_related: { good: 478, bad: 153 },
      Change_crop: { good: 17, bad: 13 },
      Unclear: { good: 5, bad: 6 },
      Referring_back: { good: 1, bad: 0 },
      Greeting: { good: 1, bad: 0 },
      Exit: { good: 1, bad: 0 },
    },
    {
      year: 2024,
      month: "May",
      Farming_related: { good: 103, bad: 30 },
      Change_crop: { good: 4, bad: 2 },
      Unclear: { good: 3, bad: 2 },
    },
  ];

  const [intent, setIntent] = useState("Farming_related");

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
      .text("User Intent vs Feedback");

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
          <option value="Farming_related">Farming related</option>
          <option value="Unclear">Unclear</option>
          <option value="Exit">Exit</option>
          <option value="Referring_back">Referring back</option>
          <option value="Disappointment">Disappointment</option>
          <option value="Greeting">Greeting</option>
        </select>
      </span>
      <div ref={tooltipRef} className="tooltip-bar"></div>
    </div>
  );
};

export default IntentFeedbackStackedBarChart;
