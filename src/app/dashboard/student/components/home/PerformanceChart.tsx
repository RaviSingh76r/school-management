// Importing controllers, elements, etc. which we'll use

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";

// Register them
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

import {Bar, Line, Scatter, Bubble} from "react-chartjs-2"

const options = {
  plugins: {
    legend: {
      display: false
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "#338EF7",
        fill: "start",
        backgroundColor: "bg-default-400"
      },
      point: {
        radius: 0,
        hitRadius: 0
      }
    },
    scales: {
      xAxis: {
        display: true,
      },
      yAxis: {
        display: true
      }
    }
  }
}

const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      data: [0.1, 0.4, 0.2, 0.3, 0.7,]
    }
  ]
}

const PerformanceChart = () => {
  return(
    <div>
      <Line data={data} width={100} height={40} options={options} />
    </div>
  )
}

export default PerformanceChart