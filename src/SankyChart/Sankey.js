// SankeyDiagram.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyJustify } from "d3-sankey";

const SankeyDiagram = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = {
      nodes: [
        { name: "Question 1" },
        { name: "Classification X" },
        { name: "Classification Y" },
      ],
      links: [
        { source: 0, target: 1, value: 1 },
        { source: 0, target: 2, value: 1 },
      ],
    };

    const width = 600;
    const height = 400;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const sankeyGenerator = sankey()
      .nodeAlign(sankeyJustify)
      .nodeWidth(20)
      .nodePadding(20)
      .extent([
        [1, 1],
        [width - 1, height - 6],
      ]);

    const { nodes, links } = sankeyGenerator(data);

    // Manually adjust node heights and positions
    nodes.forEach((node) => {
      node.y1 = node.y0 + 100; // Set node height to 100px
    });

    // Set the starting y-position of links from Question 1 to be the same
    links.forEach((link) => {
      link.sy = nodes[0].y0 + (nodes[0].y1 - nodes[0].y0) / 2;
    });

    svg
      .append("g")
      .selectAll("rect")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("fill", "#1f77b4")
      .attr("stroke", "#000");

    svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", (d) => d3.interpolateCool(d.value))
      .attr("stroke-width", (d) => Math.max(1, d.width));

    svg
      .append("g")
      .style("font", "10px sans-serif")
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

  return <svg ref={svgRef}></svg>;
};

export default SankeyDiagram;
