import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BubbleGraph = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 700;
    const height = 600;
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const forceStrength = -30;
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "charge",
        d3.forceManyBody().strength((d) => forceStrength * (d.value / 1000))
      )
      .force("center", d3.forceCenter(width / 2, height / 1.5))
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.value / 15)
      )
      .force("y", d3.forceY(height / 10).strength(0.05))
      .force("x", d3.forceX(width / 10).strength(0.05));

    const node = svg
      .append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(drag(simulation));

    const circles = node
      .append("circle")
      .attr("r", (d) => d.value / 20)
      .attr("fill", "#e06767");

    const labels = node
      .append("text")
      .text((d) => d.id)
      .attr("text-anchor", "middle") // Center the text horizontally
      .attr("dy", ".35em") // Center the text vertically
      .attr("font-size", (d) => Math.max(10, d.value / 50)) // Adjust font size based on bubble size
      .attr("fill", "black"); // Text color

    simulation.on("tick", () => {
      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }, [data]);

  return <svg style={{ marginLeft: "150px" }} ref={ref}></svg>;
};

export default BubbleGraph;
