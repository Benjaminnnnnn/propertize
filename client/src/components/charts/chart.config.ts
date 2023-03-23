import { ApexOptions } from "apexcharts";

export const TotalRevenueSeries = [
  {
    name: "Last Month",
    data: [183, 124, 115, 85, 143, 143, 96],
  },
  {
    name: "Running Month",
    data: [95, 84, 72, 44, 108, 108, 47],
  },
];

export const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  colors: ["#475BE8", "#CFC8FF"],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: "55%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    colors: ["transparent"],
    width: 4,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    labels: {
      style: {
        colors: new Array(7).fill("#808191"),
        fontFamily: "Manrope, Arial, sans-serif",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: ["#808191"],
        fontFamily: "Manrope, Arial, sans-serif",
      },
      align: "right",
      formatter: (val: number) => {
        return val + "k";
      },
    },
  },

  fill: {
    opacity: 1,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    markers: {
      radius: 12,
    },
    labels: {
      colors: ["#808191"],
    },
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `$ ${val},000`;
      },
    },
  },
};
