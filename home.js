const data_count = 1000; //data file as about 1,000 records (tops)

function generateIncrementingArray(length) {
  const result = [];

  for (let i = 1; i <= length; i++) {
    result.push(i);
  }

  return result;
}

const chartData = {
  labels: generateIncrementingArray(data_count),
  datasets: [
    {
      label: "Real Value 1",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(75, 192, 192, 1)",
      fill: false
    },
    {
      label: "Simulated Value 1",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(192, 75, 192, 1)",
      fill: false
    },
    {
      label: "Real Value 2",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(255, 0, 0, 1)",
      fill: false
    },
    {
      label: "Simulated Value 2",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(0, 0, 255, 1)",
      fill: false
    },
    {
      label: "Real Value 3",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(128, 128, 128, 1)",
      fill: false
    },
    {
      label: "Simulated Value 3",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(255, 255, 0, 1)",
      fill: false
    },
    {
      label: "Real Value 4",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(128, 128, 128, 1)",
      fill: false
    },
    {
      label: "Simulated Value 4",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(255, 255, 0, 1)",
      fill: false
    },
    {
      label: "Real Value 5",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(128, 128, 128, 1)",
      fill: false
    },
    {
      label: "Simulated Value 5",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(255, 255, 0, 1)",
      fill: false
    }
  ]
};


const ctx = document.getElementById("myChart").getContext("2d");


const chartOptions = {
    scales: {
        x: {
          type: "linear",
          display: true,
          ticks: {
            min: 1,
            max: data_count
          }
        },
    y: {
      beginAtZero: true
    }
  },
  pan: {
    enabled: false,
    mode: "xy",
    rangeMax: {
      x: 4000
    },
    rangeMin: {
      x: 0
    }
  },
  zoom: {
    enabled: false,
    mode: "xy",
    rangeMax: {
      x: 20000
    },
    rangeMin: {
      x: 1000
    }
  }
};

const chart = new Chart(ctx, {
  type: "line",
  data: chartData,
  options: chartOptions
});

function parseCSV(csv) {
  const lines = csv.split("\n");
  const headers = lines[0].split(",");
  const data = {
    y_value1: [],
    ym_value1: [],
    y_value2: [],
    ym_value2: [],
    y_value3: [],
    ym_value3: [],
    y_value4: [],
    ym_value4: [],
    y_value5: [],
    ym_value5: []
  };

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(",");
    data.y_value1.push(parseFloat(currentLine[2]));
    data.ym_value1.push(parseFloat(currentLine[3]));
    data.y_value2.push(parseFloat(currentLine[4]));
    data.ym_value2.push(parseFloat(currentLine[4]));
    data.y_value3.push(parseFloat(currentLine[5]));
    data.ym_value3.push(parseFloat(currentLine[6]));
    data.y_value4.push(parseFloat(currentLine[7]));
    data.ym_value4.push(parseFloat(currentLine[8]));
    data.y_value5.push(parseFloat(currentLine[9]));
    data.ym_value5.push(parseFloat(currentLine[10]));
  }
  return data;
}


function loadCSV(file, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.open("GET", file, true);
  xhr.send();
}

function streamData(csvData, timeDelay) {
  const parsedData = parseCSV(csvData);
  const dataLength = parsedData.y_value1.length;
  let dataIndex = 0;

  const interval = setInterval(() => {
    if (dataIndex >= dataLength) {
      clearInterval(interval);
      return;
    }

    const yValue1 = parsedData.y_value1[dataIndex];
    const ymValue1 = parsedData.ym_value1[dataIndex];
    const yValue2 = parsedData.y_value2[dataIndex];
    const ymValue2 = parsedData.ym_value2[dataIndex];
    const yValue3 = parsedData.y_value3[dataIndex];
    const ymValue3 = parsedData.ym_value3[dataIndex];
    const yValue4 = parsedData.y_value4[dataIndex];
    const ymValue4 = parsedData.ym_value4[dataIndex];
    const yValue5 = parsedData.y_value5[dataIndex];
    const ymValue5 = parsedData.ym_value5[dataIndex];

    chartData.datasets[0].data.push(yValue1);
    chartData.datasets[1].data.push(ymValue1);
    chartData.datasets[2].data.push(yValue2);
    chartData.datasets[3].data.push(ymValue2);
    chartData.datasets[4].data.push(yValue3);
    chartData.datasets[5].data.push(ymValue3);
    chartData.datasets[6].data.push(yValue4);
    chartData.datasets[7].data.push(ymValue4);
    chartData.datasets[8].data.push(yValue5);
    chartData.datasets[9].data.push(ymValue5);

    chart.update();

    updateLiveReadings(yValue1, ymValue1, 1);
    updateLiveReadings(yValue2, ymValue2, 2);
    updateLiveReadings(yValue3, ymValue3, 3);
    updateLiveReadings(yValue4, ymValue4, 4);
    updateLiveReadings(yValue5, ymValue5, 5);

    dataIndex++;
  }, timeDelay);
}


function updateLiveReadings(yValue, ymValue, index) {

  if (index == 1) {
    const yValueContainer = document.getElementById("realValueContainer1");
    const ymValueContainer = document.getElementById("simulatedValueContainer1");
    yValueContainer.innerHTML = `<strong>Real Value:</strong> ${yValue}`;
    ymValueContainer.innerHTML = `<strong>Simulated Value:</strong> ${ymValue}`;
  } else if (index == 2){
    const yValueContainer = document.getElementById("realValueContainer2");
    const ymValueContainer = document.getElementById("simulatedValueContainer2");
    yValueContainer.innerHTML = `<strong>Real Value:</strong> ${yValue}`;
    ymValueContainer.innerHTML = `<strong>Simulated Value:</strong> ${ymValue}`;
  } else if (index == 3){
    const yValueContainer = document.getElementById("realValueContainer3");
    const ymValueContainer = document.getElementById("simulatedValueContainer3");
    yValueContainer.innerHTML = `<strong>Real Value:</strong> ${yValue}`;
    ymValueContainer.innerHTML = `<strong>Simulated Value:</strong> ${ymValue}`;
  } else if (index == 4){
    const yValueContainer = document.getElementById("realValueContainer4");
    const ymValueContainer = document.getElementById("simulatedValueContainer4");
    yValueContainer.innerHTML = `<strong>Real Value:</strong> ${yValue}`;
    ymValueContainer.innerHTML = `<strong>Simulated Value:</strong> ${ymValue}`;
  } else if (index == 5){
    const yValueContainer = document.getElementById("realValueContainer5");
    const ymValueContainer = document.getElementById("simulatedValueContainer5");
    yValueContainer.innerHTML = `<strong>Real Value:</strong> ${yValue}`;
    ymValueContainer.innerHTML = `<strong>Simulated Value:</strong> ${ymValue}`;
  }
}



const csvFile = "data.csv"; // Replace with the actual path to your CSV file

loadCSV(csvFile, function(csvData) {
  streamData(csvData, 100); // Call streamData function with a time delay of 0.1 second
});

