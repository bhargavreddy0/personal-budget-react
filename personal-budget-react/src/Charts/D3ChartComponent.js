// D3ChartComponent.js
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
    const svg = d3.select(chartRef.current)
      .attr('width', 300)
      .attr('height', 300)
      .append('g')
      .attr('transform', 'translate(150, 150)');

    const radius = 150;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(50).outerRadius(radius);

    const arcs = svg.selectAll('g')
      .data(pie(data))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label));

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.label);
  };

  return (
    <div >
      <svg ref={chartRef} ></svg>
    </div>
  );
}

export default D3ChartComponent;
