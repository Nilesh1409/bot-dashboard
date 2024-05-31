import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const InteractivePieChart = ({ data, colorSchema }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 500;
    const height = 350;
    const radius = Math.min(width, height) / 2 - 50;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2 - 100}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(Object.keys(data))
      .range(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.value);

    const data_ready = pie(
      Object.entries(data).map(([key, value]) => ({ key, value }))
    );

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcOver = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius + 10);

    const total = Object.values(data).reduce((acc, value) => acc + value, 0);

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "10px")
      .style("border-radius", "5px")
      .style("visibility", "hidden")
      .style("opacity", "0.9")
      .style("box-shadow", "0 0 10px rgba(0, 0, 0, 0.1)");

    const path = svg
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colorSchema?.[d.data.key] ?? color(d.data.key))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.8)
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", arcOver);

        const percentage = ((d.data.value / total) * 100).toFixed(2);

        tooltip
          .style("visibility", "visible")
          .html(
            `<strong>${d.data.key}</strong><br>Count: ${d.data.value} (${percentage}%)`
          )
          .style("top", `${event.pageY - 10}px`)
          .style("left", `${event.pageX + 10}px`);

        d3.select(
          `#label-${d.data.key.replace(/\s+/g, "").split(" ").join("-")}`
        )
          .style("font-size", "14px")
          .style("font-weight", "700");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", `${event.pageY - 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", arc);

        tooltip.style("visibility", "hidden");

        d3.select(
          `#label-${d.data.key.replace(/\s+/g, "").split(" ").join("-")}`
        )
          .style("font-size", "12px")
          .style("font-weight", "500");
      });

    // Adding Legend
    const legendG = svg
      .selectAll(".legend")
      .data(data_ready)
      .enter()
      .append("g")
      .attr(
        "transform",
        (d, i) =>
          `translate(${radius + 50}, ${i * 30 - data_ready.length * 15})`
      )
      .attr("class", "legend");

    legendG
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d) => colorSchema?.[d.data.key] ?? color(d.data.key));

    legendG
      .append("text")
      .text((d) => d.data.key)
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .style("text-anchor", "start")
      .attr(
        "id",
        (d) => `label-${d.data.key.replace(/\s+/g, "").split(" ").join("-")}`
      );
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default InteractivePieChart;
