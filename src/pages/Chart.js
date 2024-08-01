import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import chartData from '../../src/datas/chart.json';
import '../styles/Chart.css';

//필요한 요소 등록
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


const ChartComponent = () => {
  const data = {
    labels: chartData.data.label,
    datasets: [
      {
        data: chartData.data.series,
        backgroundColor: ['#FF6384', '#FF9F40', '#4BC0C0'], // 빨강, 주황, 녹색
        hoverBackgroundColor: ['#FF6384', '#FF9F40', '#4BC0C0'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}명`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };


  return (
    <div className="chart-container">
      <Doughnut data={data} options={options} className="chart" />
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#FF6384' }}></div>
          서울특별시
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#FF9F40' }}></div>
          경기도
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#4BC0C0' }}></div>
          부산광역시
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;