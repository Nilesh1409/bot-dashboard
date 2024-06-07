import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import IconButton from "../Components/IconButton/IconButton";
import InteractivePieChart from "../PieChart/OverviewPieChart";
import StackedBarChart from "../StackGraph/Faithfulness";
import RelevanceStackedBarChart from "../StackGraph/Relevance";
import BubbleGraph from "../WordGraph/WordGraph";
import "./ResponseAnalysis.css";

const ResponseAnalysis = () => {
  const circularData = 66; // Example data
  const wordData = {
    nodes: [
      // { topic: "Climate Change", count: 5 },
      // { topic: "Climate Impact", count: 1 },
      { topic: "Fertilizers", count: 2077 },
      { topic: "Harvesting", count: 466 },
      { topic: "Marketing", count: 1653 },
      { topic: "Not related to agriculture", count: 2107 },
      { topic: "Pests and Diseases", count: 5031 },
      // { topic: "Pests and Diseases\nSoil Management\nMarketing", count: 1 },
      // { topic: "Processing", count: 1 },
      // { topic: "Pruning", count: 5 },
      // { topic: "Pruning Techniques", count: 2 },
      { topic: "Soil Management", count: 2162 },
      { topic: "Sowing", count: 1415 },
      { topic: "Storage", count: 265 },
      { topic: "Unclear", count: 706 },
      { topic: "Varieties", count: 2307 },
      { topic: "Others", count: 15 },
    ],
  };
  const barData = [
    { name: "High", value: 40 },
    { name: "Medium", value: 30 },
    { name: "Low", value: 20 },
    { name: "Bad", value: 10 },
  ];
  const faithfulnessData = [
    {
      intent: "Good",
      faithfulness: {
        High: 55,
        Medium: 8,
        Low: 12,
      },
    },
    {
      intent: "Bad",
      faithfulness: {
        High: 1372,
        Medium: 156,
        Low: 211,
      },
    },
  ];
  const relevanceData = [
    {
      intent: "Good",
      relevance: {
        High: 20,
        Medium: 6,
        Low: 24,
      },
    },
    {
      intent: "Bad",
      relevance: {
        High: 1218,
        Medium: 278,
        Low: 291,
      },
    },
  ];
  const faithfulnessOverview = {
    "High Faithfulness": 1540,
    "Medium Faithfulness": 172,
    "Low Faithfulness": 228,
    // Undetermined: 548,
  };
  const relevanceOverview = {
    "High Relevance": 1292,
    "Medium Relevance": 295,
    "Low Relevance": 349,
  };
  const intentOverview = {
    Change_crop: 139,
    Farming_related: 2103,
    Unclear: 130,
    Greeting: 9,
    Referring_back: 89,
    Exit: 16,
    Disappointment: 2,
  };
  const topicOverview = {
    Sowing: 1415,
    Unclear: 706,
    Harvesting: 466,
    Marketing: 1653,
    "Not related to agriculture": 2107,
    Varieties: 2307,
    Fertilizers: 2077,
    "Soil Management": 2162,
    "Pests and Diseases": 5031,
    "Pruning Techniques": 2,
    Storage: 265,
    // "1. Soil Management\n2. Soil Management\n3. Varieties": 1,
    // "1. Not related to agriculture\n2. Marketing": 1,
    // "1. Unclear\n2. Not related to agriculture\n3. Not related to agriculture": 1,
    // "Pests and Diseases\nSoil Management\nMarketing": 1,
    // "1. Fertilizers\n2. Varieties\n3. Sowing": 1,
    Pruning: 5,
    // "1) Soil Management\n2) Soil Management\n3) Soil Management": 1,
    Others: 6,
    "Climate Change": 5,
    "Climate Impact": 1,
    Processing: 1,
  };
  const difficultyOverview = {
    Easy: 2139,
    Standard: 4782,
    Difficult: 5340,
    "Fairly Difficult": 5002,
    "Fairly Easy": 2372,
    "Very Easy": 364,
    "Very Confusing": 1016,
  };

  const faithfulnessOverviewColor = {
    "Low Faithfulness": "#d62728",
    "High Faithfulness": "rgb(44, 160, 44)",
    "Medium Faithfulness": "#FF7F0E",
  };
  const relevanceOverviewColor = {
    "Low Relevance": "#d62728",
    "High Relevance": "rgb(44, 160, 44)",
    "Medium Relevance": "#FF7F0E",
    // Undetermined: 548,
  };
  const difficultyOverviewColor = {
    Easy: "#66CDAA", // Medium Aquamarine
    Standard: "#DAA520", // Goldenrod
    Difficult: "#FF8C00", // Dark Orange
    "Fairly Difficult": "#CD5C5C", // Indian Red
    "Fairly Easy": "#32CD32", // Lime Green
    "Very Easy": "#006400", // Dark Green
    "Very Confusing": "#8B0000", // Dark Red
  };

  return (
    <div className="response-analysis">
      <h1>Analysis Overview </h1>
      <div className="overview-section">
        <div className="card">
          {/* section 1: Aggregate Response Analysis: */}
          <h2>Aggregate Response Analysis:</h2>
          <div className="metrics">
            <div className="metric">
              <span className="title">RAG Accuracy</span>
              <span>
                {" "}
                Faithfulness : <b>83%</b>{" "}
                <IconButton
                  hoverText={
                    "% of factual information in the responses that is based on the documents uploaded"
                  }
                />
              </span>
              <span>
                {" "}
                Completely Faithful: <b>67%</b>
                <IconButton
                  hoverText={
                    "% of answers which have zero factual statements that are not based on the documents"
                  }
                />
              </span>
              <span>
                {" "}
                Relevance : <b>75%</b>
                <IconButton
                  hoverText={
                    "% of factual statements that are relevant to the user query"
                  }
                />
              </span>
              <span>
                {" "}
                Complete Relevant : <b>56%</b>
                <IconButton
                  hoverText={
                    "% of answers which have zero non-relevant statements to the user query"
                  }
                />
              </span>
            </div>
            {/* <div className="metric">
              <span>Relevance</span>
              <span>
                {" "}
                Average Relevance : <b>0.75</b>
              </span>
              <span>
                {" "}
                Percentage Complete Relevant : <b>56%</b>
              </span>
            </div> */}
          </div>
          <div className="pie-charts">
            <div className="pie-chart">
              <h3>
                Accuracy: Faithfulness Distribution
                <p>
                  Shows how often the chatbot provides correct and reliable
                  answers
                </p>
              </h3>
              <InteractivePieChart
                colorSchema={faithfulnessOverviewColor}
                data={faithfulnessOverview}
              />
            </div>
            <div className="pie-chart">
              <h3>
                Accuracy: Relevance Distribution
                <p>
                  Shows how relevant the chatbot's responses are to user
                  questions.
                </p>
              </h3>

              <InteractivePieChart
                colorSchema={relevanceOverviewColor}
                data={relevanceOverview}
              />
            </div>
            <div className="pie-chart">
              <h3>
                Readability Distribution
                <p>
                  Measures how easy the chatbot's responses are to understand.
                </p>
              </h3>

              <InteractivePieChart
                colorSchema={difficultyOverviewColor}
                data={difficultyOverview}
              />
            </div>
          </div>
          {/* <div>
            <StackedBarChart overall={true} data={faithfulnessData} />
            <RelevanceStackedBarChart overall={true} data={relevanceData} />
          </div> */}
        </div>
        <div className="card">
          {/* section 2: Aggregate Prompt Analysis: */}
          <h2>Aggregate Prompt Analysis:</h2>

          <div className="pie-charts">
            <div className="pie-chart">
              <h3>
                User Query Intent
                <p>Main topics or purposes behind users' questions.</p>
              </h3>

              <InteractivePieChart data={intentOverview} />
            </div>
            <div className="pie-chart">
              <h3>
                Topic Distribution
                <p>Distribution of common topics in user interactions.</p>
              </h3>

              <InteractivePieChart data={topicOverview} />
            </div>
          </div>
          <div className="chart-container word-chart-container">
            <h3 className="chart-title">
              Topic Classifications
              <p>
                Visualizes the most discussed topics, with bubble size showing
                frequency.
              </p>
            </h3>
            {/* <h2 className="chart-description">
              Source: Kenya dataset, Coffee, 01 NOV 2023 - 30 MAY 2024, Kenya{" "}
            </h2> */}
            <div className="chart">
              <BubbleGraph data={wordData} />
            </div>
          </div>
          {/* <div>
            <StackedBarChart overall={true} data={faithfulnessData} />
            <RelevanceStackedBarChart overall={true} data={relevanceData} />
          </div> */}
        </div>
        {/* <div className="card">
          <h2>Complexity</h2>
          <div className="metrics">
            <div className="metric">
              <span>Faithfulness</span>
              <span>75%</span>
            </div>
            <div className="metric">
              <span>Relevance</span>
              <span>80%</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ResponseAnalysis;
