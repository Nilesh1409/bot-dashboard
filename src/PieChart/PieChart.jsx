import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function PieChart({ data }) {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); // Clear svg content before adding new elements

        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 3;

        const color = d3.scaleOrdinal(["#4daf4a", "#377eb8"]); // Green for correct, blue for incorrect

        const arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const pieGenerator = d3.pie()
            .value(d => d.value);

        const arcs = pieGenerator(data);

        const group = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        group.selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', (d, i) => color(i))
            .attr('stroke', 'white')
            .style('stroke-width', '2px')
            .each(function(d) { this._current = d; }); // store the initial angles

        group.selectAll('path')
        group.selectAll('path')
        .on('mouseover', function(event, d) {
            d3.select(this)
              .transition()
              .duration(500)
              .attr('d', arcGenerator.innerRadius(0).outerRadius(radius * 1.1));
        })
        // On mouseout, return the segment to its original size
        .on('mouseout', function(event, d) {
            d3.select(this)
              .transition()
              .duration(500)
              .attr('d', arcGenerator.innerRadius(0).outerRadius(radius));
        });
    

        // Tooltips
        const tooltip = d3.select('body').append('div')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background', 'white')
            .style('border', '1px solid #ccc')
            .style('border-radius', '5px')
            .style('padding', '10px')
            .text('Tooltip');

        group.selectAll('path')
            .on('mousemove', function(event, d) {
                tooltip
                  .style('visibility', 'visible')
                  .text(`${d.data.label}: ${d.data.value}`)
                  .style('top', (event.pageY - 10) + 'px')
                  .style('left', (event.pageX + 10) + 'px');
            })
            .on('mouseout', function() {
                tooltip.style('visibility', 'hidden');
            });

    }, [data]);

    return (
        <svg ref={ref}></svg>
    );
}

export default PieChart;
