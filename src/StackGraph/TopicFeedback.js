import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./StackedBarChart.css";
import SimpleLineChart from "../SimpleLineChart/SimpleLineChart";

const TopicFeedbackStackedBarChart = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const masterData = [
    {
      year: 2023,
      month: "November",
      Sowing: {
        good: 65,
        bad: 10,
      },
      Harvesting: {
        good: 25,
        bad: 4,
      },
      Marketing: {
        good: 12,
        bad: 5,
      },
      Fertilizers: {
        good: 84,
        bad: 13,
      },
      "Soil Management": {
        good: 48,
        bad: 5,
      },
      "Pests and Diseases": {
        good: 192,
        bad: 23,
      },
      "Not related to agriculture": {
        good: 92,
        bad: 17,
      },
      Varieties: {
        good: 75,
        bad: 12,
      },
      Unknown: {
        good: 64,
        bad: 23,
      },
      Unclear: {
        good: 36,
        bad: 4,
      },
      "Pruning Techniques": {
        good: 1,
        bad: 0,
      },
      Storage: {
        good: 4,
        bad: 0,
      },
    },
    {
      year: 2023,
      month: "December",
      "Pests and Diseases": {
        good: 71,
        bad: 10,
      },
      Unknown: {
        good: 41,
        bad: 12,
      },
      Varieties: {
        good: 17,
        bad: 2,
      },
      Sowing: {
        good: 18,
        bad: 0,
      },
      Fertilizers: {
        good: 31,
        bad: 6,
      },
      Harvesting: {
        good: 9,
        bad: 1,
      },
      "Not related to agriculture": {
        good: 24,
        bad: 2,
      },
      Marketing: {
        good: 15,
        bad: 3,
      },
      Unclear: {
        good: 15,
        bad: 3,
      },
      "Soil Management": {
        good: 10,
        bad: 2,
      },
      Storage: {
        good: 1,
        bad: 0,
      },
      "1. Unclear\n2. Not related to agriculture\n3. Not related to agriculture":
        {
          good: 1,
          bad: 0,
        },
    },
    {
      year: 2024,
      month: "January",
      Sowing: {
        good: 27,
        bad: 3,
      },
      Unclear: {
        good: 18,
        bad: 3,
      },
      "Not related to agriculture": {
        good: 29,
        bad: 8,
      },
      Fertilizers: {
        good: 33,
        bad: 6,
      },
      "Pests and Diseases": {
        good: 61,
        bad: 8,
      },
      Unknown: {
        good: 42,
        bad: 12,
      },
      Varieties: {
        good: 37,
        bad: 8,
      },
      Harvesting: {
        good: 8,
        bad: 3,
      },
      "Soil Management": {
        good: 25,
        bad: 2,
      },
      Marketing: {
        good: 6,
        bad: 3,
      },
      Storage: {
        good: 3,
        bad: 0,
      },
    },
    {
      year: 2024,
      month: "February",
      Varieties: {
        good: 76,
        bad: 7,
      },
      Unknown: {
        good: 60,
        bad: 18,
      },
      "Pests and Diseases": {
        good: 144,
        bad: 15,
      },
      Unclear: {
        good: 25,
        bad: 7,
      },
      "Not related to agriculture": {
        good: 94,
        bad: 11,
      },
      Marketing: {
        good: 62,
        bad: 6,
      },
      Fertilizers: {
        good: 69,
        bad: 15,
      },
      Sowing: {
        good: 47,
        bad: 8,
      },
      "Soil Management": {
        good: 70,
        bad: 8,
      },
      Harvesting: {
        good: 10,
        bad: 3,
      },
      Storage: {
        good: 6,
        bad: 1,
      },
    },
    {
      year: 2024,
      month: "March",
      "Pests and Diseases": {
        good: 201,
        bad: 48,
      },
      Unknown: {
        good: 48,
        bad: 20,
      },
      Marketing: {
        good: 50,
        bad: 10,
      },
      "Soil Management": {
        good: 103,
        bad: 11,
      },
      "Not related to agriculture": {
        good: 47,
        bad: 16,
      },
      Varieties: {
        good: 119,
        bad: 24,
      },
      Fertilizers: {
        good: 59,
        bad: 5,
      },
      Unclear: {
        good: 18,
        bad: 5,
      },
      Harvesting: {
        good: 11,
        bad: 6,
      },
      Sowing: {
        good: 62,
        bad: 14,
      },
      Storage: {
        good: 14,
        bad: 3,
      },
      "Climate Change": {
        good: 1,
        bad: 0,
      },
    },
    {
      year: 2024,
      month: "April",
      Varieties: {
        good: 60,
        bad: 11,
      },
      "Not related to agriculture": {
        good: 40,
        bad: 16,
      },
      Fertilizers: {
        good: 62,
        bad: 26,
      },
      "Soil Management": {
        good: 73,
        bad: 11,
      },
      "Pests and Diseases": {
        good: 165,
        bad: 55,
      },
      Unknown: {
        good: 25,
        bad: 19,
      },
      Marketing: {
        good: 22,
        bad: 4,
      },
      Sowing: {
        good: 35,
        bad: 20,
      },
      Unclear: {
        good: 11,
        bad: 6,
      },
      Harvesting: {
        good: 6,
        bad: 2,
      },
      Storage: {
        good: 4,
        bad: 2,
      },
    },
    {
      year: 2024,
      month: "May",
      "Soil Management": {
        good: 17,
        bad: 3,
      },
      "Pests and Diseases": {
        good: 38,
        bad: 7,
      },
      "Not related to agriculture": {
        good: 16,
        bad: 3,
      },
      Fertilizers: {
        good: 8,
        bad: 5,
      },
      Unknown: {
        good: 7,
        bad: 4,
      },
      Varieties: {
        good: 12,
        bad: 6,
      },
      Marketing: {
        good: 5,
        bad: 1,
      },
      Pruning: {
        good: 1,
        bad: 0,
      },
      Harvesting: {
        good: 2,
        bad: 2,
      },
      Unclear: {
        good: 2,
        bad: 1,
      },
      Sowing: {
        good: 2,
        bad: 2,
      },
    },
  ];

  const [barChart, setBarChart] = useState(false);
  const [intent, setIntent] = useState("Sowing");

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

    // svg
    //   .append("text")
    //   .attr("x", width / 2)
    //   .attr("y", margin.top / 2)
    //   .attr("text-anchor", "middle")
    //   .style("font-size", "24px")
    //   .text("Topic vs Feedback");

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
      .text((d) => d.data.counts.good + d.data.counts.bad);
  }, [data, intent]);

  return (
    <div className="chart-container flex">
      <div>
        <div className="chart-title">
          Topic vs Feedback
          <p>
            Compares positive and negative feedback for a specific topic over
            time.
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
            <b>Select Topic:</b>
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
            <option value="Sowing">Sowing</option>
            <option value="Harvesting">Harvesting</option>
            <option value="Marketing">Marketing</option>
            <option value="Not related to agriculture">
              Not related to agriculture
            </option>
            <option value="Varieties">Varieties</option>
            <option value="Fertilizers">Fertilizers</option>
            <option value="Soil Management">Soil Management</option>
            <option value="Pests and Diseases">Pests and Diseases</option>
            <option value="Pruning Techniques">Pruning Techniques</option>
            <option value="Storage">Storage</option>
          </select>
        </div>
      </span>
      <div ref={tooltipRef} className="tooltip-bar"></div>
    </div>
  );
};

export default TopicFeedbackStackedBarChart;
