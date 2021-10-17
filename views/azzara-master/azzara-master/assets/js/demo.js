"use strict";
// Cicle Chart
Circles.create({
  id: "task-complete",
  radius: 50,
  value: 80,
  maxValue: 100,
  width: 5,
  text: function (value) {
    return value + "%";
  },
  colors: ["#36a3f7", "#fff"],
  duration: 400,
  wrpClass: "circles-wrp",
  textClass: "circles-text",
  styleWrapper: true,
  styleText: true,
});

//Notify
// $.notify({
// 	icon: 'flaticon-alarm-1',
// 	title: 'Azzara',
// 	message: 'Premium Bootstrap 4 Admin Dashboard',
// },{
// 	type: 'info',
// 	placement: {
// 		from: "bottom",
// 		align: "right"
// 	},
// 	time: 1000,
// });

// JQVmap
$("#map-example").vectorMap({
  map: "world_en",
  backgroundColor: "transparent",
  borderColor: "#fff",
  borderWidth: 2,
  color: "#e4e4e4",
  enableZoom: true,
  hoverColor: "#35cd3a",
  hoverOpacity: null,
  normalizeFunction: "linear",
  scaleColors: ["#b6d6ff", "#005ace"],
  selectedColor: "#35cd3a",
  selectedRegions: ["ID", "RU", "US", "AU", "CN", "BR"],
  showTooltip: true,
  onRegionClick: function (element, code, region) {
    return false;
  },
  onResize: function (element, width, height) {
    console.log("Map Size: " + width + "x" + height);
  },
});

//Chart
// $.ajax({

//     url : 'http://voicebunny.comeze.com/index.php',
//     type : 'GET',
//     data : {
//         'numberOfWords' : 10
//     },
//     dataType:'json',
//     success : function(data) {
//         alert('Data: '+data);
//     },
//     error : function(request,error)
//     {
//         alert("Request: "+JSON.stringify(request));
//     }
// });

fetch("http://localhost:3000/api/sensor/")
  .then(function (response) {
    // The API call was successful!
    return response.json();
  })
  .then(function (data) {
    // This is the JSON from our response
    console.log("aaaa-data-----------------------------", data);

    var ctx = document.getElementById("statisticsChart").getContext("2d");

    var pointRadius = 5;
    var pointcolor = "green";

    for (var i of data.actionPoint) {
      if (i === 1) {
        pointRadius = 10;
        pointcolor = "red";
      }
    }
    console.log("pointRadius", pointRadius);

    var statisticsChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.DateTime,
        datasets: [
          {
            label: "Temperature",
            borderColor: "",
            pointBackgroundColor: pointcolor,
            pointRadius: pointRadius,
            backgroundColor: "rgba(243, 84, 93, 0.1)",
            legendColor: "#f3545d",
            fill: true,
            borderWidth: 2,
            data: data.value,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: true,
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10,
        },
        layout: {
          padding: { left: 15, right: 15, top: 15, bottom: 15 },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(0,0,0,0.5)",
                fontStyle: "500",
                beginAtZero: false,
                maxTicksLimit: 5,
                padding: 20,
              },
              gridLines: {
                drawTicks: false,
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "rgba(0,0,0,0.5)",
                fontStyle: "500",
              },
            },
          ],
        },
        legendCallback: function (chart) {
          var text = [];
          text.push('<ul class="' + chart.id + '-legend html-legend">');
          for (var i = 0; i < chart.data.datasets.length; i++) {
            text.push(
              '<li><span style="background-color:' +
                chart.data.datasets[i].legendColor +
                '"></span>'
            );
            if (chart.data.datasets[i].label) {
              text.push(chart.data.datasets[i].label);
            }
            text.push("</li>");
          }
          text.push("</ul>");
          return text.join("");
        },
      },
    });
    return data;
  })
  .catch(function (err) {
    // There was an error
    console.warn("Something went wrong.", err);
  });

var myLegendContainer = document.getElementById("myChartLegend");

// generate HTML legend
myLegendContainer.innerHTML = statisticsChart.generateLegend();

// bind onClick event to all LI-tags of the legend
var legendItems = myLegendContainer.getElementsByTagName("li");
for (var i = 0; i < legendItems.length; i += 1) {
  legendItems[i].addEventListener("click", legendClickCallback, false);
}

var dailySalesChart = document
  .getElementById("dailySalesChart")
  .getContext("2d");

var myDailySalesChart = new Chart(dailySalesChart, {
  type: "bar",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
    ],
    datasets: [
      {
        label: "Sales Analytics",
        fill: !0,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderColor: "#fff",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        pointBorderColor: "#fff",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 5,
        data: [65, 59, 80, 81, 56, 55, 40, 35, 30],
      },
    ],
  },
  options: {
    maintainAspectRatio: !1,
    legend: {
      display: !1,
    },
    animation: {
      easing: "easeInOutBack",
    },
    scales: {
      yAxes: [
        {
          display: !1,
          ticks: {
            fontColor: "rgba(0,0,0,0.5)",
            fontStyle: "bold",
            beginAtZero: !0,
            maxTicksLimit: 10,
            padding: 0,
          },
          gridLines: {
            drawTicks: !1,
            display: !1,
          },
        },
      ],
      xAxes: [
        {
          display: !1,
          gridLines: {
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: -20,
            fontColor: "rgba(255,255,255,0.2)",
            fontStyle: "bold",
          },
        },
      ],
    },
  },
});

$("#activeUsersChart").sparkline(
  [112, 109, 120, 107, 110, 85, 87, 90, 102, 109, 120, 99, 110, 85, 87, 94],
  {
    type: "bar",
    height: "100",
    barWidth: 9,
    barSpacing: 10,
    barColor: "rgba(255,255,255,.3)",
  }
);

var topProductsChart = document
  .getElementById("topProductsChart")
  .getContext("2d");

var myTopProductsChart = new Chart(topProductsChart, {
  type: "line",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "January",
      "February",
      "March",
      "April",
    ],
    datasets: [
      {
        label: "Sales Analytics",
        fill: !0,
        backgroundColor: "rgba(53, 205, 58, 0.2)",
        borderColor: "#35cd3a",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        pointBorderColor: "#35cd3a",
        pointBackgroundColor: "#35cd3a",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#35cd3a",
        pointHoverBorderColor: "#35cd3a",
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 5,
        data: [
          20, 10, 18, 15, 32, 18, 15, 22, 8, 6, 12, 13, 10, 18, 14, 24, 16, 12,
          19, 21, 16, 14, 24, 21, 13, 15, 27, 29, 21, 11, 14, 19, 21, 17,
        ],
      },
    ],
  },
  options: {
    maintainAspectRatio: !1,
    legend: {
      display: !1,
    },
    animation: {
      easing: "easeInOutBack",
    },
    scales: {
      yAxes: [
        {
          display: !1,
          ticks: {
            fontColor: "rgba(0,0,0,0.5)",
            fontStyle: "bold",
            beginAtZero: !0,
            maxTicksLimit: 10,
            padding: 0,
          },
          gridLines: {
            drawTicks: !1,
            display: !1,
          },
        },
      ],
      xAxes: [
        {
          display: !1,
          gridLines: {
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: -20,
            fontColor: "rgba(255,255,255,0.2)",
            fontStyle: "bold",
          },
        },
      ],
    },
  },
});
