import "./App.css";
import PieChart from "./PieChart/PieChart";
import LineChart from "./LineChart/LineChart";
// import WordGraph from './WordGraph/WordGraph';
import BubbleGraph from "./WordGraph/WordGraph";
import SankeyChart from "./SankyChart/SankyChart";
import SankeyDiagram from "./SankyChart/Sankey";

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
        id: "Fertilizers",
        value: 502,
        title: "Total interactions for Fertilizers",
      },
      {
        id: "Flowering",
        value: 17,
        title: "Total interactions for Flowering",
      },
      {
        id: "Harvesting",
        value: 3354,
        title: "Total interactions for Harvesting",
      },
      {
        id: "Marketing",
        value: 79,
        title: "Total interactions for Marketing",
      },
      {
        id: "Not related to Coffee",
        value: 699,
        title: "Total interactions for Not_related_to_Coffee_farming",
      },
      {
        id: "Pests and Diseases",
        value: 1316,
        title: "Total interactions for Pests_and_Diseases",
      },
      {
        //  id: "Please_provide_the_query_you_would_like_to_have_classified",
        id: "Not available",

        value: 116,
        title:
          "Total interactions for Please_provide_the_query_you_would_like_to_have_classified",
      },
      {
        id: "Processing",
        value: 4,
        title: "Processing",
      },
      {
        id: "Pruning",
        value: 2,
        title: "Pruning",
      },
      {
        id: "Soil_Management",
        value: 720,
        title: "Total interactions for Soil_Management",
      },
      {
        id: "Sowing",
        value: 257,
        title: "Total interactions for Sowing",
      },
      {
        id: "Storage",
        value: 34,
        title: "Total interactions for Storage",
      },
      {
        id: "Varieties",
        value: 459,
        title: "Total interactions for Varieties",
      },
      // {
      //   id: "You_have_not_provided_a_query_Please_provide_a_specific_question_about_coffee_farming_for_classification",
      //   value: 2,
      //   title:
      //     "Total interactions for You_have_not_provided_a_query_Please_provide_a_specific_question_about_coffee_farming_for_classification",
      // },
    ],
  };

  const sankyData = {
    nodes: [
      // Intents
      { name: "Change_crop" }, // 0
      { name: "Exit" }, // 1
      { name: "Farming_related" }, // 2
      { name: "Greeting" }, // 3
      { name: "Referring_back" }, //4
      { name: "Unclear" }, //5

      // Faithfulness Classifications
      { name: "High Faithfulness" }, //6
      { name: "Low Faithfulness" }, //7
      { name: "Medium Faithfulness" }, //8
      { name: "" }, //9 Undetermined Faithfulness

      // Relevance Classifications
      { name: "High Relevance" }, //10
      { name: "Low Relevance" }, //11
      { name: "Medium Relevance" }, //12
      { name: "" }, //13 Undetermined Relevance

      // Feedback
      { name: "" }, //No Feedback
      { name: "bad" },
      { name: "good" },

      // Difficulty Levels
      { name: "Difficult" },
      { name: "Easy" },
      { name: "Fairly Difficult" },
      { name: "Fairly Easy" },
      { name: "Standard" },
      { name: "Very Confusing" },
      { name: "Very Easy" },
    ],
    links: [
      // Existing links from Intents to Faithfulness and Relevance, and from those to Feedback
      { source: 0, target: 6, value: 27 },
      { source: 1, target: 6, value: 3 },
      { source: 2, target: 6, value: 543 },
      { source: 2, target: 7, value: 33 },
      { source: 2, target: 8, value: 34 },
      // { source: 2, target: 9, value: 123 },
      { source: 3, target: 6, value: 1 },
      // { source: 3, target: 9, value: 1 },
      { source: 4, target: 6, value: 18 },
      { source: 4, target: 8, value: 1 },
      // { source: 4, target: 9, value: 1 },
      { source: 5, target: 6, value: 28 },
      // { source: 5, target: 9, value: 3 },
      // { source: 0, target: 13, value: 27 },
      // { source: 1, target: 13, value: 3 },
      { source: 2, target: 10, value: 393 },
      { source: 2, target: 11, value: 73 },
      { source: 2, target: 12, value: 91 },
      // { source: 2, target: 13, value: 176 },
      // { source: 3, target: 13, value: 2 },
      { source: 4, target: 10, value: 12 },
      { source: 4, target: 11, value: 2 },
      { source: 4, target: 12, value: 3 },
      // { source: 4, target: 13, value: 3 },
      { source: 5, target: 10, value: 2 },
      { source: 5, target: 12, value: 2 },
      // { source: 5, target: 13, value: 27 },
      // { source: 6, target: 14, value: 569 },
      // { source: 7, target: 14, value: 32 },
      // { source: 8, target: 14, value: 32 },
      // { source: 9, target: 14, value: 119 },
      { source: 6, target: 15, value: 12 },
      { source: 7, target: 15, value: 1 },
      { source: 8, target: 15, value: 1 },
      // { source: 9, target: 15, value: 3 },
      { source: 6, target: 16, value: 39 },
      { source: 8, target: 16, value: 2 },
      // { source: 9, target: 16, value: 6 },
      // { source: 10, target: 14, value: 375 },
      // { source: 11, target: 14, value: 72 },
      // { source: 12, target: 14, value: 89 },
      // { source: 13, target: 14, value: 216 },
      { source: 10, target: 15, value: 7 },
      { source: 12, target: 15, value: 2 },
      // { source: 13, target: 15, value: 8 },
      { source: 10, target: 16, value: 25 },
      { source: 11, target: 16, value: 3 },
      { source: 12, target: 16, value: 5 },
      // { source: 13, target: 16, value: 14 },

      // New links from Intents to Difficulty Levels
      // New links from Intents to Difficulty Levels
      { source: 0, target: 17, value: 1 },
      { source: 0, target: 18, value: 8 },
      { source: 0, target: 19, value: 2 },
      { source: 0, target: 20, value: 7 },
      { source: 0, target: 21, value: 9 },
      { source: 1, target: 18, value: 1 },
      { source: 1, target: 20, value: 2 },
      { source: 2, target: 17, value: 192 },
      { source: 2, target: 18, value: 90 },
      { source: 2, target: 19, value: 183 },
      { source: 2, target: 20, value: 89 },
      { source: 2, target: 21, value: 142 },
      { source: 2, target: 22, value: 35 },
      { source: 2, target: 23, value: 2 },
      { source: 3, target: 20, value: 1 },
      { source: 3, target: 23, value: 1 },
      { source: 4, target: 17, value: 4 },
      { source: 4, target: 18, value: 2 },
      { source: 4, target: 19, value: 4 },
      { source: 4, target: 20, value: 3 },
      { source: 4, target: 21, value: 5 },
      { source: 4, target: 22, value: 2 },
      { source: 5, target: 17, value: 1 },
      { source: 5, target: 18, value: 10 },
      { source: 5, target: 19, value: 3 },
      { source: 5, target: 20, value: 5 },
      { source: 5, target: 21, value: 3 },
      { source: 5, target: 22, value: 1 },
      { source: 5, target: 23, value: 8 },

      // New links from Difficulty Levels to Feedback
      // Corrected links from Difficulty Levels to Feedback
      // { source: 17, target: 14, value: 187 },
      // { source: 18, target: 14, value: 101 },
      // { source: 19, target: 14, value: 181 },
      // { source: 20, target: 14, value: 97 },
      // { source: 21, target: 14, value: 141 },
      // { source: 22, target: 14, value: 34 },
      // { source: 23, target: 14, value: 11 },
      { source: 17, target: 15, value: 1 },
      { source: 18, target: 15, value: 3 },
      { source: 19, target: 15, value: 4 },
      { source: 20, target: 15, value: 6 },
      { source: 21, target: 15, value: 3 },
      { source: 17, target: 16, value: 10 },
      { source: 18, target: 16, value: 7 },
      { source: 19, target: 16, value: 7 },
      { source: 20, target: 16, value: 4 },
      { source: 21, target: 16, value: 15 },
      { source: 22, target: 16, value: 4 },
    ],
  };
  const test = {
    Intents: [
      {
        name: "farming_related",
        count: 100,
        Details: [
          {
            faithfulness: [
              { name: "high", count: 10, feedback: "good" },
              { name: "high", count: 10, feedback: "bad" },
              { name: "mid", count: 10, feedback: "good" },
              { name: "mid", count: 10, feedback: "bad" },
              { name: "low", count: 10, feedback: "good" },
              { name: "low", count: 10, feedback: "bad" },
            ],
          },
          {
            relevance: [
              { name: "high", count: 10, feedback: "good" },
              { name: "high", count: 10, feedback: "bad" },
              { name: "mid", count: 10, feedback: "good" },
              { name: "mid", count: 10, feedback: "bad" },
              { name: "low", count: 10, feedback: "good" },
              { name: "low", count: 10, feedback: "bad" },
            ],
          },
          {
            difficulty: [
              { name: "high", count: 10, feedback: "good" },
              { name: "high", count: 10, feedback: "bad" },
              { name: "mid", count: 10, feedback: "good" },
              { name: "mid", count: 10, feedback: "bad" },
              { name: "low", count: 10, feedback: "good" },
              { name: "low", count: 10, feedback: "bad" },
            ],
          },
          {
            performance: [
              { name: "high", count: 10, feedback: "good" },
              { name: "high", count: 10, feedback: "bad" },
              { name: "mid", count: 10, feedback: "good" },
              { name: "mid", count: 10, feedback: "bad" },
              { name: "low", count: 10, feedback: "good" },
              { name: "low", count: 10, feedback: "bad" },
            ],
          },
        ],
      },
      {
        name: "change_crop",
        count: 50,
        Details: [
          {
            faithfulness: [
              { name: "high", count: 5, feedback: "good" },
              { name: "high", count: 5, feedback: "bad" },
              { name: "mid", count: 5, feedback: "good" },
              { name: "mid", count: 5, feedback: "bad" },
              { name: "low", count: 5, feedback: "good" },
              { name: "low", count: 5, feedback: "bad" },
            ],
          },
          {
            relevance: [
              { name: "high", count: 5, feedback: "good" },
              { name: "high", count: 5, feedback: "bad" },
              { name: "mid", count: 5, feedback: "good" },
              { name: "mid", count: 5, feedback: "bad" },
              { name: "low", count: 5, feedback: "good" },
              { name: "low", count: 5, feedback: "bad" },
            ],
          },
          {
            difficulty: [
              { name: "high", count: 5, feedback: "good" },
              { name: "high", count: 5, feedback: "bad" },
              { name: "mid", count: 5, feedback: "good" },
              { name: "mid", count: 5, feedback: "bad" },
              { name: "low", count: 5, feedback: "good" },
              { name: "low", count: 5, feedback: "bad" },
            ],
          },
          {
            performance: [
              { name: "high", count: 5, feedback: "good" },
              { name: "high", count: 5, feedback: "bad" },
              { name: "mid", count: 5, feedback: "good" },
              { name: "mid", count: 5, feedback: "bad" },
              { name: "low", count: 5, feedback: "good" },
              { name: "low", count: 5, feedback: "bad" },
            ],
          },
        ],
      },
      {
        name: "exit",
        count: 30,
        Details: [
          {
            faithfulness: [
              { name: "high", count: 5, feedback: "good" },
              { name: "high", count: 5, feedback: "bad" },
              { name: "mid", count: 5, feedback: "good" },
              { name: "mid", count: 5, feedback: "bad" },
              { name: "low", count: 5, feedback: "good" },
              { name: "low", count: 5, feedback: "bad" },
            ],
          },
          {
            relevance: [
              { name: "high", count: 5, feedback: "good" },
              { name: "high", count: 5, feedback: "bad" },
              { name: "mid", count: 5, feedback: "good" },
              { name: "mid", count: 5, feedback: "bad" },
              { name: "low", count: 5, feedback: "good" },
              { name: "low", count: 5, feedback: "bad" },
            ],
          },
        ],
      },
      {
        name: "referring_back",
        count: 40,
        Details: [
          {
            faithfulness: [
              { name: "high", count: 10, feedback: "good" },
              { name: "high", count: 10, feedback: "bad" },
              { name: "mid", count: 10, feedback: "good" },
              { name: "mid", count: 10, feedback: "bad" },
            ],
          },
          {
            relevance: [
              { name: "high", count: 10, feedback: "good" },
              { name: "high", count: 10, feedback: "bad" },
              { name: "mid", count: 10, feedback: "good" },
              { name: "mid", count: 10, feedback: "bad" },
            ],
          },
        ],
      },
      {
        name: "greeting",
        count: 20,
        Details: [
          {
            faithfulness: [
              { name: "high", count: 5, feedback: "good" },
              { name: "high", count: 5, feedback: "bad" },
              { name: "mid", count: 5, feedback: "good" },
              { name: "mid", count: 5, feedback: "bad" },
            ],
          },
          {
            relevance: [
              { name: "high", count: 5, feedback: "good" },
              { name: "high", count: 5, feedback: "bad" },
              { name: "mid", count: 5, feedback: "good" },
              { name: "mid", count: 5, feedback: "bad" },
            ],
          },
        ],
      },
    ],
  };
  function transformData(rawData) {
    const nodes = [];
    const links = [];
    const nodeMap = new Map();

    // Helper function to get or create node index
    function getNode(name) {
      if (!nodeMap.has(name)) {
        nodeMap.set(name, nodes.length);
        nodes.push({ name });
      }
      return nodeMap.get(name);
    }

    rawData.Intents.forEach((intent) => {
      const intentIndex = getNode(intent.name);

      intent.Details.forEach((detail) => {
        Object.keys(detail).forEach((key) => {
          detail[key].forEach((item) => {
            const categoryIndex = getNode(`${key}:${item.name}`);
            const feedbackIndex = getNode(item.feedback);

            // Create link from intent to category
            links.push({
              source: intentIndex,
              target: categoryIndex,
              value: item.count,
            });

            // Create link from category to feedback
            links.push({
              source: categoryIndex,
              target: feedbackIndex,
              value: item.count,
            });
          });
        });
      });
    });

    return { nodes, links };
  }
  const sankeyTest = transformData(test);
  console.log("🚀 ~ App ~ sankeyTest:", sankeyTest);

  return (
    <div className="App">
      {/* <div className="chart-container">
      <h1 className="chart-title">Response Context </h1>
      <div className="chart">
        <PieChart data={data} />
      </div>
    </div> */}
      {/* <div className="chart-container">
        <h1 className="chart-title">Topic Classifications </h1>
        <h2 className="chart-description">
          Source: Kenya dataset, Coffee, 01 APR 2024 - 30 APR 2024, Kenya{" "}
        </h2>
        <div className="chart">
          <SankeyDiagram data={sankeyTest} />
        </div>
      </div> */}
      <div className="chart-container">
        <h1 className="chart-title">
          Aggregate Prompt Responses User Feedback Analysis{" "}
        </h1>
        <h2 className="chart-description">
          Source: Kenya dataset, Coffee, 09 APR 2024 - 08 MAY 2024, Kenya{" "}
        </h2>
        <div className="chart">
          <SankeyChart data={sankyData} />
        </div>
      </div>

      <div className="chart-container">
        <h1 className="chart-title">Response Claasification</h1>
        <div
          // style={{ width: "1100px", border: "1px solid red" }}
          className="chart"
        >
          <LineChart data={chartData} />
        </div>
      </div>

      <div className="chart-container">
        <h1 className="chart-title">Topic Classifications </h1>
        <h2 className="chart-description">
          Source: Kenya dataset, Coffee, 01 APR 2024 - 30 APR 2024, Kenya{" "}
        </h2>
        <div className="chart">
          <BubbleGraph data={wordData} />
        </div>
      </div>
    </div>
  );
}

export default App;
