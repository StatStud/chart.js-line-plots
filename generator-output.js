const data_count = 1000; //data file as about 1,000 records (tops)

function generateIncrementingArray(length) {
  const result = [];

  for (let i = 1; i <= length; i++) {
    result.push(i);
  }

  return result;
}

const ctx = document.getElementById("myChart").getContext("2d");

const chartData = {
  labels: generateIncrementingArray(data_count),
  datasets: [
    {
      label: "Real Value",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(75, 192, 192, 1)",
      fill: false
    },
    {
      label: "Simulated Value",
      data: [],
      borderWidth: 1,
      borderColor: "rgba(192, 75, 192, 1)",
      fill: false
    }
  ]
};

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
    y_value: [],
    ym_value: []
  };

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(",");
    data.y_value.push(parseFloat(currentLine[10])); //THIS IS WHERE we choose which column to display
    data.ym_value.push(parseFloat(currentLine[11]));
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
  const dataLength = parsedData.y_value.length;
  let dataIndex = 0;

  const interval = setInterval(() => {
    if (dataIndex >= dataLength) {
      clearInterval(interval);
      return;
    }

    const yValue = parsedData.y_value[dataIndex];
    const ymValue = parsedData.ym_value[dataIndex];

    chartData.datasets[0].data.push(yValue);
    chartData.datasets[1].data.push(ymValue);
    chart.update();
    updateLiveReadings(yValue, ymValue);
    dataIndex++;
  }, timeDelay);
}

function updateLiveReadings(yValue, ymValue) {
    const yValueContainer = document.getElementById("realValueContainer");
    const ymValueContainer = document.getElementById("simulatedValueContainer");
    
    // yValueContainer.textContent = "Real Value: " + yValue;
    // ymValueContainer.textContent = "Simulated Value: " + ymValue;
    yValueContainer.innerHTML = `<strong>Real Value:</strong> ${yValue}`;
    ymValueContainer.innerHTML = `<strong>Simulated Value:</strong> ${ymValue}`;
}


const csvFile = "data.csv"; // Replace with the actual path to your CSV file

loadCSV(csvFile, function(csvData) {
  streamData(csvData, 10); // Call streamData function with a time delay of 0.1 second
});

document.getElementById("resetZoom").addEventListener("click", function() {
  chart.resetZoom();
});

document.getElementById("returnButton").addEventListener("click", function() {
  window.location.href = "home.html";
});

