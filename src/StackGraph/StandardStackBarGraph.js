import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./StackedBarChart.css";

const StackedBarChart = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const data = [
    { year: 2023, month: "November", answered: 791, unanswered: 0 },
    { year: 2023, month: "December", answered: 300, unanswered: 0 },
    { year: 2024, month: "January", answered: 789, unanswered: 0 },
    { year: 2024, month: "February", answered: 1833, unanswered: 40 },
    { year: 2024, month: "March", answered: 3565, unanswered: 1 },
    { year: 2024, month: "April", answered: 2249, unanswered: 1 },
    { year: 2024, month: "May", answered: 1513, unanswered: 1 },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 1000;
    const height = 600;
    const margin = { top: 60, right: 150, bottom: 150, left: 200 };

    svg.selectAll("*").remove();

    svg.attr("width", "100%").attr("height", height);

    const processedData = data.map((d) => {
      const total = d.answered + d.unanswered;
      return {
        month: d.month,
        answered: d.answered / total,
        unanswered: d.unanswered / total,
        counts: { answered: d.answered, unanswered: d.unanswered },
      };
    });

    const x = d3
      .scaleBand()
      .domain(processedData.map((d) => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3
      .scaleOrdinal()
      .domain(["answered", "unanswered"])
      .range(["#32cd32", "#e41a1c"]);

    const stack = d3
      .stack()
      .keys(["answered", "unanswered"])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const series = stack(processedData);

    // Draw bars
    svg
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
      .attr("x", (d, i) => x(processedData[i].month))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .on("mouseover", (event, d) => {
        const [xPos, yPos] = d3.pointer(event);
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.data.month}</strong><hr/>
            Answered: <strong> ${d.data.counts.answered} (${(
              d.data.answered * 100
            ).toFixed(2)}%)</strong><br/>
            Unanswered:<strong> ${d.data.counts.unanswered} (${(
              d.data.unanswered * 100
            ).toFixed(2)}%) </strong>`
          )
          .style("left", `${xPos + margin.left}px`)
          .style("top", `${yPos - 28}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // Draw axes
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
      .call(d3.axisLeft(y).ticks(10, "%"))
      .selectAll("text")
      .style("font-size", "16px");

    // Draw legend
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - margin.right + 10}, ${margin.top})`
      )
      .attr("class", "legend-container");

    legend
      .selectAll(".legend-item")
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
          .attr("fill", color(d));

        d3.select(this)
          .append("text")
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", "0.35em")
          .text(d)
          .style("font-size", "14px")
          .style("font-family", "Arial, sans-serif");
      });
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} className="tooltip"></div>
    </div>
  );
};

export default StackedBarChart;
