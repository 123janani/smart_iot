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

// var client_t = mqtt.connect("broker.hivemq.com:1883", {   // replace the IP with your AWS instance public IP address
//        username: "admin",  // your broker username
//        password: "hivemq",   // your broker password
//      });

//        client_t.subscribe("mqtt/dht") //your mqtt topic
//        client_t.on("message", function (topic, payload) {
//             var output = document.getElementById("temp-value");
//         output.innerHTML = JSON.parse(payload);
//         alert(JSON.parse(payload))

//         })

// ------------------Start TEMPERATURE----------------------
var client_h = mqtt.connect("ws://18.191.187.178:9001", {
  // replace the IP with your AWS instance public IP address
  username: "iot", // your broker username
  password: "root", // your broker password
});

client_h.subscribe("mqtt/dht11_temperature"); //your mqtt topic
client_h.on("message", function (topic, payload) {
  var output = document.getElementById("temp-value");
  output.innerHTML = payload + " °C";

if (payload > 26) {
  document.getElementById("temp-alarm").style.visibility = "visible";
} else {
  document.getElementById("temp-alarm").style.visibility = "hidden";
}


  fetch("http://localhost:3000/api/sensor/temp/?sensorID=1&value=" + payload)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
// ------------------End TEMPERATURE----------------------

// ------------------Start Humidity----------------------
var client_h1 = mqtt.connect("ws://18.191.187.178:9001", {
  // replace the IP with your AWS instance public IP address
  username: "iot", // your broker username
  password: "root", // your broker password
});

client_h1.subscribe("mqtt/dht11_humidity"); //your mqtt topic
client_h1.on("message", function (topic, payload) {
  var output = document.getElementById("hu-value");
  output.innerHTML = payload + " %";
  fetch("http://localhost:3000/api/sensor/temp/?sensorID=2&value=" + payload)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
// ------------------End Humidity----------------------

// ------------------Start Soil Moisture----------------------
var client_h2 = mqtt.connect("ws://18.191.187.178:9001", {
  // replace the IP with your AWS instance public IP address
  username: "iot", // your broker username
  password: "root", // your broker password
});

client_h2.subscribe("mqtt/soil"); //your mqtt topic
client_h2.on("message", function (topic, payload) {
  var output = document.getElementById("soil-value");
  output.innerHTML = payload + " %";
  fetch("http://localhost:3000/api/sensor/temp/?sensorID=3&value=" + payload)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
// ------------------End Moisture----------------------

// ------------------Start Light----------------------
var client_h3 = mqtt.connect("ws://18.191.187.178:9001", {
  // replace the IP with your AWS instance public IP address
  username: "iot", // your broker username
  password: "root", // your broker password
});

client_h3.subscribe("mqtt/lux"); //your mqtt topic
client_h3.on("message", function (topic, payload) {
  var output = document.getElementById("light-value");
  output.innerHTML = payload + " %";
  fetch("http://localhost:3000/api/sensor/temp/?sensorID=4&value=" + payload)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
// ------------------End Light----------------------

var client_h1 = mqtt.connect("ws://18.191.187.178:9001", {
  // replace the IP with your AWS instance public IP address
  username: "iot", // your broker username
  password: "root", // your broker password
});
client_h1.subscribe("mqtt/dht/act"); //your mqtt topic
client_h1.on("message", function (topic, payload) {
  //alert(payload1);
  console.log("Act=" + payload);
});
// Chart 1------------------------
fetch("http://localhost:3000/api/sensor/temperature", {
  method: "GET",
})
  .then(function (response) {
    // The API call was successful!
    return response.json();
  })
  .then(function (data) {
    // This is the JSON from our response
    console.log("aaaa-data", data);
    var ctx = document.getElementById("statisticsChart").getContext("2d");

    // var pointRadius = 5;
    // var pointcolor = "green";
    var pointRadius_arr = [];
    var pointcolor_arr = [];
    var i = 0;
    for (i = 0; i < data.action.length; i++) {
      if (data.action[i] === 1) {
        pointRadius_arr[i] = 10;
        pointcolor_arr[i] = "red";
      } else {
        pointRadius_arr[i] = 5;
        pointcolor_arr[i] = "green";
      }
    }
    console.log(pointRadius_arr);
    console.log(pointcolor_arr);
    //var pointRadius=data;
    //var pointcolor=['green','green','green','green','red','green','green','green','red','green','green','red'];
    var statisticsChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.time,
        datasets: [
          {
            label: "Temperature",
            borderColor: "",
            pointBackgroundColor: pointcolor_arr,
            pointRadius: pointRadius_arr,
            backgroundColor: "rgba(243, 84, 93, 0.1)",
            legendColor: "#f3545d",
            fill: true,
            borderWidth: 2,
            //data: [154, 184, 175, 203, 210, 231, 240, 278, 252, 312, 320, 374]
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
// Chart 2------------------------------
fetch("http://localhost:3000/api/sensor/humidity", {
  method: "GET",
})
  .then(function (response) {
    // The API call was successful!
    return response.json();
  })
  .then(function (data) {
    // This is the JSON from our response
    console.log("aaaa-data", data);
    var ctx = document.getElementById("statisticsChart1").getContext("2d");

    // var pointRadius = 5;
    // var pointcolor = "green";
    var pointRadius_arr = [];
    var pointcolor_arr = [];
    var i = 0;
    for (i = 0; i < data.action.length; i++) {
      if (data.action[i] === 1) {
        pointRadius_arr[i] = 10;
        pointcolor_arr[i] = "red";
      } else {
        pointRadius_arr[i] = 5;
        pointcolor_arr[i] = "green";
      }
    }
    console.log(pointRadius_arr);
    console.log(pointcolor_arr);
    //var pointRadius=data;
    //var pointcolor=['green','green','green','green','red','green','green','green','red','green','green','red'];
    var statisticsChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.time,
        datasets: [
          {
            label: "Humidity",
            borderColor: "",
            pointBackgroundColor: pointcolor_arr,
            pointRadius: pointRadius_arr,
            backgroundColor: "rgba(243, 84, 93, 0.1)",
            legendColor: "#f3545d",
            fill: true,
            borderWidth: 2,
            //data: [154, 184, 175, 203, 210, 231, 240, 278, 252, 312, 320, 374]
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

// Chart 3------------------------------
fetch("http://localhost:3000/api/sensor/soil", {
  method: "GET",
})
  .then(function (response) {
    // The API call was successful!
    return response.json();
  })
  .then(function (data) {
    // This is the JSON from our response
    console.log("aaaa-data", data);
    var ctx = document.getElementById("statisticsChart2").getContext("2d");

    // var pointRadius = 5;
    // var pointcolor = "green";
    var pointRadius_arr = [];
    var pointcolor_arr = [];
    var i = 0;
    for (i = 0; i < data.action.length; i++) {
      if (data.action[i] === 1) {
        pointRadius_arr[i] = 10;
        pointcolor_arr[i] = "red";
      } else {
        pointRadius_arr[i] = 5;
        pointcolor_arr[i] = "green";
      }
    }
    console.log(pointRadius_arr);
    console.log(pointcolor_arr);
    //var pointRadius=data;
    //var pointcolor=['green','green','green','green','red','green','green','green','red','green','green','red'];
    var statisticsChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.time,
        datasets: [
          {
            label: "Soil Moisture",
            borderColor: "",
            pointBackgroundColor: pointcolor_arr,
            pointRadius: pointRadius_arr,
            backgroundColor: "rgba(243, 84, 93, 0.1)",
            legendColor: "#f3545d",
            fill: true,
            borderWidth: 2,
            //data: [154, 184, 175, 203, 210, 231, 240, 278, 252, 312, 320, 374]
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

// Chart 4------------------------------
fetch("http://localhost:3000/api/sensor/light", {
  method: "GET",
})
  .then(function (response) {
    // The API call was successful!
    return response.json();
  })
  .then(function (data) {
    // This is the JSON from our response
    console.log("aaaa-data", data);
    var ctx = document.getElementById("statisticsChart3").getContext("2d");

    // var pointRadius = 5;
    // var pointcolor = "green";
    var pointRadius_arr = [];
    var pointcolor_arr = [];
    var i = 0;
    for (i = 0; i < data.action.length; i++) {
      if (data.action[i] === 1) {
        pointRadius_arr[i] = 10;
        pointcolor_arr[i] = "red";
      } else {
        pointRadius_arr[i] = 5;
        pointcolor_arr[i] = "green";
      }
    }
    console.log(pointRadius_arr);
    console.log(pointcolor_arr);
    //var pointRadius=data;
    //var pointcolor=['green','green','green','green','red','green','green','green','red','green','green','red'];
    var statisticsChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.time,
        datasets: [
          {
            label: "Light",
            borderColor: "",
            pointBackgroundColor: pointcolor_arr,
            pointRadius: pointRadius_arr,
            backgroundColor: "rgba(243, 84, 93, 0.1)",
            legendColor: "#f3545d",
            fill: true,
            borderWidth: 2,
            //data: [154, 184, 175, 203, 210, 231, 240, 278, 252, 312, 320, 374]
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
//myLegendContainer.innerHTML = statisticsChart.generateLegend();

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
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP"],
    datasets: [
      {
        label: "Water",
        fontColor: "#35CD3A",
        fill: true,
        backgroundColor: "#177DFF",
        borderColor: "",
        borderCapStyle: "",
        borderDash: [],
        borderDashOffset: 0,
        pointBorderColor: "",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 5,
        data: [15, 9, 10, 11, 16, 5, 10, 12, 8],
      },
      {
        label: "Electricity",
        fill: true,
        backgroundColor: "#35CD3A",
        borderColor: "",
        borderCapStyle: "",
        borderDash: [],
        borderDashOffset: 0,
        pointBorderColor: "",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 5,
        data: [35, 49, 50, 21, 36, 25, 40, 35, 30],
      },
    ],
  },
  options: {
    legend: {
      display: true,
      labels: {
        fontColor: "black",
      },
    },
    maintainAspectRatio: true,
    legend: {
      display: true,
    },
    animation: {
      easing: "easeInOutBack",
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            fontColor: "rgba(0,0,0,0.5)",
            fontStyle: "bold",
            beginAtZero: !0,
            maxTicksLimit: 10,
            padding: 0,
          },
          gridLines: {
            drawTicks: false,
            display: false,
          },
        },
      ],
      xAxes: [
        {
          display: true,
          gridLines: {
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 0,
            fontColor: "rgba(255,255,255,0.2)",
            fontStyle: "",
          },
        },
      ],
    },
  },
});

var forecast = document.getElementById("forecast").getContext("2d");

var myforecast = new Chart(forecast, {
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
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Cost",
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
        data: [50, 58, 60, 32, 52, 35, 50, 47, 40, 50, 55, 45],

        pointBackgroundColor: [
          "blue",
          "blue",
          "blue",
          "blue",
          "blue",
          "blue",
          "blue",
          "blue",
          "blue",
          "red",
          "red",
          "red",
        ],
        pointRadius: [2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5],
      },
    ],
  },
  options: {
    maintainAspectRatio: true,
    legend: {
      display: true,
    },
    animation: {
      easing: "easeInOutBack",
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            fontColor: "rgba(0,0,0,0.5)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 12,
            padding: 0,
          },
          gridLines: {
            drawTicks: true,
            display: true,
          },
        },
      ],
      xAxes: [
        {
          display: true,
          gridLines: {
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 0,
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

// Highcharts.chart('container', {
//     chart: {
//         type: 'spline',
//         animation: Highcharts.svg, // don't animate in old IE
//         marginRight: 10,
//         events: {
//             load: function () {

//                 // set up the updating of the chart each second
//                 var series = this.series[0];
//                 setInterval(function () {
//                     var x = (new Date()).getTime(), // current time
//                         y = Math.random();
//                     series.addPoint([x, y], true, true);
//                 }, 5000);
//             }
//         }
//     },

//     time: {
//         useUTC: false
//     },

//     title: {
//         text: 'Live random data'
//     },

//     accessibility: {
//         announceNewData: {
//             enabled: true,
//             minAnnounceInterval: 15000,
//             announcementFormatter: function (allSeries, newSeries, newPoint) {
//                 if (newPoint) {
//                     return 'New point added. Value: ' + newPoint.y;
//                 }
//                 return false;
//             }
//         }
//     },

//     xAxis: {
//         type: 'datetime',
//         tickPixelInterval: 150
//     },

//     yAxis: {
//         title: {
//             text: 'Value'
//         },
//         plotLines: [{
//             value: 0,
//             width: 1,
//             color: '#808080'
//         }]
//     },

//     tooltip: {
//         headerFormat: '<b>{series.name}</b><br/>',
//         pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
//     },

//     legend: {
//         enabled: false
//     },

//     exporting: {
//         enabled: false
//     },

//     series: [{
//         name: 'Random data',
//         data: (function () {
//             // generate an array of random data
//             // var data = [],
//             //     time = (new Date()).getTime(),
//             //     i;

//             // for (i = -19; i <= 0; i += 1) {
//             //     data.push({
//             //         x: time + i * 1000,
//             //         y: Math.random()
//             //     });
//             // }
//             // console.log(data)
//             var aa=[
//     {
//         "x": 1634651158200,
//         "y": 2
//     },
//     {
//         "x": 1634651159200,
//         "y": 5
//     }]
//             return aa;
//         }())
//     }]
// });
