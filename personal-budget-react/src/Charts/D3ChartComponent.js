import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

function D3ChartComponent() {
  const chartRef = useRef();

  useEffect(() => {
    // Fetch data from the budget.json file
    axios.get('/budget.json')
      .then((response) => {
        const budgetData = response.data.mybudget.map(item => ({
          label: item.title,
          value: item.budget,
        }));
        drawChart(budgetData);
      });
  }, []);

  const drawChart = (data) => {
    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Remove any existing SVG
    d3.select(chartRef.current).selectAll('*').remove();

    // Create SVG element
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + 100)  // Increase width to allow room for movement
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${(width / 2) + 50}, ${height / 2})`);  // Shifted 50px right

    // Define the pie layout
    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    // Define the arc for slices
    const arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);  // Donut chart

    // Define the outer arc for the labels
    const outerArc = d3.arc()
      .innerRadius(radius * 0.85)  // Adjusted for closer labels
      .outerRadius(radius * 0.85);

    // Define color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Append pie slices
    svg.selectAll('path.slice')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('class', 'slice')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label));

    // Add polylines between slices and labels
    svg.selectAll('polyline')
      .data(pie(data))
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('points', d => {
        const posA = arc.centroid(d); // Slice center
        const posB = outerArc.centroid(d); // Point where the line ends
        const posC = outerArc.centroid(d); // Position for label
        posC[0] = radius * 1.05 * (midAngle(d) < Math.PI ? 1 : -1); // Adjust label position closer
        return [posA, posB, posC];
      });

    // Add text labels
    svg.selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', d => {
        const pos = outerArc.centroid(d);
        pos[0] = radius * 1.05 * (midAngle(d) < Math.PI ? 1 : -1); // Move labels even closer to the chart
        return `translate(${pos})`;
      })
      .attr('text-anchor', d => (midAngle(d) < Math.PI ? 'start' : 'end'))  // Align labels
      .attr('dy', '0.35em')
      .style('font-size', '12px')  // Ensure label size is visible
      .style('fill', 'black')      // Make sure label color is visible
      .text(d => d.data.label);

    // Function to compute the middle angle of a slice
    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
  };

  return (
    <div>
      <div ref={chartRef}></div>
    </div>
  );
}

export default D3ChartComponent;
