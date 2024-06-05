import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./lineChart.css";
import style from "./style.module.css";
import LineChartWithTimeSeries from "../LineChartGraph/LineChartWithTimeSeries";

const TopicChart = ({ data }) => {
  const ref = useRef();
  const tooltipRef = useRef();
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [areaGraph, setAreaGraph] = useState(true);

  const width = 1050;
  const height = 450;
  const focusStyle = {
    borderColor: "#3f51b5",
    boxShadow: "0 0 0 0.2rem rgba(63, 81, 181, 0.25)",
  };

  const blurStyle = {
    borderColor: "rgba(0, 0, 0, 0.23)",
    boxShadow: "none",
  };

  const [style, setStyle] = React.useState({});
  const months = [
    { value: 1, name: "November 2023" },
    { value: 2, name: "December 2023" },
    { value: 3, name: "January 2024" },
    { value: 4, name: "February 2024" },
    { value: 5, name: "March 2024" },
    { value: 6, name: "April 2024" },
    { value: 7, name: "May 2024" },
    { value: 8, name: "June 2024" },
  ];

  const colorMap = {
    Unclear: "#606060", // Dark gray for unclear
    "Not related to agriculture": "#B22222", // Firebrick for not related
    "Pests and Diseases": "#5B0000", // Darker red for pests and diseases
    Fertilizers: "#228B22", // Forest green for fertilizers
    "Soil Management": "#6B4226", // Dark brown for soil management
    Varieties: "#4169E1", // Royal blue for varieties
    Harvesting: "#B8860B", // Dark goldenrod for harvesting
    Marketing: "#D2691E", // Chocolate for marketing
    Sowing: "#006400", // Dark green for sowing
    Pruning: "#4B0082", // Indigo for pruning
    Storage: "#104E8B", // Dark dodger blue for storage
    "Climate Change": "#008B8B", // Dark cyan for climate change
  };

  const allMonth = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const filteredData = data.filter((d) => {
    const filterDate = months[selectedMonth - 1].name.split(" ");
    const filterYear = parseInt(filterDate[1]);
    const filterMonth = filterDate[0];

    const dataDate = new Date(d.year, allMonth[d.month] - 1);
    const startDate = new Date(filterYear, allMonth[filterMonth] - 1);

    return dataDate >= startDate;
  });

  useEffect(() => {
    if (!areaGraph) return;

    const svg = d3.select(ref.current);
    const tooltip = d3.select(tooltipRef.current);
    svg.selectAll("*").remove(); // Clear svg content before adding new elements

    const margin = { top: 20, right: 120, bottom: 30, left: 60 };

    const stack = d3
      .stack()
      .keys([
        "Unclear",
        "Not related to agriculture",
        "Pests and Diseases",
        "Fertilizers",
        "Soil Management",
        "Varieties",
        "Harvesting",
        "Marketing",
        "Sowing",
        "Pruning",
        "Storage",
        "Climate Change",
      ]);
    const stackedData = stack(filteredData);

    const xExtent = d3.extent(
      filteredData,
      (d) => new Date(d.year, allMonth[d.month] - 1)
    );
    const xDomain =
      xExtent[0].getTime() === xExtent[1].getTime()
        ? [
            new Date(xExtent[0].getFullYear(), xExtent[0].getMonth() - 1),
            new Date(xExtent[0].getFullYear(), xExtent[0].getMonth() + 1),
          ]
        : xExtent;

    const xScale = d3
      .scaleTime()
      .domain(xDomain)
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(stackedData, (d) => d3.max(d, (d) => d[1]))])
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(xScale)
            .ticks(d3.timeMonth.every(1))
            .tickFormat(d3.timeFormat("%m/%Y"))
        )
        .style("font-size", "14px");

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale))
        .style("font-size", "14px");

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    const area = d3
      .area()
      .x((d) => xScale(new Date(d.data.year, allMonth[d.data.month] - 1)))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]))
      .curve(d3.curveMonotoneX);

    svg
      .append("g")
      .selectAll("path")
      .data(stackedData)
      .join("path")
      .attr("fill", ({ key }) => colorMap[key])
      .attr("d", area)
      .on("mouseover", (event, d) => {
        d3.selectAll("path").style("opacity", 0.5);
        d3.select(event.currentTarget).style("opacity", 1);
        // tooltip.style("display", "block");
      })
      .on("mousemove", (event, d) => {
        const mouseX = d3.pointer(event, svg.node())[0];
        const hoveredDate = xScale.invert(mouseX);

        const hoveredYear = hoveredDate.getFullYear();
        const hoveredMonthIndex = hoveredDate.getMonth() + 1;
        const hoveredMonth = Object.keys(allMonth).find(
          (month) => allMonth[month] === hoveredMonthIndex
        );

        const hoveredData = filteredData.find(
          (data) => data.year === hoveredYear && data.month === hoveredMonth
        );

        const total = d3.sum(Object.values(hoveredData || {}).slice(2));
        const percentage = (value) => ((value / total) * 100).toFixed(2) + "%";

        tooltip
          .style("display", "block")
          .html(() => {
            let keys = Object.keys(hoveredData || {});
            keys = keys?.filter((key) => key !== "year" && key !== "month");
            console.log("🚀 ~ .html ~ keys:", keys);
            return `
              <div style="
              top: 0
              left: 0
              width: 100px
              height: 100px
                background: white;
                padding: 10px;
                border-radius: 8px;
                color: black;
                font-family: 'Arial', sans-serif;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                text-align: left;
                line-height: 1.4;
                font-size: 14px;
                max-width: 420px;
                border: black;
              ">
                <div><strong>${hoveredMonth} ${hoveredYear}</strong></div>
                ${keys
                  .map((key) => {
                    console.log(
                      "hover data",
                      <strong>
                        ${hoveredData?.[key] ?? "Unavailable"} ($
                        {percentage(hoveredData?.[key])})
                      </strong>
                    );
                    return `
                  <div style="
                      margin: 2px 0;
                      display: flex;
                      justify-content: space-between;
                  ">
                      <span style="margin-right:5px">${key?.toUpperCase()}:</span>
                      <strong>${
                        hoveredData?.[key] ?? "Unavailable"
                      } (${percentage(hoveredData?.[key])})</strong>
                  </div>
                `;
                  })
                  .join("")}
              </div>
            `;
          })
          .style("left", event.offsetX + 10 + "px")
          .style("top", event.offsetY + 10 + "px");
      })
      .on("mouseout", () => {
        d3.selectAll("path").style("opacity", 1);
        tooltip.style("display", "none");
      });

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 150}, 50)`);

    Object.entries(colorMap).forEach(([key, value], index) => {
      const legendItem = legend
        .append("g")
        .attr("transform", `translate(0, ${index * 20})`);

      legendItem
        .append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", value);

      legendItem
        .append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(key);
    });
  }, [data, selectedMonth, areaGraph]);

  return (
    <>
      <div style={{ display: "flex" }}>
        {areaGraph ? (
          <div>
            <svg
              ref={ref}
              className="line-chart"
              width={width}
              height={height}
            ></svg>
            <div
              ref={tooltipRef}
              className="tooltip"
              style={{
                position: "absolute",
                background: "white",
                color: "black",
                borderRadius: "5px",
                border: "1px solid black",
                display: "none",
                pointerEvents: "none",
                padding: "10px",
                fontFamily: "'Arial', sans-serif",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                textAlign: "left",
                lineHeight: "1.4",
                fontSize: "14px",
                maxWidth: "320px",
              }}
            ></div>
            <div className="filter_range">
              <div>
                <label>Month: </label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                />
                <span>
                  {months.find((month) => month.value === selectedMonth).name}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <LineChartWithTimeSeries data={data} />
        )}
        <div className="area-graph-toggle-input">
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
            onChange={(e) => setAreaGraph(!areaGraph)}
          >
            <option value="area">Area Graph</option>
            <option value="line">Line Graph</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default TopicChart;
