import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLeft, sankeyLinkHorizontal } from "d3-sankey";
import { uniqueId } from "lodash-es";
import data from "./data.json";
import "./style.css";

const SankeyDiagram = ({ data }) => {
  const svgRef = useRef(null);
  function getCount(intent, feedback) {
    const data = [
      {
        intent: "Change_crop",
        feedback: "No Feedback",
        count: 22,
      },
      {
        intent: "Change_crop",
        feedback: "bad",
        count: 2,
      },
      {
        intent: "Change_crop",
        feedback: "good",
        count: 3,
      },
      {
        intent: "Exit",
        feedback: "No Feedback",
        count: 3,
      },
      {
        intent: "Farming_related",
        feedback: "No Feedback",
        count: 674,
      },
      {
        intent: "Farming_related",
        feedback: "bad",
        count: 15,
      },
      {
        intent: "Farming_related",
        feedback: "good",
        count: 44,
      },
      {
        intent: "Greeting",
        feedback: "No Feedback",
        count: 2,
      },
      {
        intent: "Referring_back",
        feedback: "No Feedback",
        count: 20,
      },
      {
        intent: "Unclear",
        feedback: "No Feedback",
        count: 31,
      },
    ];

    // Function to get the count based on intent and feedback

    for (const item of data) {
      if (item.intent === intent && item.feedback === feedback) {
        return item.count;
      }
    }
    return 0;
  }

  function calculateStrokeWidth(intent, feedback) {
    const count = getCount(intent, feedback);
    // Adjust the multiplier as needed to scale the stroke width appropriately
    return Math.max(0, count * 1);
  }

  useEffect(() => {
    const valueFormat = d3.format(",.0f");
    const format = (d) => `${valueFormat(d)}`;
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const color = (name) => colorScale(name.replace(/ .*/, ""));

    const width = 975;
    const height = 600;
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "90%");

    const sankeyLayout = sankey()
      .nodeAlign(sankeyLeft)
      .nodeWidth(10)
      .nodePadding(10)
      .extent([
        [1, 5],
        [width - 1, height - 5],
      ]);
    console.log("test", data);

    const { nodes, links } = sankeyLayout({
      nodes: data.nodes.map((d) => ({ ...d })),
      links: data.links.map((d) => ({ ...d })),
    });

    const getConnectedNodes = (node, direction) => {
      const connectedNodes = new Set();
      const stack = [node];

      while (stack.length) {
        const currentNode = stack.pop();
        connectedNodes.add(currentNode);

        const connectedLinks = links.filter((link) => {
          return direction === "source"
            ? link.source.name === currentNode.name
            : link.target.name === currentNode.name;
        });

        connectedLinks.forEach((link) => {
          const nextNode = direction === "source" ? link.target : link.source;
          if (!connectedNodes.has(nextNode)) {
            stack.push(nextNode);
          }
        });
      }

      return connectedNodes;
    };

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
        console.log("🚀 ~ .on ~ d:", d);
        const sourceNodes = getConnectedNodes(d, "source");
        const targetNodes = getConnectedNodes(d, "target");

        svg
          .selectAll(".link")
          .transition()
          .duration(400)
          .style("opacity", 0.1)
          .attr("stroke-width", (d) => Math.max(1, d.width));
        let stroke = 0;
        svg
          .selectAll(".link")
          .filter((link) => {
            console.log("link", link);
            stroke = calculateStrokeWidth(link.source.name, d.name);

            console.log(
              "stroke",
              stroke,
              link.source.name,
              d.name,
              getCount(link.source.name, d.name)
            );
            return sourceNodes.has(link.source) || targetNodes.has(link.target);
          })
          .transition()
          .duration(400)
          .style("opacity", 1)
          .attr("stroke-width", (link) => {
            // console.log("width", link);
            // if (link.target.name == d.name || link.source.name == d.name)
            return link.width;
            // return calculateStrokeWidth(link.source.name, d.name) / 3;
          });

        node
          .transition()
          .duration(400)
          .style("opacity", (n) =>
            sourceNodes.has(n) || targetNodes.has(n) ? 1 : 0.1
          );
      })
      .on("mouseout", () => {
        svg
          .selectAll(".link")
          .transition()
          .duration(400)
          .style("opacity", 1)
          .attr("stroke-width", (d) => Math.max(1, d.width));

        node
          .transition()
          .duration(400)
          .style("opacity", 1)
          .attr("stroke-width", (d) => Math.max(1, d.width));
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

  return (
    <>
      <div className="column-name">
        <span>Prompt</span>
        <span>Response Classification</span>
        <span>Feedback</span>
      </div>
      <svg ref={svgRef} />
    </>
  );
};

export default SankeyDiagram;
