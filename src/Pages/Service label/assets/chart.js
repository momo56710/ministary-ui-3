import React from 'react';
import ReactApexChart from "react-apexcharts";
function chart() {
  return (
    <ReactApexChart
      type="bar"
      height={500}
      series={[
        {
          name: "projet innovent",
          data: [30, 39, 45, 56, 61, 67, 71, 78, 80],
        },
        {
          name: "startups",
          data: [20, 28, 36, 39, 44, 50, 53, 59, 64],
        },
        {
          name: "incubateur",
          data: [15, 19, 25, 29, 36, 39, 43, 49, 53],
        },
      ]}
      options={{
        grid: {
          show: false,
        },
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "10px",
          },
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
        },
        yaxis: {
          title: {
            text: "amount",
          },
        },
        fill: {
          opacity: 1,
        },
      }}
    />
  );
}

export default chart;
