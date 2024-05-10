import logo from "./logo.svg";
import "./App.css";
import PieChart from "./PieChart/PieChart";
import LineChart from "./LineChart/LineChart";
// import WordGraph from './WordGraph/WordGraph';
import BubbleGraph from "./WordGraph/WordGraph";
import SankeyChart from "./SankyChart/SankyChart";

function App() {
  const generateData = () => {
    let countCorrect = 0;
    let countIncorrect = 0;
    for (let i = 0; i < 20; i++) {
      Math.random() > 0.5 ? countCorrect++ : countIncorrect++;
    }
    return [
      { value: countCorrect, label: "Correct" },
      { value: countIncorrect, label: "Incorrect" },
    ];
  };

  const data = generateData();
  const chartData = [
    {
      year: 1990,
      "Under-5": 0.97,
      "5-14 years": 1.03,
      "15-49 years": 14.87,
      "50-69 years": 40.65,
      "70+ years": 42.48,
    },
    {
      year: 1991,
      "Under-5": 0.95,
      "5-14 years": 1.02,
      "15-49 years": 15.0,
      "50-69 years": 40.0,
      "70+ years": 43.03,
    },
    {
      year: 1992,
      "Under-5": 0.2,
      "5-14 years": 0.03,
      "15-49 years": 14.87,
      "50-69 years": 40.65,
      "70+ years": 40.48,
    },
    {
      year: 1993,
      "Under-5": 0.95,
      "5-14 years": 1.02,
      "15-49 years": 15.0,
      "50-69 years": 40.0,
      "70+ years": 40.03,
    },
    {
      year: 1994,
      "Under-5": 0.97,
      "5-14 years": 1.03,
      "15-49 years": 14.87,
      "50-69 years": 40.65,
      "70+ years": 30.48,
    },
    {
      year: 1995,
      "Under-5": 0.95,
      "5-14 years": 1.02,
      "15-49 years": 15.0,
      "50-69 years": 40.0,
      "70+ years": 40.03,
    },
    {
      year: 1996,
      "Under-5": 0.97,
      "5-14 years": 1.03,
      "15-49 years": 14.87,
      "50-69 years": 40.65,
      "70+ years": 40.48,
    },
    {
      year: 1997,
      "Under-5": 0.95,
      "5-14 years": 1.02,
      "15-49 years": 15.0,
      "50-69 years": 40.0,
      "70+ years": 40.03,
    },
    {
      year: 1998,
      "Under-5": 0.97,
      "5-14 years": 1.03,
      "15-49 years": 14.87,
      "50-69 years": 40.65,
      "70+ years": 42.48,
    },
    {
      year: 1999,
      "Under-5": 0.95,
      "5-14 years": 1.02,
      "15-49 years": 15.0,
      "50-69 years": 40.0,
      "70+ years": 43.03,
    },
    {
      year: 2000,
      "Under-5": 0.2,
      "5-14 years": 0.03,
      "15-49 years": 14.87,
      "50-69 years": 40.65,
      "70+ years": 40.48,
    },
    {
      year: 2001,
      "Under-5": 0.95,
      "5-14 years": 1.02,
      "15-49 years": 15.0,
      "50-69 years": 40.0,
      "70+ years": 40.03,
    },
    {
      year: 2002,
      "Under-5": 0.97,
      "5-14 years": 1.03,
      "15-49 years": 15,
      "50-69 years": 40,
      "70+ years": 40.03,
    },
    {
      year: 2002,
      "Under-5": 0.97,
      "5-14 years": 1.03,
      "15-49 years": 15,
      "50-69 years": 40,
      "70+ years": 40.03,
    },
    {
      year: 2003,
      "Under-5": 0.97,
      "5-14 years": 1.03,
      "15-49 years": 14.87,
      "50-69 years": 39,
      "70+ years": 40.038,
    },
    {
      year: 2004,
      "Under-5": 0.95,
      "5-14 years": 1.02,
      "15-49 years": 15.0,
      "50-69 years": 39.0,
      "70+ years": 40.03,
    },
  ];

  const wordData = {
    nodes: [
      {
        id: "Change_crop",
        value: 27,
        title: "Total interactions for Change_crop",
      },
      { id: "Exit", value: 3, title: "Total interactions for Exit" },
      {
        id: "Farming_related",
        value: 733,
        title: "Total interactions for Farming_related",
      },
      { id: "Greeting", value: 2, title: "Total interactions for Greeting" },
      {
        id: "Referring_back",
        value: 20,
        title: "Total interactions for Referring_back",
      },
      { id: "Unclear", value: 31, title: "Total interactions for Unclear" },
    ],
  };

  const sankyData = {
    nodes: [
      { name: "Change_crop" },
      { name: "No Feedback" },
      { name: "bad" },
      { name: "good" },
      { name: "Exit" },
      { name: "Farming_related" },
      { name: "Greeting" },
      { name: "Referring_back" },
      { name: "Unclear" },
    ],
    links: [
      { source: 0, target: 1, value: 22 },
      { source: 0, target: 2, value: 2 },
      { source: 0, target: 3, value: 3 },
      { source: 4, target: 1, value: 3 },
      // { source: 5, target: 1, value: 674 },
      { source: 5, target: 2, value: 15 },
      { source: 5, target: 3, value: 44 },
      { source: 6, target: 1, value: 2 },
      { source: 7, target: 1, value: 20 },
      { source: 8, target: 1, value: 31 },
    ],
  };

  return (
    <div className="App">
      {/* <div className="chart-container">
      <h1 className="chart-title">Response Context </h1>
      <div className="chart">
        <PieChart data={data} />
      </div>
    </div> */}
      <div className="chart-container">
        <h1 className="chart-title">Aggregate Promtp Response</h1>
        <div className="chart">
          <SankeyChart data={sankyData} />
        </div>
      </div>

      <div className="chart-container">
        <h1 className="chart-title">User Intent</h1>
        <div className="chart">
          <BubbleGraph data={wordData} />
        </div>
      </div>

      <div className="chart-container">
        <h1 className="chart-title">Response Claasification</h1>
        <div className="chart">
          <LineChart data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default App;
