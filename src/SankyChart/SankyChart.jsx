import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLeft, sankeyLinkHorizontal } from "d3-sankey";
import { uniqueId } from "lodash-es";
import data from "./data.json";
import "./style.css";

const SankeyDiagram = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const valueFormat = d3.format(",.0f");
    const format = (d) => `${valueFormat(d)} TWh`;
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const color = (name) => colorScale(name.replace(/ .*/, ""));

    const width = 975;
    const height = 600;
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "auto");

    const sankeyLayout = sankey()
      .nodeAlign(sankeyLeft)
      .nodeWidth(10)
      .nodePadding(10)
      .extent([
        [1, 5],
        [width - 1, height - 5],
      ]);

    const { nodes, links } = sankeyLayout({
      nodes: data.nodes.map((d) => ({ ...d })),
      links: data.links.map((d) => ({ ...d })),
    });

    const node = svg
      .append("g")
      .selectAll("rect")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("fill", (d) => color(d.name))
      .on("mouseover", (event, d) => {
        svg.selectAll(".link").transition().duration(400).style("opacity", 0.1);
        svg
          .selectAll(".link")
          .filter((s) => d.name === s.source.name || d.name === s.target.name)
          .transition()
          .duration(400)
          .style("opacity", 1);
      })
      .on("mouseout", () => {
        svg.selectAll(".link").transition().duration(400).style("opacity", 1);
      })
      .append("title")
      .text((d) => `${d.name}\n${format(d.value)}`);

    const link = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .style("mix-blend-mode", "multiply")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", (d) => {
        d.uid = uniqueId("gradient-");
        return `url(#${d.uid})`;
      })
      .attr("stroke-width", (d) => Math.max(1, d.width))
      .append("title")
      .text((d) => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);

    svg
      .append("defs")
      .selectAll("linearGradient")
      .data(links, (d) => d.uid)
      .enter()
      .append("linearGradient")
      .attr("id", (d) => d.uid)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", (d) => d.source.x1)
      .attr("x2", (d) => d.target.x0)
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", (d) => color(d.source.name))
      .enter()
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", (d) => color(d.target.name));

    svg
      .append("g")
      .attr("font", "10px sans-serif")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("x", (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", (d) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d.x0 < width / 2 ? "start" : "end"))
      .text((d) => d.name);
  }, []);

  return <svg ref={svgRef} />;
};

export default SankeyDiagram;
