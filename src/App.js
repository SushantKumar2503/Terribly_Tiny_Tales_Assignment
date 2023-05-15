//import './App.css';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";

function App() {
  const [dataFetched, setDataFetched] = useState("");
  const [wordArr, setWordArr] = useState([]);
  const [freqArr, setFreqArr] = useState([]);
  const [csvFile, setCsvFile] = useState([]);
  const [isGraph, setIsGraph] = useState(false);

  const fileName = "chartData.csv";

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      setDataFetched(response.data);
    }
    getData();
  })

  const countWords = (wordArr) => {
    const frequency = {};
    for (let i = 0; i < wordArr.length; i++) {
      if (frequency[wordArr[i]]) {
        frequency[wordArr[i]]++;
      }
      else {
        frequency[wordArr[i]] = 1;
      }
    }
    const sortedArray = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => `${word}: ${count}`);
    return sortedArray;
  };

  const genrateChart = () => {
    let wordArr = dataFetched.match(/[a-zA-Z]+/g);
    const sortedFrequencyArray = countWords(wordArr);
    const csvData = [
      ["Words", "Frequency"]
    ];
    var w = [], f = [];
    for (let i = 0; i < 20; i++) {
      const tempArr = sortedFrequencyArray[i].split(':');
      w.push(tempArr[0]);
      f.push(parseInt(tempArr[1]));
      csvData.push([tempArr[0], tempArr[1]]);
    }
    setFreqArr(f);
    setWordArr(w);
    setIsGraph(true);
    setCsvFile(csvData);
  }

  var data = {
    series: [
      {
        name: "Word Frequency",
        data: freqArr,
      },
    ],
    options: {
      chart: {
        height: 300,
        type: 'bar',
        toolbar: {
          show: false
        },

      },
      title: {
        text: "Histogram of the 20 most occurring word",
        style: { color: "black", fontSize: 20 },
        position: "center",
      },

      subtitle: {
        text: "Frequency of occurrence of each word",
        style: { color: "white", fontSize: 12 },

      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      dataLabels: { enabled: false },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: "60%",
          strokeWidth: 1,
          borderRadiusApplication: "end",
          dataLabels: {
            position: 'top',
          },
        }
      },
      stroke: {
        width: 4,
        colors: "black",
      },
      fill: {
        colors: "green",
        opacity: 1
      },

      xaxis: {
        categories: wordArr,
        labels: {
          style: { colors: "black", fontSize: 13, },
        },
        title: {
          text: "Words",
          style: { color: "black", fontSize: 20 },
        },
      },

      yaxis: {
        max: 30,
        labels: {
          style: { colors: "black", fontSize: "15" },
        },
        title: {
          text: "Frequency of Words",
          style: { color: "black", fontSize: 15 },
        },
      }
    }
  }

  return (
    <>
      {
        isGraph === false ?
          (
            <div className='home'>
              <button style={{ backgroundColor: 'black', color: 'white', borderRadius: '50px', border: 'none', width: '150px', height: '40px', fontSize: '25px', marginTop: '10px', cursor: 'pointer' }} onClick={genrateChart}>Submit</button>
            </div>
          ) :
          (
            <div className='chart'>
              <button className="btn" style={{ abackgroundColor: 'black', color: 'white', borderRadius: '50px', border: 'none', width: '90px', height: '30px', fontSize: '20px', marginTop: '10px',marginLeft: '20px', cursor: 'pointer' }}>
                <CSVLink style={{ textDecoration: 'none', cursor: 'pointer' }} data={csvFile} filename={fileName} >Export</CSVLink>
              </button>

              <div style={{width:'80%', height:'70%', marginLeft:'120px'}}>
                <Chart
                  type="bar"
                  width="100%"
                  height={600}
                  series={data.series}
                  options={data.options} />
              </div>

            </div>
          )
      }
    </>
  );
}

export default App;
