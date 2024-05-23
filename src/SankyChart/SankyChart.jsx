import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLeft, sankeyLinkHorizontal } from "d3-sankey";
import { uniqueId } from "lodash-es";
import data from "./data.json";
import "./style.css";

const SankeyDiagram = ({ data, feedback }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const valueFormat = d3.format(",.0f");
    const format = (d) => `${valueFormat(d)}`;
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const color = (name) => colorScale(name.replace(/ .*/, ""));

    const width = 1100;
    const height = 650;
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "90%");

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(0, 0, 0, 0.7)")
      .style("color", "white")
      .style("padding", "5px 10px")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px");

    const sankeyLayout = sankey()
      .nodeAlign(sankeyLeft)
      .nodeWidth(10)
      .nodePadding(10) // Adjust padding as needed
      .extent([
        [1, 5],
        [width - 1, height],
      ]);

    const { nodes, links } = sankeyLayout({
      nodes: data.nodes.map((d) => ({ ...d })),
      links: data.links.map((d) => ({ ...d })),
    });

    // Recalculate link positions based on the new node heights
    const targetTotals = {};
    links.forEach((link) => {
      if (!targetTotals[link.target.name]) {
        targetTotals[link.target.name] = 0;
      }
      targetTotals[link.target.name] += link.value;
    });

    const targetCategories = {
      "High Faithfulness": 1,
      "High Relevance": 1,
      Difficult: 1,
      "Medium Faithfulness": 2,
      "Medium Relevance": 2,
      "Fairly Difficult": 2,
      "Low Faithfulness": 3,
      "Low Relevance": 3,
      "Fairly Easy": 3,
      Standard: 3,
      "Very Confusing": 3,
      good: 3,
      bad: 3,
    };

    // Adjust the sy positions for links starting from the "Farming_related" node
    const farmingNode = nodes.find((node) => node.name === "Farming_related");

    // if (farmingNode) {
    //   farmingNode.sourceLinks.forEach((link) => {
    //     console.log("🚀 ~ farmingNode.sourceLinks.forEach ~ link:", link);
    //     link.sy = 0; // Set the sy position for each link to the top of the node
    //     link.ty = 0;
    //     link.y0 = 0;
    //     link.y1 = 0;
    //   });
    // }

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
        const sourceNodes = getConnectedNodes(d, "source");
        const targetNodes = getConnectedNodes(d, "target");

        svg
          .selectAll(".link")
          .transition()
          .duration(400)
          .style("opacity", 0.1)
          .attr("stroke-width", (d) => Math.max(1, 1));
        let stroke = 0;
        svg
          .selectAll(".link")
          .filter((link) => {
            return sourceNodes.has(link.source) || targetNodes.has(link.target);
          })
          .transition()
          .duration(400)
          .style("opacity", 1)
          .attr("stroke-width", (link) => link.width);

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
      .text((d) => `${d.name}\n${d.count ? d.count : format(d.value)}`);

    const link = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 1)
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .style("mix-blend-mode", "multiply")
      .attr("d", (d) => {
        if (d.source.name == "Farming_related") {
          // custom logic which start the link from the top of source node
          d.sy = 500; // Set the sy position for each link to the top of the node
          d.ty = 0;
          d.y0 = 100;
          console.log("🚀 ~ .attr ~ d1:", d);
        }
        return sankeyLinkHorizontal()(d);
      })
      .attr("stroke", (d) => {
        d.uid = uniqueId("gradient-");
        return `url(#${d.uid})`;
      })
      .attr("stroke-width", (d) => Math.max(1, d.width))
      .append("title")
      .text((d) => {
        const percentage = (
          (d.value / targetTotals[d.target.name]) *
          100
        ).toFixed(2);
        return `${d.source.name} → ${d.target.name}\n${format(
          d.value
        )} (${percentage}%)`;
      });

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

    sankeyLayout.update({ nodes, links });

    svg
      .selectAll("rect")
      .attr("y", (d) => d.y0)
      .attr("height", (d) => d.y1 - d.y0);

    svg
      .selectAll("path")
      .attr("d", (d) => {
        console.log("🚀 ~ .attr ~ d:", d);
        if (d.source.name == "farming_related") {
          return `M${-100} ${-100}L${-100} ${d.target.y0}`;
        }
        return sankeyLinkHorizontal()(d);
      })
      .attr("stroke-width", (d) => Math.max(1, d.width));
    // const farming = nodes.find((node) => node.name === "Farming_related");

    // if (farmingNode) {
    //   farmingNode.sourceLinks.forEach((link) => {
    //     console.log("🚀 ~ farmingNode.sourceLinks.forEach1 ~ link:", link);
    //     link.sy = 500; // Set the sy position for each link to the top of the node
    //     link.ty = 0;
    //     link.y0 = 100;
    //     // link.y1 = 200;
    //   });
    // }

    nodes.forEach((node) => {
      console.log("🚀 ~ nodes.forEach ~ node:", node);
      node.sourceLinks.sort(
        (a, b) =>
          targetCategories[a.target.name] - targetCategories[b.target.name]
      );
      node.targetLinks.sort((a, b) => a.index - b.index);

      let ty = node.y0;

      node.sourceLinks.forEach((link) => {
        // link.sy = -100; // Start all links from the top of the source node
        // link.y0 = -100;
        // link.y1 = -100;
      });

      node.targetLinks.forEach((link) => {
        link.ty = ty;
        ty += link.width;
      });
    });
  }, [data]);

  return (
    <>
      <div className="column-name">
        <span>Prompt</span>
        {!feedback && <span>Response Classification</span>}
        <span>Feedback</span>
      </div>
      <svg ref={svgRef} />
    </>
  );
};

export default SankeyDiagram;
