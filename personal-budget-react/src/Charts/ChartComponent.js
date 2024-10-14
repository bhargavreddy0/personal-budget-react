// ChartComponent.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartComponent() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#a83232', '#a88132', '#83a832', '#46a832', '#3246a8', '#d272e8',
        ],
      },
    ],
  });

  useEffect(() => {
    // Fetching data from the budget.json file
    axios.get('http://localhost:3000/budget')
      .then((response) => {
        const budgetData = response.data.mybudget;
        const labels = budgetData.map(item => item.title);
        const data = budgetData.map(item => item.budget);

        setChartData({
          labels,
          datasets: [{ data, backgroundColor: ['#a83232', '#a88132', '#83a832', '#46a832', '#3246a8', '#d272e8'] }],
        });
      });
  }, []);

  return (
    <div>
        <div style={{ width: '300px', height: '300px', marginLeft:'500px' }}>
            <Pie data={chartData} options={{ maintainAspectRatio: false }} />
        </div>

    </div>
  );
}

export default ChartComponent;
