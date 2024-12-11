import React, { useEffect } from 'react'
import { Flowbite } from 'flowbite-react'
import ApexCharts from 'apexcharts'

export const LineChart = () => {
  useEffect(() => {
    const options = {
      chart: {
        height: 400, // Perbesar tinggi chart
        width: '100%', // Sesuaikan lebar chart
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0
        },
      },
      series: [
        {
          name: "New users",
          data: [6500, 6418, 6456, 6526, 6356, 6456, 6600, 6700, 6800, 6900, 7000, 7100],
          color: "#1A56DB",
        },
      ],
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        labels: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
      },
      yaxis: {
        show: true,
      },
    }
    
    if (document.getElementById("area-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("area-chart"), options);
      chart.render();
    }
  }, [])

  return (
    <Flowbite>
      <div className="max-w-3xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6"> {/* Perbesar kontainer chart */}
        <div className="flex justify-between">
          <div>
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">New Users</h5>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Last 12 months</p>
          </div>
        </div>
        <div id="area-chart" className="mt-4"></div>
      </div>
    </Flowbite>
  )
}

export default LineChart