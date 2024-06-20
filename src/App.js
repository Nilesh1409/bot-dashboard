import "./App.css";
import PieChart from "./PieChart/PieChart";
import LineChart from "./LineChart/LineChart";
// import WordGraph from './WordGraph/WordGraph';
import BubbleGraph from "./WordGraph/WordGraph";
import SankeyChart from "./SankyChart/SankyChart";
import SankeyDiagram from "./SankyChart/Sankey";
import FeedbackChart from "./LineChart/FeedbackChart";
import ResponseChart from "./LineChart/ResponseChart";
import AnsweredChart from "./LineChart/AnsweredChart";
import StackedBarChart from "./StackGraph/Faithfulness";
import RelevanceStackedBarChart from "./StackGraph/Relevance";
import DifficultyStackedBarChart from "./StackGraph/Difficulty";
import TopicChart from "./LineChart/Topic";
import IntentFeedbackStackedBarChart from "./StackGraph/IntentFeedbackStack";
import DenialOfServiceChart from "./LineChart/DenialOfService";
import ClassificationsStackedBarChart from "./StackGraph/Classifications";
import DifficultyFeedbackStackedBarChart from "./StackGraph/DifficultyFeedback";
import DenialOfServiceFeedbackStackedBarChart from "./StackGraph/DenialOfServiceFeedback";
import TopicFeedbackStackedBarChart from "./StackGraph/TopicFeedback";
import ResponseAnalysis from "./Overview/Overview";
import OverviewPieChart from "./PieChart/OverviewPieChart";
import SimpleLineChart from "./SimpleLineChart/SimpleLineChart";
import { useState } from "react";
import LineChartWithTimeSeries from "./LineChartGraph/LineChartWithTimeSeries";
import Heatmap from "./Heatmap/Heatmap";
import Switch from "@mui/material/Switch";
import AuthStatus from "./AuthStatus";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import HoverIcon from "./Components/IconButton/IconButton";
import TopicVsFaithfulnessBarChart from "./StackGraph/TopicVsFaithfulness";
import TopicVsRelevanceBarChart from "./StackGraph/TopicVsRelevance";
import chartBarGraphData from "./data/coffee_msg_count.json";
import BarGraph from "./BarGraph/BarGraph";

function App() {
  console.log("🚀 ~ chartBarGraphData:", chartBarGraphData);
  const [simpleBarGraphData, setSimpleBarGraphData] = useState();
  const [darkTheme, setDarkTheme] = useState(false);

  const label = { inputProps: { "aria-label": "Switch demo" } };
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
  // const chartData = [
  //   {
  //     year: 1990,
  //     "Under-5": 0.97,
  //     "5-14 years": 1.03,
  //     "15-49 years": 14.87,
  //     "50-69 years": 40.65,
  //     "70+ years": 42.48,
  //   },
  //   {
  //     year: 1991,
  //     "Under-5": 0.95,
  //     "5-14 years": 1.02,
  //     "15-49 years": 15.0,
  //     "50-69 years": 40.0,
  //     "70+ years": 43.03,
  //   },
  //   {
  //     year: 1992,
  //     "Under-5": 0.2,
  //     "5-14 years": 0.03,
  //     "15-49 years": 14.87,
  //     "50-69 years": 40.65,
  //     "70+ years": 40.48,
  //   },
  //   {
  //     year: 1993,
  //     "Under-5": 0.95,
  //     "5-14 years": 1.02,
  //     "15-49 years": 15.0,
  //     "50-69 years": 40.0,
  //     "70+ years": 40.03,
  //   },
  //   {
  //     year: 1994,
  //     "Under-5": 0.97,
  //     "5-14 years": 1.03,
  //     "15-49 years": 14.87,
  //     "50-69 years": 40.65,
  //     "70+ years": 30.48,
  //   },
  //   {
  //     year: 1995,
  //     "Under-5": 0.95,
  //     "5-14 years": 1.02,
  //     "15-49 years": 15.0,
  //     "50-69 years": 40.0,
  //     "70+ years": 40.03,
  //   },
  //   {
  //     year: 1996,
  //     "Under-5": 0.97,
  //     "5-14 years": 1.03,
  //     "15-49 years": 14.87,
  //     "50-69 years": 40.65,
  //     "70+ years": 40.48,
  //   },
  //   {
  //     year: 1997,
  //     "Under-5": 0.95,
  //     "5-14 years": 1.02,
  //     "15-49 years": 15.0,
  //     "50-69 years": 40.0,
  //     "70+ years": 40.03,
  //   },
  //   {
  //     year: 1998,
  //     "Under-5": 0.97,
  //     "5-14 years": 1.03,
  //     "15-49 years": 14.87,
  //     "50-69 years": 40.65,
  //     "70+ years": 42.48,
  //   },
  //   {
  //     year: 1999,
  //     "Under-5": 0.95,
  //     "5-14 years": 1.02,
  //     "15-49 years": 15.0,
  //     "50-69 years": 40.0,
  //     "70+ years": 43.03,
  //   },
  //   {
  //     year: 2000,
  //     "Under-5": 0.2,
  //     "5-14 years": 0.03,
  //     "15-49 years": 14.87,
  //     "50-69 years": 40.65,
  //     "70+ years": 40.48,
  //   },
  //   {
  //     year: 2001,
  //     "Under-5": 0.95,
  //     "5-14 years": 1.02,
  //     "15-49 years": 15.0,
  //     "50-69 years": 40.0,
  //     "70+ years": 40.03,
  //   },
  //   {
  //     year: 2002,
  //     "Under-5": 0.97,
  //     "5-14 years": 1.03,
  //     "15-49 years": 15,
  //     "50-69 years": 40,
  //     "70+ years": 40.03,
  //   },
  //   {
  //     year: 2002,
  //     "Under-5": 0.97,
  //     "5-14 years": 1.03,
  //     "15-49 years": 15,
  //     "50-69 years": 40,
  //     "70+ years": 40.03,
  //   },
  //   {
  //     year: 2003,
  //     "Under-5": 0.97,
  //     "5-14 years": 1.03,
  //     "15-49 years": 14.87,
  //     "50-69 years": 39,
  //     "70+ years": 40.038,
  //   },
  //   {
  //     year: 2004,
  //     "Under-5": 0.95,
  //     "5-14 years": 1.02,
  //     "15-49 years": 15.0,
  //     "50-69 years": 39.0,
  //     "70+ years": 40.03,
  //   },
  // ];
  const intentData = [
    {
      // index: 1,
      year: 2023,
      month: "November",
      monthInt: 11,
      Unclear: 192,
      Farming_related: 1852,
      Change_crop: 170,
      Exit: 18,
      Referring_back: 72,
      Disappointment: 6,
      Greeting: 9,
    },
    {
      // index: 2,
      year: 2023,
      month: "December",
      monthInt: 12,
      Unclear: 131,
      Farming_related: 973,
      Change_crop: 132,
      Disappointment: 6,
      Referring_back: 55,
      Exit: 13,
      Greeting: 7,
    },
    {
      // index: 3,
      year: 2024,
      month: "January",
      monthInt: 1,
      Farming_related: 1304,
      Change_crop: 138,
      Disappointment: 0,
      Referring_back: 93,
      Unclear: 116,
      Exit: 14,
      Greeting: 7,
    },
    {
      // index: 4,
      year: 2024,
      month: "February",
      monthInt: 2,
      Unclear: 213,
      Change_crop: 212,
      Farming_related: 3258,
      Referring_back: 169,
      Greeting: 19,
      Exit: 17,
      Disappointment: 2,
    },
    {
      // index: 5,
      year: 2024,
      month: "March",
      monthInt: 3,
      Farming_related: 5677,
      Unclear: 190,
      Change_crop: 219,
      Exit: 13,
      Referring_back: 228,
      Greeting: 12,
      Disappointment: 2,
    },
    {
      // index: 6,
      year: 2024,
      monthInt: 4,
      month: "April",
      Farming_related: 3842,
      Change_crop: 125,
      Unclear: 127,
      Referring_back: 120,
      Greeting: 11,
      Exit: 7,
      Disappointment: 1,
    },
    {
      // index: 7,
      year: 2024,
      month: "May",
      monthInt: 5,
      Farming_related: 1303,
      Change_crop: 36,
      Referring_back: 46,
      Exit: 3,
      Unclear: 54,
      Greeting: 1,
      Disappointment: 0,
    },
  ];

  const feedbackData = [
    {
      year: 2023,
      month: "November",
      GoodFeedback: 697,
      BadFeedback: 116,
    },
    {
      year: 2023,
      month: "December",
      GoodFeedback: 254,
      BadFeedback: 41,
    },
    {
      year: 2024,
      month: "January",
      GoodFeedback: 289,
      BadFeedback: 56,
    },
    {
      year: 2024,
      month: "February",
      GoodFeedback: 663,
      BadFeedback: 99,
    },
    {
      year: 2024,
      month: "March",
      GoodFeedback: 731,
      BadFeedback: 162,
    },
    {
      year: 2024,
      month: "April",
      GoodFeedback: 505,
      BadFeedback: 169,
    },
    {
      year: 2024,
      month: "May",
      GoodFeedback: 110,
      BadFeedback: 37,
    },
  ];

  const answeredData = [
    {
      year: 2023,
      month: "November",
      Answered: 1713,
      "Not answered": 616,
    },
    {
      year: 2023,
      month: "December",
      Answered: 928,
      "Not answered": 381,
    },
    {
      year: 2024,
      month: "January",
      Answered: 1339,
      "Not answered": 334,
    },
    {
      year: 2024,
      month: "February",
      Answered: 2937,
      "Not answered": 967,
    },
    {
      year: 2024,
      month: "March",
      Answered: 4861,
      "Not answered": 1476,
    },
    {
      year: 2024,
      month: "April",
      Answered: 2863,
      "Not answered": 1371,
    },
    {
      year: 2024,
      month: "May",
      Answered: 1226,
      "Not answered": 205,
    },
  ];

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

  let masterData = [
    {
      intent: "Change_crop",
      count: 27,
      faithfulness: [
        {
          intent: "Change_crop",
          faithfulness_classification: "High Faithfulness",
          feedback: "No Feedback",
          count: 22,
        },
        {
          intent: "Change_crop",
          faithfulness_classification: "High Faithfulness",
          feedback: "bad",
          count: 2,
        },
        {
          intent: "Change_crop",
          faithfulness_classification: "High Faithfulness",
          feedback: "good",
          count: 3,
        },
      ],
      relevace: [
        {
          intent: "Change_crop",
          relevance_classification: "Undetermined",
          feedback: "No Feedback",
          count: 22,
        },
        {
          intent: "Change_crop",
          relevance_classification: "Undetermined",
          feedback: "bad",
          count: 2,
        },
        {
          intent: "Change_crop",
          relevance_classification: "Undetermined",
          feedback: "good",
          count: 3,
        },
      ],
      difficulty: [
        {
          intent: "Change_crop",
          difficulty: "Difficult",
          feedback: "No Feedback",
          count: 1,
        },
        {
          intent: "Change_crop",
          difficulty: "Easy",
          feedback: "No Feedback",
          count: 8,
        },
        {
          intent: "Change_crop",
          difficulty: "Fairly Difficult",
          feedback: "No Feedback",
          count: 1,
        },
        {
          intent: "Change_crop",
          difficulty: "Fairly Difficult",
          feedback: "good",
          count: 1,
        },
        {
          intent: "Change_crop",
          difficulty: "Fairly Easy",
          feedback: "No Feedback",
          count: 6,
        },
        {
          intent: "Change_crop",
          difficulty: "Fairly Easy",
          feedback: "bad",
          count: 1,
        },
        {
          intent: "Change_crop",
          difficulty: "Standard",
          feedback: "No Feedback",
          count: 6,
        },
        {
          intent: "Change_crop",
          difficulty: "Standard",
          feedback: "bad",
          count: 1,
        },
        {
          intent: "Change_crop",
          difficulty: "Standard",
          feedback: "good",
          count: 2,
        },
      ],
      performance: [
        {
          intent: "Change_crop",
          performance_classification: "Fast",
          feedback: "No Feedback",
          count: 22,
        },
        {
          intent: "Change_crop",
          performance_classification: "Fast",
          feedback: "bad",
          count: 2,
        },
        {
          intent: "Change_crop",
          performance_classification: "Fast",
          feedback: "good",
          count: 3,
        },
      ],
    },
    {
      intent: "Exit",
      count: 3,
      faithfulness: [
        {
          intent: "Exit",
          faithfulness_classification: "High Faithfulness",
          feedback: "No Feedback",
          count: 3,
        },
      ],
      relevace: [
        {
          intent: "Exit",
          relevance_classification: "Undetermined",
          feedback: "No Feedback",
          count: 3,
        },
      ],
      difficulty: [
        {
          intent: "Exit",
          difficulty: "Easy",
          feedback: "No Feedback",
          count: 1,
        },
        {
          intent: "Exit",
          difficulty: "Fairly Easy",
          feedback: "No Feedback",
          count: 2,
        },
      ],
      performance: [
        {
          intent: "Exit",
          performance_classification: "Fast",
          feedback: "No Feedback",
          count: 3,
        },
      ],
    },
    {
      intent: "Farming_related",
      count: 733,
      faithfulness: [
        {
          intent: "Farming_related",
          faithfulness_classification: "High Faithfulness",
          feedback: "No Feedback",
          count: 497,
        },
        {
          intent: "Farming_related",
          faithfulness_classification: "High Faithfulness",
          feedback: "bad",
          count: 10,
        },
        {
          intent: "Farming_related",
          faithfulness_classification: "High Faithfulness",
          feedback: "good",
          count: 36,
        },
        {
          intent: "Farming_related",
          faithfulness_classification: "Low Faithfulness",
          feedback: "No Feedback",
          count: 32,
        },
        {
          intent: "Farming_related",
          faithfulness_classification: "Low Faithfulness",
          feedback: "bad",
          count: 1,
        },
        {
          intent: "Farming_related",
          faithfulness_classification: "Medium Faithfulness",
          feedback: "No Feedback",
          count: 31,
        },
        {
          intent: "Farming_related",
          faithfulness_classification: "Medium Faithfulness",
          feedback: "bad",
          count: 1,
        },
        {
          intent: "Farming_related",
          faithfulness_classification: "Medium Faithfulness",
          feedback: "good",
          count: 2,
        },
      ],
      relevace: [
        {
          intent: "Farming_related",
          relevance_classification: "High Relevance",
          feedback: "No Feedback",
          count: 315,
        },
        {
          intent: "Farming_related",
          relevance_classification: "High Relevance",
          feedback: "bad",
          count: 6,
        },
        {
          intent: "Farming_related",
          relevance_classification: "High Relevance",
          feedback: "good",
          count: 22,
        },
        {
          intent: "Farming_related",
          relevance_classification: "Low Relevance",
          feedback: "No Feedback",
          count: 65,
        },
        {
          intent: "Farming_related",
          relevance_classification: "Low Relevance",
          feedback: "good",
          count: 3,
        },
        {
          intent: "Farming_related",
          relevance_classification: "Medium Relevance",
          feedback: "No Feedback",
          count: 74,
        },
        {
          intent: "Farming_related",
          relevance_classification: "Medium Relevance",
          feedback: "bad",
          count: 2,
        },
        {
          intent: "Farming_related",
          relevance_classification: "Medium Relevance",
          feedback: "good",
          count: 4,
        },
        {
          intent: "Farming_related",
          relevance_classification: "Undetermined",
          feedback: "No Feedback",
          count: 106,
        },
        {
          intent: "Farming_related",
          relevance_classification: "Undetermined",
          feedback: "bad",
          count: 4,
        },
        {
          intent: "Farming_related",
          relevance_classification: "Undetermined",
          feedback: "good",
          count: 9,
        },
      ],
      difficulty: [
        {
          intent: "Farming_related",
          difficulty: "Difficult",
          feedback: "No Feedback",
          count: 181,
        },
        {
          intent: "Farming_related",
          difficulty: "Difficult",
          feedback: "bad",
          count: 1,
        },
        {
          intent: "Farming_related",
          difficulty: "Difficult",
          feedback: "good",
          count: 10,
        },
        {
          intent: "Farming_related",
          difficulty: "Easy",
          feedback: "No Feedback",
          count: 80,
        },
        {
          intent: "Farming_related",
          difficulty: "Easy",
          feedback: "bad",
          count: 3,
        },
        {
          intent: "Farming_related",
          difficulty: "Easy",
          feedback: "good",
          count: 7,
        },
        {
          intent: "Farming_related",
          difficulty: "Fairly Difficult",
          feedback: "No Feedback",
          count: 173,
        },
        {
          intent: "Farming_related",
          difficulty: "Fairly Difficult",
          feedback: "bad",
          count: 4,
        },
        {
          intent: "Farming_related",
          difficulty: "Fairly Difficult",
          feedback: "good",
          count: 6,
        },
        {
          intent: "Farming_related",
          difficulty: "Fairly Easy",
          feedback: "No Feedback",
          count: 80,
        },
        {
          intent: "Farming_related",
          difficulty: "Fairly Easy",
          feedback: "bad",
          count: 5,
        },
        {
          intent: "Farming_related",
          difficulty: "Fairly Easy",
          feedback: "good",
          count: 4,
        },
        {
          intent: "Farming_related",
          difficulty: "Standard",
          feedback: "No Feedback",
          count: 127,
        },
        {
          intent: "Farming_related",
          difficulty: "Standard",
          feedback: "bad",
          count: 2,
        },
        {
          intent: "Farming_related",
          difficulty: "Standard",
          feedback: "good",
          count: 13,
        },
        {
          intent: "Farming_related",
          difficulty: "Very Confusing",
          feedback: "No Feedback",
          count: 31,
        },
        {
          intent: "Farming_related",
          difficulty: "Very Confusing",
          feedback: "good",
          count: 4,
        },
        {
          intent: "Farming_related",
          difficulty: "Very Easy",
          feedback: "No Feedback",
          count: 2,
        },
      ],
      performance: [
        {
          intent: "Farming_related",
          performance_classification: "Fast",
          feedback: "No Feedback",
          count: 260,
        },
        {
          intent: "Farming_related",
          performance_classification: "Fast",
          feedback: "bad",
          count: 7,
        },
        {
          intent: "Farming_related",
          performance_classification: "Fast",
          feedback: "good",
          count: 16,
        },
        {
          intent: "Farming_related",
          performance_classification: "Medium",
          feedback: "No Feedback",
          count: 390,
        },
        {
          intent: "Farming_related",
          performance_classification: "Medium",
          feedback: "bad",
          count: 8,
        },
        {
          intent: "Farming_related",
          performance_classification: "Medium",
          feedback: "good",
          count: 28,
        },
        {
          intent: "Farming_related",
          performance_classification: "Slow",
          feedback: "No Feedback",
          count: 24,
        },
      ],
    },
    {
      intent: "Greeting",
      count: 2,
      faithfulness: [
        {
          intent: "Greeting",
          faithfulness_classification: "High Faithfulness",
          feedback: "No Feedback",
          count: 1,
        },
      ],
      relevace: [
        {
          intent: "Greeting",
          relevance_classification: "Undetermined",
          feedback: "No Feedback",
          count: 1,
        },
      ],
      difficulty: [
        {
          intent: "Greeting",
          difficulty: "Fairly Easy",
          feedback: "No Feedback",
          count: 1,
        },
        {
          intent: "Greeting",
          difficulty: "Very Easy",
          feedback: "No Feedback",
          count: 1,
        },
      ],
      performance: [
        {
          intent: "Greeting",
          performance_classification: "Fast",
          feedback: "No Feedback",
          count: 2,
        },
      ],
    },
    {
      intent: "Referring_back",
      count: 20,
      faithfulness: [
        {
          intent: "Referring_back",
          faithfulness_classification: "High Faithfulness",
          feedback: "No Feedback",
          count: 18,
        },
        {
          intent: "Referring_back",
          faithfulness_classification: "Medium Faithfulness",
          feedback: "No Feedback",
          count: 1,
        },
      ],
      relevace: [
        {
          intent: "Referring_back",
          relevance_classification: "High Relevance",
          feedback: "No Feedback",
          count: 11,
        },
        {
          intent: "Referring_back",
          relevance_classification: "Low Relevance",
          feedback: "No Feedback",
          count: 2,
        },
        {
          intent: "Referring_back",
          relevance_classification: "Medium Relevance",
          feedback: "No Feedback",
          count: 3,
        },
        {
          intent: "Referring_back",
          relevance_classification: "Undetermined",
          feedback: "No Feedback",
          count: 3,
        },
      ],
      difficulty: [
        {
          intent: "Referring_back",
          difficulty: "Difficult",
          feedback: "No Feedback",
          count: 4,
        },
        {
          intent: "Referring_back",
          difficulty: "Easy",
          feedback: "No Feedback",
          count: 2,
        },
        {
          intent: "Referring_back",
          difficulty: "Fairly Difficult",
          feedback: "No Feedback",
          count: 4,
        },
        {
          intent: "Referring_back",
          difficulty: "Fairly Easy",
          feedback: "No Feedback",
          count: 3,
        },
        {
          intent: "Referring_back",
          difficulty: "Standard",
          feedback: "No Feedback",
          count: 5,
        },
        {
          intent: "Referring_back",
          difficulty: "Very Confusing",
          feedback: "No Feedback",
          count: 2,
        },
      ],
      performance: [
        {
          intent: "Referring_back",
          performance_classification: "Fast",
          feedback: "No Feedback",
          count: 4,
        },
        {
          intent: "Referring_back",
          performance_classification: "Medium",
          feedback: "No Feedback",
          count: 14,
        },
        {
          intent: "Referring_back",
          performance_classification: "Slow",
          feedback: "No Feedback",
          count: 2,
        },
      ],
    },
    {
      intent: "Unclear",
      count: 31,
      faithfulness: [
        {
          intent: "Unclear",
          faithfulness_classification: "High Faithfulness",
          feedback: "No Feedback",
          count: 28,
        },
      ],
      relevace: [
        {
          intent: "Unclear",
          relevance_classification: "High Relevance",
          feedback: "No Feedback",
          count: 2,
        },
        {
          intent: "Unclear",
          relevance_classification: "Medium Relevance",
          feedback: "No Feedback",
          count: 2,
        },
        {
          intent: "Unclear",
          relevance_classification: "Undetermined",
          feedback: "No Feedback",
          count: 24,
        },
      ],
      difficulty: [
        {
          intent: "Unclear",
          difficulty: "Difficult",
          feedback: "No Feedback",
          count: 1,
        },
        {
          intent: "Unclear",
          difficulty: "Easy",
          feedback: "No Feedback",
          count: 10,
        },
        {
          intent: "Unclear",
          difficulty: "Fairly Difficult",
          feedback: "No Feedback",
          count: 3,
        },
        {
          intent: "Unclear",
          difficulty: "Fairly Easy",
          feedback: "No Feedback",
          count: 5,
        },
        {
          intent: "Unclear",
          difficulty: "Standard",
          feedback: "No Feedback",
          count: 3,
        },
        {
          intent: "Unclear",
          difficulty: "Very Confusing",
          feedback: "No Feedback",
          count: 1,
        },
        {
          intent: "Unclear",
          difficulty: "Very Easy",
          feedback: "No Feedback",
          count: 8,
        },
      ],
      performance: [
        {
          intent: "Unclear",
          performance_classification: "Fast",
          feedback: "No Feedback",
          count: 27,
        },
        {
          intent: "Unclear",
          performance_classification: "Medium",
          feedback: "No Feedback",
          count: 4,
        },
      ],
    },
  ];

  const sankyData = {
    nodes: [
      // Intents
      { name: "Change_crop", count: 27 }, // 0
      { name: "Exit", count: 3 }, // 1
      { name: "Farming_related", count: 733 }, // 2
      { name: "Greeting", count: 2 }, // 3
      { name: "Referring_back", count: 20 }, // 4
      { name: "Unclear", count: 31 }, // 5

      // Faithfulness Classifications
      { name: "High Faithfulness" }, // 6
      { name: "High Relevance" }, // 7
      { name: "Very Confusing" }, // 8

      // Relevance Classifications
      { name: "Medium Faithfulness" }, // 9
      { name: "Medium Relevance" }, // 10
      { name: "Difficult" }, //11

      // Feedback
      { name: "bad" }, // 12
      { name: "good" }, // 13

      // Difficulty Levels
      { name: "Low Faithfulness" }, // 14
      { name: "Low Relevance" }, //15
      { name: "Easy" }, // 16

      { name: "Fairly Difficult" }, //17
      { name: "Fairly Easy" }, //18
      { name: "Standard" }, // 19
    ],
    links: [
      //High
      { source: 2, target: 6, value: 543 }, // High Faithfulness
      { source: 2, target: 7, value: 343 }, // High Relevance:
      { source: 2, target: 8, value: 35 }, // Very Confusing":
      // Mid
      { source: 2, target: 9, value: 34 }, // Medium Faithfulness
      { source: 2, target: 10, value: 80 }, // Medium Relevance
      { source: 2, target: 11, value: 192 }, // Difficultss
      // low
      { source: 2, target: 14, value: 33 }, // Low Faithfulness
      { source: 2, target: 15, value: 68 }, // Low Relevance
      { source: 2, target: 16, value: 90 }, // Easy
      { source: 2, target: 17, value: 183 }, // Fairly Difficult
      { source: 2, target: 18, value: 89 }, //Fairly Easy"
      { source: 2, target: 19, value: 142 }, // Standard
      // Change crop
      //High
      { source: 0, target: 6, value: 27 }, // High Faithfulness

      // Mid
      { source: 0, target: 17, value: 1 }, // Fairly Difficult-> good: 2
      { source: 0, target: 18, value: 1 }, // Fairly Easy -> good: 2
      { source: 0, target: 19, value: 3 }, //Standard
      // Low
      { source: 0, target: 11, value: 1 }, // Difficult

      { source: 0, target: 16, value: 8 }, // Easy
      { source: 0, target: 17, value: 2 }, // Fairly Difficult
      { source: 0, target: 18, value: 7 }, //Fairly Easy"
      { source: 0, target: 19, value: 9 }, // Standard
      // Exit
      //High
      { source: 1, target: 6, value: 3 }, // High Faithfulness

      { source: 1, target: 16, value: 1 }, // Easy
      { source: 1, target: 18, value: 2 }, //Fairly Easy"
      // Greeting
      { source: 3, target: 6, value: 1 }, // High Faithfulness
      { source: 3, target: 16, value: 1 }, // Easy
      { source: 3, target: 18, value: 1 }, //Fairly Easy"
      // Referring_back
      { source: 4, target: 16, value: 18 }, // Easy
      // { source: 4, target: 7, value: 0 }, // High Relevance:
      { source: 4, target: 8, value: 2 }, // Very Confusing":
      // Mid
      { source: 4, target: 9, value: 1 }, // Medium Faithfulness
      { source: 4, target: 10, value: 3 }, // Medium Relevance
      { source: 4, target: 11, value: 4 }, // Difficult
      // low
      { source: 4, target: 15, value: 2 }, // Low Relevance
      { source: 4, target: 16, value: 2 }, // Easy
      { source: 4, target: 17, value: 4 }, // Fairly Difficult
      { source: 4, target: 18, value: 3 }, //Fairly Easy"
      { source: 4, target: 19, value: 5 }, // Standard
      // Unclear
      //High
      { source: 5, target: 6, value: 28 }, // High Faithfulness
      { source: 5, target: 7, value: 2 }, // High Relevance:
      { source: 5, target: 8, value: 1 }, // Very Confusing":
      // Mid
      { source: 5, target: 10, value: 2 }, // Medium Relevance
      { source: 5, target: 11, value: 1 }, // Difficult
      // low
      { source: 5, target: 16, value: 10 }, // Easy
      { source: 5, target: 17, value: 3 }, // Fairly Difficult
      { source: 5, target: 18, value: 5 }, //Fairly Easy"
      { source: 5, target: 19, value: 3 }, // Standard

      // Feedback
      { source: 6, target: 13, value: 39 }, //good: Change_crop + High faithfulness
      { source: 6, target: 12, value: 12 }, //bad: Change_crop + High faithfulness

      { source: 7, target: 13, value: 22 }, //good:  High relevance
      { source: 7, target: 12, value: 6 }, //bad:   High relevance
      // Very Confusing
      { source: 8, target: 13, value: 4 }, //good
      // Medium Faithfulness
      { source: 9, target: 13, value: 2 }, //good
      { source: 9, target: 12, value: 1 }, //bad
      // Medium Relevance
      { source: 10, target: 13, value: 4 }, //good
      { source: 10, target: 12, value: 2 }, //bad
      //Difficult
      { source: 11, target: 13, value: 10 }, //good
      { source: 11, target: 12, value: 1 }, //bad
      //Low Faithfulness
      // { source: 14, target: 13, value: 10 }, //good
      { source: 14, target: 12, value: 1 }, //bad
      //Low Relevance
      // { source: 15, target: 13, value: 10 }, //good
      { source: 15, target: 12, value: 3 }, //bad
      //Easy
      { source: 16, target: 13, value: 7 }, //good
      { source: 16, target: 12, value: 3 }, //bad
      //Fairly Difficult
      { source: 17, target: 13, value: 7 }, //good
      { source: 17, target: 12, value: 4 }, //bad
      //Fairly Easy
      { source: 18, target: 13, value: 4 }, //good
      { source: 18, target: 12, value: 6 }, //bad
      //Standard
      { source: 19, target: 13, value: 15 }, //good
      { source: 19, target: 12, value: 3 }, //bad
      // Direct
      // { source: 2, target: 13, value: 154 }, //bad
    ],
  };
  const feedbackRaw = [
    {
      intent: "Farming_related",
      "good feedback": 44,
      "bad feedback": 15,
      "no feedback": 674,
    },
    {
      intent: "Greeting",
      "good feedback": 0,
      "bad feedback": 0,
      "no feedback": 2,
    },
    {
      intent: "Unclear",
      "good feedback": 0,
      "bad feedback": 0,
      "no feedback": 31,
    },
    {
      intent: "Referring_back",
      "good feedback": 0,
      "bad feedback": 0,
      "no feedback": 20,
    },
    {
      intent: "Change_crop",
      "good feedback": 3,
      "bad feedback": 2,
      "no feedback": 22,
    },
    {
      intent: "Exit",
      "good feedback": 0,
      "bad feedback": 0,
      "no feedback": 3,
    },
  ];
  const sankyFeedback = {
    nodes: [
      { name: "Change_crop" },
      { name: "" }, //Exit
      { name: "Farming_related" },
      { name: "" }, //Greeting
      { name: "" }, //Referring_back
      { name: "" }, //Unclear
      { name: "bad" }, //bad
      { name: "good" },
      // { name: "No Feedback" },//No Feedback
    ],
    links: [
      { source: 2, target: 7, value: 44 },
      { source: 2, target: 6, value: 15 },
      // { source: 2, target: 8, value: 674 },
      // { source: 3, target: 8, value: 2 },
      // { source: 5, target: 8, value: 31 },
      // { source: 4, target: 8, value: 20 },
      { source: 0, target: 7, value: 3 },
      { source: 0, target: 6, value: 2 },
      // { source: 0, target: 8, value: 22 },
      // { source: 1, target: 8, value: 3 },
    ],
  };

  const responseData = [
    {
      year: 2024,
      month: "April",
      GotResponse: 167,
      "Didn'tGet": 1,
    },
    {
      year: 2024,
      month: "May",
      GotResponse: 618,
      "Didn'tGet": 30,
    },
  ];

  const updatedSankyData = {
    intents: {
      Farming_related: {
        faithfulness_classification: {
          "medium faithfulness": 34,
          undetermined: 123,
          "high faithfulness": 543,
          "low faithfulness": 33,
        },
      },
      Greeting: {
        faithfulness_classification: {
          undetermined: 1,
          "high faithfulness": 1,
        },
      },
      Unclear: {
        faithfulness_classification: {
          undetermined: 3,
          "high faithfulness": 28,
        },
      },
      Referring_back: {
        faithfulness_classification: {
          "high faithfulness": 18,
          "medium faithfulness": 1,
          undetermined: 1,
        },
      },
      Change_crop: {
        faithfulness_classification: {
          "high faithfulness": 27,
        },
      },
      Exit: {
        faithfulness_classification: {
          "high faithfulness": 3,
        },
      },
    },
    faithfulness: {
      "medium faithfulness": {
        relevance_classification: 35,
        difficulty: 35,
      },
      undetermined: {
        relevance_classification: 128,
        difficulty: 128,
      },
      "high faithfulness": {
        relevance_classification: 620,
        difficulty: 620,
      },
      "low faithfulness": {
        relevance_classification: 33,
        difficulty: 33,
      },
    },
    relevance: {
      "high relevance": {
        faithfulness_classification: 407,
        difficulty: 407,
      },
      undetermined: {
        faithfulness_classification: 238,
        difficulty: 238,
      },
      "low relevance": {
        faithfulness_classification: 75,
        difficulty: 75,
      },
      "medium relevance": {
        faithfulness_classification: 96,
        difficulty: 96,
      },
    },
    difficulty: {
      difficult: 198,
      "fairly easy": 107,
      easy: 111,
      "fairly difficult": 192,
      standard: 159,
      "very confusing": 38,
      "very easy": 11,
    },
    feedback: {
      null: 752,
      bad: 17,
      good: 47,
    },
  };

  const faithfulnessData = [
    {
      intent: "Change_crop",
      faithfulness: {
        High: 55,
        Medium: 8,
        Low: 12,
      },
    },
    {
      intent: "Farming_related",
      faithfulness: {
        High: 1372,
        Medium: 156,
        Low: 211,
      },
    },
    {
      intent: "Unclear",
      faithfulness: {
        High: 67,
        Medium: 5,
        Low: 4,
      },
    },
    {
      intent: "Greeting",
      faithfulness: {
        High: 1,
        Medium: 0,
        Low: 0,
      },
    },
    {
      intent: "Referring_back",
      faithfulness: {
        High: 38,
        Medium: 1,
        Low: 1,
      },
    },
    {
      intent: "Exit",
      faithfulness: {
        High: 6,
        Medium: 2,
        Low: 0,
      },
    },
    {
      intent: "Disappointment",
      faithfulness: {
        High: 1,
        Medium: 0,
        Low: 0,
      },
    },
  ];
  const topicAndFaithfulnessData = [
    {
      topic: "Unknown",
      faithfulness: {
        "High Faithfulness": 168,
        "Medium Faithfulness": 16,
        "Low Faithfulness": 17,
      },
    },
    {
      topic: "Fertilizers",
      faithfulness: {
        "High Faithfulness": 133,
        "Medium Faithfulness": 18,
        "Low Faithfulness": 38,
      },
    },
    {
      topic: "Soil Management",
      faithfulness: {
        "High Faithfulness": 190,
        "Medium Faithfulness": 23,
        "Low Faithfulness": 23,
      },
    },
    {
      topic: "Not related to agriculture",
      faithfulness: {
        "High Faithfulness": 141,
        "Medium Faithfulness": 14,
        "Low Faithfulness": 32,
      },
    },
    {
      topic: "Harvesting",
      faithfulness: {
        "High Faithfulness": 35,
        "Medium Faithfulness": 3,
        "Low Faithfulness": 12,
      },
    },
    {
      topic: "Sowing",
      faithfulness: {
        "High Faithfulness": 125,
        "Medium Faithfulness": 14,
        "Low Faithfulness": 15,
      },
    },
    {
      topic: "Marketing",
      faithfulness: {
        "High Faithfulness": 107,
        "Medium Faithfulness": 11,
        "Low Faithfulness": 16,
      },
    },
    {
      topic: "Varieties",
      faithfulness: {
        "High Faithfulness": 171,
        "Medium Faithfulness": 34,
        "Low Faithfulness": 24,
      },
    },
    {
      topic: "Pests and Diseases",
      faithfulness: {
        "High Faithfulness": 388,
        "Medium Faithfulness": 32,
        "Low Faithfulness": 41,
      },
    },
    {
      topic: "Unclear",
      faithfulness: {
        "High Faithfulness": 49,
        "Medium Faithfulness": 4,
        "Low Faithfulness": 5,
      },
    },
    {
      topic: "Storage",
      faithfulness: {
        "High Faithfulness": 31,
        "Medium Faithfulness": 2,
        "Low Faithfulness": 5,
      },
    },
    {
      topic: "Others",
      faithfulness: {
        "High Faithfulness": 2,
        "Medium Faithfulness": 1,
      },
    },
  ];

  const relevanceData = [
    {
      intent: "Change_crop",
      relevance: {
        High: 20,
        Medium: 6,
        Low: 24,
      },
    },
    {
      intent: "Farming_related",
      relevance: {
        High: 1218,
        Medium: 278,
        Low: 291,
      },
    },
    {
      intent: "Unclear",
      relevance: {
        High: 27,
        Medium: 8,
        Low: 21,
      },
    },
    {
      intent: "Greeting",
      relevance: {
        High: 0,
        Medium: 0,
        Low: 0,
      },
    },
    {
      intent: "Referring_back",
      relevance: {
        High: 25,
        Medium: 3,
        Low: 9,
      },
    },
    {
      intent: "Exit",
      relevance: {
        High: 1,
        Medium: 0,
        Low: 4,
      },
    },
    {
      intent: "Disappointment",
      relevance: {
        High: 1,
        Medium: 0,
        Low: 0,
      },
    },
  ];
  const topicVsRelevanceData = [
    {
      topic: "Unknown",
      relevance: {
        "High Relevance": 74,
        "Medium Relevance": 17,
        "Low Relevance": 58,
      },
    },
    {
      topic: "Fertilizers",
      relevance: {
        "High Relevance": 127,
        "Medium Relevance": 25,
        "Low Relevance": 31,
      },
    },
    {
      topic: "Soil Management",
      relevance: {
        "High Relevance": 165,
        "Medium Relevance": 45,
        "Low Relevance": 31,
      },
    },
    {
      topic: "Not related to agriculture",
      relevance: {
        "High Relevance": 123,
        "Medium Relevance": 16,
        "Low Relevance": 37,
      },
    },
    {
      topic: "Harvesting",
      relevance: {
        "High Relevance": 36,
        "Medium Relevance": 4,
        "Low Relevance": 8,
      },
    },
    {
      topic: "Sowing",
      relevance: {
        "High Relevance": 101,
        "Medium Relevance": 20,
        "Low Relevance": 33,
      },
    },
    {
      topic: "Marketing",
      relevance: {
        "High Relevance": 98,
        "Medium Relevance": 29,
        "Low Relevance": 12,
      },
    },
    {
      topic: "Varieties",
      relevance: {
        "High Relevance": 145,
        "Medium Relevance": 48,
        "Low Relevance": 58,
      },
    },
    {
      topic: "Pests and Diseases",
      relevance: {
        "High Relevance": 361,
        "Medium Relevance": 75,
        "Low Relevance": 65,
      },
    },
    {
      topic: "Unclear",
      relevance: {
        "High Relevance": 35,
        "Medium Relevance": 12,
        "Low Relevance": 12,
      },
    },
    {
      topic: "Storage",
      relevance: {
        "High Relevance": 27,
        "Medium Relevance": 4,
        "Low Relevance": 4,
      },
    },
  ];
  const difficultyData = [
    {
      intent: "Farming_related",
      difficulty: {
        "Very Confusing": 35,
        Difficult: 192,
        Easy: 90,
        "Fairly Difficult": 183,
        "Fairly Easy": 89,
        Standard: 142,
        Undetermined: 2,
      },
    },
    {
      intent: "Greeting",
      difficulty: {
        "Very Confusing": 0,
        Difficult: 0,
        Easy: 0,
        "Fairly Difficult": 0,
        "Fairly Easy": 1,
        Standard: 0,
        Undetermined: 1,
      },
    },
    {
      intent: "Unclear",
      difficulty: {
        "Very Confusing": 1,
        Difficult: 1,
        Easy: 10,
        "Fairly Difficult": 3,
        "Fairly Easy": 5,
        Standard: 3,
        Undetermined: 8,
      },
    },
    {
      intent: "Referring_back",
      difficulty: {
        "Very Confusing": 2,
        Difficult: 4,
        Easy: 2,
        "Fairly Difficult": 4,
        "Fairly Easy": 3,
        Standard: 5,
        Undetermined: 0,
      },
    },
    {
      intent: "Change_crop",
      difficulty: {
        "Very Confusing": 0,
        Difficult: 1,
        Easy: 8,
        "Fairly Difficult": 2,
        "Fairly Easy": 7,
        Standard: 9,
        Undetermined: 0,
      },
    },
    {
      intent: "Exit",
      difficulty: {
        "Very Confusing": 0,
        Difficult: 0,
        Easy: 1,
        "Fairly Difficult": 0,
        "Fairly Easy": 2,
        Standard: 0,
        Undetermined: 0,
      },
    },
  ];

  const topicData = [
    {
      year: 2023,
      month: "November",
      Sowing: 171,
      Unclear: 118,
      Harvesting: 55,
      Marketing: 43,
      "Not related to agriculture": 292,
      Varieties: 238,
      Fertilizers: 297,
      "Soil Management": 126,
      "Pests and Diseases": 508,
      // "Pruning Techniques": 1,
      Other: 3,
      Storage: 10,
      // "1. Soil Management\n2. Soil Management\n3. Varieties": 1,
      // "1. Not related to agriculture\n2. Marketing": 1,
    },
    {
      year: 2023,
      month: "December",
      Unclear: 71,
      "Pests and Diseases": 260,
      Sowing: 79,
      Fertilizers: 140,
      Varieties: 106,
      "Not related to agriculture": 146,
      "Soil Management": 52,
      Harvesting: 43,
      Marketing: 57,
      Storage: 8,
      Other: 2,
      // "1. Unclear\n2. Not related to agriculture\n3. Not related to agriculture": 1,
      // "Pests and Diseases\nSoil Management\nMarketing": 1,
    },
    {
      year: 2024,
      month: "January",
      Fertilizers: 147,
      "Pests and Diseases": 298,
      Sowing: 176,
      "Soil Management": 111,
      "Not related to agriculture": 161,
      Harvesting: 51,
      Varieties: 166,
      Unclear: 93,
      Marketing: 79,
      Storage: 21,
      // "1. Fertilizers\n2. Varieties\n3. Sowing": 1,
      Other: 1,
    },
    {
      year: 2024,
      month: "February",
      Harvesting: 80,
      Unclear: 140,
      Varieties: 359,
      "Not related to agriculture": 438,
      "Pests and Diseases": 894,
      Sowing: 276,
      "Soil Management": 346,
      Fertilizers: 327,
      // Pruning: 2,
      Marketing: 379,
      Storage: 30,
      // "Pruning Techniques": 1,
      // "1) Soil Management\n2) Soil Management\n3) Soil Management": 1,
      Other: 4,
    },
    {
      year: 2024,
      month: "March",
      Varieties: 790,
      "Pests and Diseases": 1555,
      "Soil Management": 874,
      "Not related to agriculture": 566,
      Fertilizers: 488,
      Sowing: 368,
      Marketing: 643,
      Storage: 120,
      Unclear: 148,
      Harvesting: 115,
      // "Climate Change": 4,
      // Pruning: 1,
      // "Climate Impact": 1,
      Other: 5,
    },
    {
      year: 2024,
      month: "April",
      Varieties: 495,
      "Not related to agriculture": 345,
      Fertilizers: 564,
      Unclear: 101,
      "Soil Management": 513,
      "Pests and Diseases": 1098,
      Marketing: 287,
      Sowing: 289,
      Harvesting: 89,
      Storage: 60,
      // Pruning: 1,
      // Processing: 1,
      Other: 2,
    },
    {
      year: 2024,
      month: "May",
      Unclear: 35,
      "Not related to agriculture": 159,
      "Pests and Diseases": 418,
      Fertilizers: 114,
      "Soil Management": 140,
      Varieties: 153,
      Harvesting: 33,
      Marketing: 165,
      Sowing: 56,
      // Pruning: 1,
      Storage: 16,
      // "Climate Change": 1,
      Other: 2,
    },
  ];

  const denialOfService = [
    {
      year: 2023,
      month: "November",
      "Out Of Content": 495,
      "Out Of Context": 396,
      "Out of Collection": 170,
    },
    {
      year: 2023,
      month: "December",
      "Out Of Content": 276,
      "Out Of Context": 288,
      "Out of Collection": 132,
    },
    {
      year: 2024,
      month: "January",
      "Out Of Content": 223,
      "Out Of Context": 276,
      "Out of Collection": 138,
    },
    {
      year: 2024,
      month: "February",
      "Out Of Content": 1341,
      "Out Of Context": 462,
      "Out of Collection": 212,
    },
    {
      year: 2024,
      month: "March",
      "Out Of Content": 2171,
      "Out Of Context": 436,
      "Out of Collection": 219,
    },
    {
      year: 2024,
      month: "April",
      "Out Of Content": 1618,
      "Out Of Context": 271,
      "Out of Collection": 125,
    },
    {
      year: 2024,
      month: "May",
      "Out Of Content": 286,
      "Out Of Context": 94,
      "Out of Collection": 36,
    },
  ];

  const faithfulnessOverview = {
    "Low Faithfulness": 228,
    "High Faithfulness": 1540,
    "Medium Faithfulness": 172,
    // Undetermined: 548,
  };

  const heatmapData = [
    {
      year: 2023,
      month: "November",
      Sowing: 171,
      Unclear: 118,
      Harvesting: 55,
      Marketing: 43,
      "Not related to agriculture": 292,
      Varieties: 238,
      Fertilizers: 297,
      "Soil Management": 126,
      "Pests and Diseases": 508,
      // "Pruning Techniques": 1,
      Storage: 10,
      Others: 3,
      // "1. Soil Management\n2. Soil Management\n3. Varieties": 1,
      // "1. Not related to agriculture\n2. Marketing": 1,
    },
    {
      year: 2023,
      month: "December",
      Unclear: 71,
      "Pests and Diseases": 260,
      Sowing: 79,
      Fertilizers: 140,
      Varieties: 106,
      "Not related to agriculture": 146,
      "Soil Management": 52,
      Harvesting: 43,
      Marketing: 57,
      Storage: 8,
      Others: 2,
      // "1. Unclear\n2. Not related to agriculture\n3. Not related to agriculture": 1,
      // "Pests and Diseases\nSoil Management\nMarketing": 1,
    },
    {
      year: 2024,
      month: "January",
      Fertilizers: 147,
      "Pests and Diseases": 298,
      Sowing: 176,
      "Soil Management": 111,
      "Not related to agriculture": 161,
      Harvesting: 51,
      Varieties: 166,
      Unclear: 93,
      Marketing: 79,
      Storage: 21,
      Others: 1,
      // "1. Fertilizers\n2. Varieties\n3. Sowing": 1,
    },
    {
      year: 2024,
      month: "February",
      Harvesting: 80,
      Unclear: 140,
      Varieties: 359,
      "Not related to agriculture": 438,
      "Pests and Diseases": 894,
      Sowing: 276,
      "Soil Management": 346,
      Fertilizers: 327,
      // Pruning: 2,
      Marketing: 379,
      Storage: 30,
      Others: 4,
      // "Pruning Techniques": 1,
      // "1) Soil Management\n2) Soil Management\n3) Soil Management": 1,
    },
    {
      year: 2024,
      month: "March",
      Varieties: 790,
      "Pests and Diseases": 1555,
      "Soil Management": 874,
      "Not related to agriculture": 566,
      Fertilizers: 488,
      Sowing: 368,
      Marketing: 643,
      Storage: 120,
      Unclear: 148,
      Harvesting: 115,
      // "Climate Change": 4,
      Others: 6,
      // Pruning: 1,
      // "Climate Impact": 1,
    },
    {
      year: 2024,
      month: "April",
      Varieties: 495,
      "Not related to agriculture": 345,
      Fertilizers: 564,
      Unclear: 101,
      "Soil Management": 513,
      "Pests and Diseases": 1098,
      Marketing: 287,
      Sowing: 289,
      Harvesting: 89,
      Storage: 60,
      // Pruning: 1,
      // Processing: 1,
      Others: 2,
    },
    {
      year: 2024,
      month: "May",
      Unclear: 35,
      "Not related to agriculture": 159,
      "Pests and Diseases": 418,
      Fertilizers: 114,
      "Soil Management": 140,
      Varieties: 153,
      Harvesting: 33,
      Marketing: 165,
      Sowing: 56,
      // Pruning: 1,
      Storage: 16,
      Others: 2,
    },
  ];

  // console.log("farmingRelatedData", farmingRelatedData);

  return (
    <div className={`App ${darkTheme ? "dark" : "light"}`}>
      {/* <div>
        <h1>Firebase Google Authentication</h1>
        <AuthStatus />
        <SignIn />
        <SignOut />
      </div> */}

      <div class="theme-contianer">
        <img src="digitalgreen_logo.jpeg" />
        <span className="themeSpan">
          Theme:
          <Switch onClick={(e) => setDarkTheme(!darkTheme)} {...label} />{" "}
          {darkTheme ? (
            <DarkModeIcon />
          ) : (
            <Brightness4Icon style={{ color: "#bcc729" }} />
          )}
        </span>
      </div>
      <ResponseAnalysis darkTheme={darkTheme} />
      {/* section 3: Time series response analysis */}
      <div className="heading">
        <h1 className="title">Time Series Response Analysis:</h1>
      </div>
      <div className="chart-subtitle mlr-50">
        <p>
          In our ongoing efforts to enhance the chatbot's performance, we have
          closely monitored its ability to answer questions over time. An area
          chart tracking this performance from November to May provides valuable
          insights into how the bot's response capabilities have evolved.
        </p>
      </div>

      <div className="chart-container">
        <h1 className="chart-title">
          Answered & Unanswered Questions
          <HoverIcon
            hoverText={`This area graph shows the count of answered versus unanswered user questions over time.

Answered (Green): Represents answered questions, peaking around March 2024, indicating high engagement and effective responses.
Not Answered (Red): Represents unanswered questions, decreasing as the green area grows, suggesting improved response accuracy.
The timeline spans from November 2023 to May 2024, showing fluctuations in the number of questions and responses, helping track the chatbot's performance.`}
          />
          <p>
            Shows the count and percentage of answered vs unanswered user
            questions.
          </p>
        </h1>
        <div className="chart">
          <AnsweredChart data={answeredData} darkTheme={darkTheme} />
        </div>
      </div>
      <div className="chart-subtitle">
        <p>
          We've also analyzed the reasons for unanswered questions using an area
          graph from November to May. This graph tracks the trends in issues
          like "Out of Content," "Out of Context," and "Out of Collection" over
          time.
          <br />
          <br />
          <b>Out of Content:</b> This means that the necessary information to
          answer the question does not exist in the bot's database.
          <br />
          <b>Out of Context:</b> This indicates that the bot struggled to
          understand the user's query due to context issues, making it unable to
          provide a relevant answer.
          <br />
          <b>Out of Collection:</b> This refers to difficulties the bot faced in
          gathering or retrieving the necessary data to respond to the query.
        </p>
      </div>
      <div className="chart-container">
        <h1 className="chart-title">
          Unanswered
          <HoverIcon
            hoverText={`This area graph provides a detailed analysis of why the chatbot couldn't answer user questions, broken down into three categories:

Out Of Content (Green): Questions that couldn't be answered due to a lack of relevant content.
Out Of Context (Gray): Questions that were outside the context the chatbot could handle.
Out Of Collection (Maroon): Questions that were beyond the chatbot's knowledge base.
The timeline spans from November 2023 to May 2024, showing the fluctuation in unanswered questions, peaking around March 2024. This helps in identifying the main reasons for unanswered queries and areas for improvement.`}
          />
          <p>
            Detailed analysis of why the chatbot couldn't answer user questions.
          </p>
        </h1>
        <div className="chart">
          <DenialOfServiceChart data={denialOfService} />
        </div>
      </div>
      {/* section 4: Aggregate Prompt Analysis: */}
      <div className="heading">
        <h1 className="title">Time Series Prompt Analysis:</h1>
      </div>
      <div className="chart-subtitle">
        <p>
          Using advanced Language Learning Models (LLMs), we analyze user
          queries to determine their intent and visualize these trends in an
          area graph. Showing how different intents fluctuate month by month.
          This helps us understand what users are looking for over time,
          allowing us to adapt and improve the chatbot's responses to better
          meet their needs.
        </p>
      </div>
      <div className="chart-container">
        <h1 className="chart-title">
          Intent Classification{" "}
          <HoverIcon
            hoverText={`This area graph shows the trends of user intents over time, highlighting the purposes behind user interactions:

Farming_related (Green): The dominant intent, showing consistent high volume, peaking around March 2024.
Change_crop (Purple): Users asking about changing crops.
Referring_back (Brown): Users referring back to previous conversations.
Unclear (Blue): Ambiguous queries.
Greeting (Maroon): Simple greetings from users.
Exit (Tan): Users indicating they want to exit the conversation.
Disappointment (Teal): Users expressing dissatisfaction.
This graph spans from November 2023 to May 2024, providing insight into the changing trends and user needs over time.






`}
          />
          <p>
            Trends of user intents over time, showing the purposes behind user
            interactions{" "}
          </p>
        </h1>
        <div className="chart">
          <LineChart data={intentData} />
        </div>
      </div>
      <div className="chart-subtitle">
        <p>
          Here we focus on topics within the farming-related intent from
          November to May. By running advanced Language Learning Models (LLMs)
          on user queries specifically categorized under farming-related intent,
          we have identified and visualized these topics over time. This area
          graph reveals how different farming topics fluctuate month by month,
          providing insights into what specific aspects of farming users are
          most interested in at various times.
        </p>
      </div>
      <div className="chart-container">
        <h1 className="chart-title">
          Topic Classification Month-wise
          <HoverIcon
            hoverText={`This area graph shows the monthly distribution of topics discussed by users from November 2023 to May 2024. The graph highlights trends in user interactions, with notable peaks around March 2024. Key topics include pests and diseases, soil management, marketing, and more, reflecting users' varying interests and concerns over time.`}
          />
          <p>Monthly distribution of topics discussed by users.</p>
        </h1>
        <div className="chart">
          <TopicChart data={topicData} />
        </div>
      </div>
      <div className="chart-subtitle">
        <p>
          Our heat map graph provides a detailed look at the frequency of
          various topics over time, from November to May. By analyzing user
          queries, we can see which topics are asked most often during this
          period. The heat map uses color intensity to represent the count of
          queries related to each topic, making it easy to identify trends and
          patterns.
        </p>
      </div>
      <div className="chart-container">
        <h1 className="chart-title">
          Topic Count Month Wise
          <HoverIcon
            hoverText={`This heatmap shows the monthly distribution of topics discussed by users from November 2023 to May 2024. The intensity of the color represents the frequency of discussions on each topic.

            Pests and Diseases: Most discussed topic, especially in February and March.
            Soil Management: High discussion levels in the early months of 2024.
            Fertilizers, Varieties, Marketing: Steady interest throughout the period.
            The heatmap helps identify which topics are most frequently discussed each month, highlighting user interests and concerns.`}
          />{" "}
        </h1>
        <div className="chart">
          <Heatmap data={heatmapData} />
        </div>
      </div>

      {/* section 5: Time series FEEDBACK analysis */}
      <div className="heading">
        <h1 className="title">Time Series Feedback Analysis</h1>
      </div>
      <div className="chart-subtitle">
        <p>
          We have also been monitoring user feedback over time, from November to
          May, using an area graph to display trends in both positive and
          negative feedback. This area graph allows us to visualize how user
          satisfaction has fluctuated month by month.
          <br />
          By analyzing these trends, we can identify specific periods where
          changes or updates had a significant impact on user satisfaction. This
          helps us understand the effectiveness of our enhancements and guides
          us in making further improvements.
        </p>
      </div>
      <div className="chart-container">
        <h1 className="chart-title">
          Feedback Classification
          <HoverIcon
            hoverText={`This area graph shows the classification of user feedback into positive and negative over time, from November 2023 to May 2024.

Good Feedback (Green): Represents positive feedback, which peaks around March 2024, indicating a period of high user satisfaction.
Bad Feedback (Red): Represents negative feedback, which also increases during the same period but is significantly less than the positive feedback.
Overall, the graph illustrates that positive feedback outweighs negative feedback throughout the timeline, indicating general user satisfaction.`}
          />
          <p>User feedback into positive and negative over time.</p>
        </h1>
        <div className="chart">
          <FeedbackChart data={feedbackData} />
        </div>
      </div>
      {/* section 6:Prompt - Response analysis */}

      <div className="heading">
        <h1 className="title">Prompt - Response analysis:</h1>
      </div>
      <div className="chart-subtitle">
        <p>
          Here we delving into prompt response analysis. We use user prompts to
          identify the topics and then analyze the type of responses the bot
          provides based on these topics. The responses are classified into
          three categories: High Faithful, Medium Faithful, and Low Faithful.
          Additionally, we evaluate the relevance of the responses, categorizing
          them into high, medium, and low relevance.
        </p>
      </div>
      <div className="chart-container">
        <div className="chart-main-container">
          <div className="chart-container">
            <div className="chart h550">
              <h1 className="chart-title m0">
                Topic - Faithfulness{" "}
                <p>
                  Shows faithfulness levels (high, medium, low) as percentages
                  across various agricultural topics.
                </p>
              </h1>
              <TopicVsFaithfulnessBarChart
                keys={[
                  "High Faithfulness",
                  "Low Faithfulness",
                  "Medium Faithfulness",
                ]}
                data={topicAndFaithfulnessData}
              />
              {/* <StackedBarChart data={topicAndFaithfulnessData} /> */}
              {/* <SimpleLineChart data={faithfulnessData} /> */}
            </div>
          </div>
          <div className="chart-container">
            <div className="chart h550">
              <h1 className="chart-title m0">
                Topic - Relevance{" "}
                <p>
                  Shows the relevance levels (high, medium, low) as percentages
                  across various agricultural topics.
                </p>
              </h1>
              <TopicVsRelevanceBarChart
                keys={["High Relevance", "Low Relevance", "Medium Relevance"]}
                data={topicVsRelevanceData}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="chart-subtitle">
        We perform a similar analysis focusing on user intent and response
        relevance. By analyzing user prompts, we determine the intent behind
        each query and evaluate how the bot's responses align with these
        intents. The responses are classified based on their relevance into
        high, medium, and low categories.
      </div>
      <div className="chart-container">
        <div className="chart-main-container">
          <div className="chart-container">
            <div className="chart h550">
              <h1 className="chart-title m0">
                Intent - Faithfulness{" "}
                <HoverIcon
                  hoverText={`This bar chart evaluates the chatbot's response accuracy across different query intents:

High (Green): Most responses are highly accurate.
Medium (Orange): Some responses are moderately accurate.
Low (Red): Few responses are inaccurate.
Overall, the chatbot performs well, with most intents showing high faithfulness. Some areas, like "Change_crop" and "Farming_related," need improvement.
`}
                />
                <p>Evaluates the accuracy of the chatbot's responses</p>
              </h1>
              <StackedBarChart data={faithfulnessData} />
              {/* <StackedBarChart data={topicAndFaithfulnessData} /> */}
              {/* <SimpleLineChart data={faithfulnessData} /> */}
            </div>
          </div>
          <div className="chart-container">
            <div className="chart h550">
              <h1 className="chart-title m0">
                Intent - Relevance{" "}
                <HoverIcon
                  hoverText={`This bar chart shows the relevance of the chatbot's responses:

High: Most responses are highly relevant.
Medium: Some responses are moderately relevant.
Low: Some responses are not relevant.
Overall, the chatbot generally provides relevant responses across different query typ`}
                />
                <p>
                  Assesses how relevant the chatbot's responses are to the
                  user's queries
                </p>
              </h1>
              <RelevanceStackedBarChart data={relevanceData} />
            </div>
          </div>
        </div>
      </div>
      {/* section 7:Prompt - feedback analysis */}
      <div className="heading">
        <h1 className="title">Prompt - Feedback analysis:</h1>
      </div>
      <div className="chart-subtitle">
        <p>
          We analyze user intent versus feedback over time. This visualization
          uses a stacked bar graph to show the distribution of good and bad
          feedback for different user intents on a monthly basis.By analyzing
          this data, we can identify patterns and correlations between user
          intents and the feedback received.
        </p>
      </div>
      <div className="chart-container">
        <div className="chart">
          <IntentFeedbackStackedBarChart
            setSimpleBarGraphData={setSimpleBarGraphData}
          />
          {/* <SimpleLineChart data={simpleBarGraphData} /> */}
        </div>
      </div>
      <div className="chart-subtitle">
        <p>
          We examine the relationship between specific topics and user feedback
          over time. This analysis is visualized using a stacked bar graph,
          where the x-axis represents the months from November to May. The bars
          are stacked to show the proportions of good and bad feedback for each
          topic. Users can select different topics from a dropdown menu to view
          the feedback trends and distributions for those specific topics.
        </p>
      </div>
      <div className="chart-container">
        <div className="chart">
          <TopicFeedbackStackedBarChart />
        </div>
      </div>

      {/* section 8:Response - feedback analysis */}
      <div className="heading">
        <h1 className="title">Response - Feedback analysis:</h1>
      </div>
      <div className="chart-subtitle">
        <p>
          We are analyzing the relationship between the accuracy of the bot's
          responses and user feedback over time. This is visualized using a
          stacked bar graph, where the x-axis represents the months from
          November to May. Users can select accuracy level from a dropdown menu
          High, Medium, and Low faithfulness and relevance.
        </p>
      </div>
      <div className="chart-container">
        <div className="chart">
          <ClassificationsStackedBarChart />
        </div>
      </div>
      <div className="chart-subtitle">
        <p>
          We are analyzing the relationship between the readability of the bot's
          responses and user feedback over time.
          <br />
          Users can select the readability level from a dropdown menu, with
          options including:
          <br />
          Easy, Standard, Fairly Easy, Fairly Difficult, Difficult, Very Easy,
          Very Confusing
        </p>
      </div>
      <div className="chart-container">
        <div className="chart">
          <DifficultyFeedbackStackedBarChart />
        </div>
      </div>
      <div className="chart-container">
        <div className="chart">
          <BarGraph data={chartBarGraphData} />
        </div>
      </div>

      {/* <div className="chart-container">
        <div className="chart">
          <DenialOfServiceFeedbackStackedBarChart />
        </div>
      </div> */}

      {/* < className="chart-container">
        <h1 className="chart-title">Feedback Classification</h1>
        <div className="chart">
          <ResponseChart data={responseData} />
        </div> */}
      {/* section 9:Prompt - response analysis */}
      <div className="heading">
        <h1 className="title">
          Prompt - Response - Feedback analysis{" "}
          <HoverIcon
            hoverText={`This Sankey diagram illustrates the flow from user prompts to response classifications and then to feedback. It shows how different types of user queries (prompts) are processed into various response categories (classification), and how these responses receive positive or negative feedback. This visualization helps in understanding the relationship between the quality of responses and user satisfaction.`}
          />
        </h1>
      </div>
      <div className="chart-container">
        {/* <h1 className="chart-title">
          Aggregate Prompt Responses User Feedback Analysis{" "}
          <p>
            {" "}
            Visualizes the flow from user prompts to response classifications
            and their corresponding feedback.
          </p>
        </h1>
        <h2 className="chart-description">
          Source: Kenya dataset, Coffee, 09 APR 2024 - 08 MAY 2024, Kenya{" "}
        </h2> */}
        <div className="chart">
          <SankeyChart data={sankyData} />
        </div>
      </div>
      <div className="chart-container">
        <h1 className="chart-title">
          Prompt - Feedback Analysis{" "}
          <HoverIcon
            hoverText={`This Sankey diagram illustrates how different user prompts lead to positive or negative feedback. The chart shows the flow from user queries, mainly "Farming_related" and "Change_crop," to the resulting feedback, categorized as good or bad. This visualization helps in understanding the effectiveness of responses based on user feedback.`}
          />
          <p>
            Illustrates how different user prompts lead to positive or negative
            feedback.
          </p>
        </h1>
        <div className="chart">
          <SankeyChart feedback={true} data={sankyFeedback} />
        </div>
      </div>
      {/* <div className="chart-container">
        <h1 className="chart-title">
          Aggregate Prompt-Based Feedback Analysis{" "}
          <p>
            Illustrates how different user prompts lead to positive or negative
            feedback.
          </p>
        </h1>
        <h2 className="chart-description">
          Source: Kenya dataset, Coffee, 09 APR 2024 - 08 MAY 2024, Kenya{" "}
        </h2>
        <div className="chart">
          <SankeyChart feedback={true} data={sankyFeedback} />
        </div>
      </div> */}
    </div>
  );
}

export default App;
