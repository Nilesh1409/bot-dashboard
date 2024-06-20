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

    let data_ready = pie(
      Object.entries(data).map(([key, value]) => ({ key, value }))
    );

    // data_ready = data_ready.sort((a, b) => {
    //   if (a.data.key === "Very Confusing") return -1;
    //   if (b.data.key === "Very Confusing") return 1;
    //   return 0;
    // });

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
      // .style("opacity", 0.8)
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
          `#label-${d.data.key.replace(/\s+/g, "").split(" ").join("-")}-${
            d.index
          }`
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
          `#label-${d.data.key.replace(/\s+/g, "").split(" ").join("-")}-${
            d.index
          }`
        )
          .style("font-size", "12px")
          .style("font-weight", "500");
      });

    // Adding Legend
    const legendHeight = data_ready.length * 30;
    const legendContainer = d3
      .select(ref.current)
      .append("foreignObject")
      .attr("width", 200)
      .attr("height", height)
      .attr("x", width - 200)
      .attr("y", (height - legendHeight) / 2)
      .append("xhtml:div")
      .style("height", `${height}px`)
      .style("overflow-y", "scroll");

    const legendG = legendContainer
      .append("div")
      .selectAll(".legend")
      .data(data_ready)
      .enter()
      .append("div")
      .attr(
        "class",
        (d) =>
          `legend legend-${d.data.key.replace(/\s+/g, "").split(" ").join("-")}`
      )
      .style("display", "flex")
      .style("align-items", "center")
      .style("margin", "5px 0");

    legendG
      .append("div")
      .style("width", "18px")
      .style("height", "18px")
      .style(
        "background-color",
        (d) => colorSchema?.[d.data.key] ?? color(d.data.key)
      )
      .style("margin-right", "10px");

    legendG
      .append("div")
      .text((d) => d.data.key)
      .style("font-size", "12px")
      .style("font-weight", "500")
      .attr(
        "id",
        (d) =>
          `label-${d.data.key.replace(/\s+/g, "").split(" ").join("-")}-${
            d.index
          }`
      );
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default InteractivePieChart;
