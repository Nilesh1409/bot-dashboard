import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./lineChart.css";
import style from "./style.module.css";

const ChartComponent = ({ data }) => {
  const ref = useRef();
  const tooltipRef = useRef();
  const [startYear, setStartYear] = useState(1990);
  const [currentYear, setCurrentYear] = useState(1990);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoverYear, setHoverYear] = useState(0);

  const colorMap = {
    "Under-5": "#7087B0",
    "5-14 years": "#C15F43",
    "15-49 years": "#7a0177",
    "50-69 years": "#799A6B",
    "70+ years": "#C1824A",
  };

  useEffect(() => {
    const svg = d3.select(ref.current);
    const tooltip = d3.select(tooltipRef.current);
    svg.selectAll("*").remove(); // Clear svg content before adding new elements

    const width = 800;
    const height = 350;
    const margin = { top: 20, right: 120, bottom: 30, left: 40 };

    // Filtering data
    const filteredData = data.filter((d) => d.year >= startYear);

    // Stacking the data
    const stack = d3
      .stack()
      .keys([
        "Under-5",
        "5-14 years",
        "15-49 years",
        "50-69 years",
        "70+ years",
      ]);
    const stackedData = stack(filteredData);

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(filteredData, (d) => d.year))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    // Axes
    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(xScale)
            .ticks(filteredData.length)
            .tickFormat(d3.format("d"))
        );

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // Area generator
    const area = d3
      .area()
      .x((d) => xScale(d.data.year))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]))
      .curve(d3.curveMonotoneX);

    // Adding the areas
    svg
      .append("g")
      .selectAll("path")
      .data(stackedData)
      .join("path")
      .attr("fill", ({ key }) => {
        // const colorMap = {
        //   "Under-5": "#fde0dd",
        //   "5-14 years": "#fa9fb5",
        //   "15-49 years": "#c51b8a",
        //   "50-69 years": "#7a0177",
        //   "70+ years": "#49006a",
        // };
        return colorMap[key];
      })
      .attr("d", area)
      // .on("mouseover", (event, d) => {
      //     tooltip.style("display", "block")
      //            .html(() => {
      //              const data = d.data;
      //              return `<strong>Year: ${data.year}</strong><br>` +
      //                     Object.keys(data)
      //                           .filter(key => key !== 'year')
      //                           .map(key => `${key}: ${data[key].toFixed(2)}%`)
      //                           .join('<br>');
      //            });
      //   })
      .on("mouseover", (event, d) => {
        d3.selectAll("path").style("opacity", 0.5); // Dim all paths
        d3.select(event.currentTarget).style("opacity", 1); // Highlight current path
        tooltip.style("display", "block").html(() => {
          let hover = hoverYear - 1990 >= 0 ? hoverYear - 1990 : 0;
          console.log("🚀 ~ tooltip.style ~ hover:", hover, hoverYear);
          const data = d;
          console.log("🚀 ~ tooltip.style ~ data:", data);
          let mouseX = d3.pointer(event, this)[0]; // d3.pointer gives you a tuple [x, y], [0] is the x position within the context element
          let hoveredYear = xScale.invert(mouseX);

          // setInterval(() => {
          //   mouseX = d3.pointer(event, this)[0]; // d3.pointer gives you a tuple [x, y], [0] is the x position within the context element
          //   hoveredYear = xScale.invert(mouseX);
          //   console.log("interval", hoveredYear, mouseX);
          // }, 100);

          console.log("🚀 ~ tooltip.style ~ hoveredYear:", hoveredYear);

          return `<div>
          Year: ${hoveredYear}
          </div>`;
        });
      })
      .on("mousemove", (event, d) => {
        let mouseX = d3.pointer(event, this)[0]; // d3.pointer gives you a tuple [x, y], [0] is the x position within the context element
        let hoveredYear = xScale.invert(mouseX); // Converts the x pixel position back to the corresponding domain value
        console.log("🚀 ~ .on ~ hoveredYear:", hoveredYear);
        // setInterval(() => {
        //   mouseX = d3.pointer(event, this)[0]; // d3.pointer gives you a tuple [x, y], [0] is the x position within the context element
        //   hoveredYear = xScale.invert(mouseX);
        //   console.log("interval", hoveredYear, mouseX);
        // }, 100);
        tooltip
          .style("display", "block")
          .html(() => {
            let hover = hoverYear - 1990 >= 0 ? hoverYear - 1990 : 0;
            let mouseX = d3.pointer(event, this)[0]; // d3.pointer gives you a tuple [x, y], [0] is the x position within the context element
            let hoveredYear = xScale.invert(mouseX);
            const data =
              d?.[parseInt(hoveredYear) - startYear ?? startYear].data;
            const keys = Object.keys(data);
            console.log("🚀 ~ tooltip.style ~ data:", data, d);

            return `
<div style="
    background: white;
    padding: 10px;
    border-radius: 8px;
    
    color: black;
    font-family: 'Arial', sans-serif;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    text-align: left;
    line-height: 1.4;
    font-size: 14px;
    max-width: 220px;
    border: black;
">
    ${keys
      .map(
        (key) => `
    <div style="
        margin: 2px 0;
        display: flex;
        justify-content: space-between;
    ">
        <span style="margin-right:5px">${key.toUpperCase()}:</span>
        <strong>${data?.[key] ?? "Unavailable"}</strong>
    </div>
    `
      )
      .join("")}
</div>
`;
          })
          .style("display", "block")
          .style("left", event.pageX + 10 + "px") // Position tooltip with an offset from cursor
          .style("top", event.pageY + 10 + "px");
      })
      .on("mouseout", () => {
        d3.selectAll("path").style("opacity", 1); // Reset the opacity
        tooltip.style("display", "none");
      });
    // Append a legend element to your SVG

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 100}, 50)`); // Adjust this to fit your chart size

    Object.entries(colorMap).forEach(([key, value], index) => {
      //   console.log("🚀 ~ Object.entries ~ key, value:", key, value);
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
  }, [data, startYear]);

  const handlePlayTimeLapse = () => {
    console.log("function");
    setIsAnimating(true);
    let year = currentYear;

    const timer = setInterval(() => {
      if (year > 2019 || !isAnimating) {
        clearInterval(timer);
        setIsAnimating(false);
        return;
      }
      year++;
      setCurrentYear(year);
      console.log("year", year, currentYear);
    }, 1000); // Adjust the interval to control the speed of the animation
  };

  return (
    <>
      <svg ref={ref} className="line-chart" width={800} height={"90%"}></svg>
      <div
        ref={tooltipRef}
        className="tooltip"
        style={{
          position: "absolute",
          // padding: "10px",
          background: "white",
          color: "white",
          borderRadius: "5px",
          border: "1px solid red",
          display: "inline",
          pointerEvents: "none",
        }}
      ></div>
      {/* <button onClick={handlePlayTimeLapse} >Click</button> */}
      <div className="filter_range">
        <span> 1990</span>
        <span>
          <input
            type="range"
            min="1990"
            max="2003"
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
          />
        </span>
        <span>2003</span>
      </div>
      {/* <div> 1990 {startYear}</div> */}
    </>
  );
};

export default ChartComponent;
