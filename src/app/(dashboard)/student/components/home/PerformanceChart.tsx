import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartOptions } from 'chart.js';
import { Skeleton } from '@nextui-org/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceGraphProps{
  isLoaded: boolean
}

const PerformanceGraph: React.FC<PerformanceGraphProps> = ({isLoaded}) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Math',
        data: [88, 92, 80, 85, 90, 95, 100],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Science',
        data: [85, 87, 78, 82, 88, 90, 92],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'English',
        data: [90, 91, 85, 88, 92, 94, 96],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
      },
      {
        label: 'History',
        data: [78, 80, 75, 77, 79, 82, 85],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Art',
        data: [95, 97, 93, 96, 98, 99, 100],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Grades Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
   <div className='p-4 min-w-full'>
     <Skeleton isLoaded={isLoaded} className='rounded-lg' >
      <Line data={data} options={options} />
    </Skeleton>
   </div>
  );
};

export default PerformanceGraph;
