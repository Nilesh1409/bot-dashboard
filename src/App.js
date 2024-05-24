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
      Answered: 1466,
      "Not answered": 863,
    },
    {
      year: 2023,
      month: "December",
      Answered: 756,
      "Not answered": 553,
    },
    {
      year: 2024,
      month: "January",
      Answered: 1163,
      "Not answered": 510,
    },
    {
      year: 2024,
      month: "February",
      Answered: 2031,
      "Not answered": 1873,
    },
    {
      year: 2024,
      month: "March",
      Answered: 3531,
      "Not answered": 2806,
    },
    {
      year: 2024,
      month: "April",
      Answered: 2240,
      "Not answered": 1994,
    },
    {
      year: 2024,
      month: "May",
      Answered: 1016,
      "Not answered": 415,
    },
  ];

  const wordData = {
    nodes: [
      { topic: "Climate Change", count: 5 },
      { topic: "Climate Impact", count: 1 },
      { topic: "Fertilizers", count: 2077 },
      { topic: "Harvesting", count: 466 },
      { topic: "Marketing", count: 1653 },
      { topic: "Not related to agriculture", count: 2107 },
      { topic: "Pests and Diseases", count: 5031 },
      { topic: "Pests and Diseases\nSoil Management\nMarketing", count: 1 },
      { topic: "Processing", count: 1 },
      { topic: "Pruning", count: 5 },
      { topic: "Pruning Techniques", count: 2 },
      { topic: "Soil Management", count: 2162 },
      { topic: "Sowing", count: 1415 },
      { topic: "Storage", count: 265 },
      { topic: "Unclear", count: 706 },
      { topic: "Varieties", count: 2307 },
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
      intent: "Farming_related",
      faithfulness: {
        High: 543,
        Medium: 34,
        Low: 33,
        // Undetermined: 123,
      },
    },
    {
      intent: "Greeting",
      faithfulness: {
        High: 1,
        Medium: 0,
        Low: 0,
        // Undetermined: 1,
      },
    },
    {
      intent: "Unclear",
      faithfulness: {
        High: 28,
        Medium: 0,
        Low: 0,
        // Undetermined: 3,
      },
    },
    {
      intent: "Referring_back",
      faithfulness: {
        High: 18,
        Medium: 1,
        Low: 0,
        // Undetermined: 1,
      },
    },
    {
      intent: "Change_crop",
      faithfulness: {
        High: 27,
        Medium: 0,
        Low: 0,
        // Undetermined: 0,
      },
    },
    {
      intent: "Exit",
      faithfulness: {
        High: 3,
        Medium: 0,
        Low: 0,
        // Undetermined: 0,
      },
    },
  ];

  const relevanceData = [
    {
      intent: "Farming_related",
      relevance: {
        High: 393,
        Medium: 91,
        Low: 73,
        // Undetermined: 176,
      },
    },
    {
      intent: "Greeting",
      relevance: {
        High: 0,
        Medium: 0,
        Low: 0,
        // Undetermined: 2,
      },
    },
    {
      intent: "Unclear",
      relevance: {
        High: 2,
        Medium: 2,
        Low: 0,
        // Undetermined: 27,
      },
    },
    {
      intent: "Referring_back",
      relevance: {
        High: 12,
        Medium: 3,
        Low: 2,
        // Undetermined: 3,
      },
    },
    {
      intent: "Change_crop",
      relevance: {
        High: 0,
        Medium: 0,
        Low: 0,
        // Undetermined: 27,
      },
    },
    {
      intent: "Exit",
      relevance: {
        High: 0,
        Medium: 0,
        Low: 0,
        // Undetermined: 3,
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
      "Pruning Techniques": 1,
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
      "1. Fertilizers\n2. Varieties\n3. Sowing": 1,
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
      Pruning: 2,
      Marketing: 379,
      Storage: 30,
      "Pruning Techniques": 1,
      "1) Soil Management\n2) Soil Management\n3) Soil Management": 1,
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
      "Climate Change": 4,
      Pruning: 1,
      "Climate Impact": 1,
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
      Pruning: 1,
      Processing: 1,
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
      Pruning: 1,
      Storage: 16,
      "Climate Change": 1,
    },
  ];

  const denialOfService = [
    {
      year: 2023,
      month: "November",
      "In Content": 1834,
      "Not In Content": 495,
      "In Context": 1933,
      "Out Of Context": 396,
      "In Collection": 2159,
      "Out of Collection": 170,
    },
    {
      year: 2023,
      month: "December",
      "In Content": 1033,
      "Not In Content": 276,
      "In Context": 1021,
      "Out Of Context": 288,
      "In Collection": 1177,
      "Out of Collection": 132,
    },
    {
      year: 2024,
      month: "January",
      "In Content": 1450,
      "Not In Content": 223,
      "In Context": 1397,
      "Out Of Context": 276,
      "In Collection": 1535,
      "Out of Collection": 138,
    },
    {
      year: 2024,
      month: "February",
      "In Content": 2563,
      "Not In Content": 1341,
      "In Context": 3442,
      "Out Of Context": 462,
      "In Collection": 3692,
      "Out of Collection": 212,
    },
    {
      year: 2024,
      month: "March",
      "In Content": 4166,
      "Not In Content": 2171,
      "In Context": 5901,
      "Out Of Context": 436,
      "In Collection": 6118,
      "Out of Collection": 219,
    },
    {
      year: 2024,
      month: "April",
      "In Content": 2616,
      "Not In Content": 1618,
      "In Context": 3963,
      "Out Of Context": 271,
      "In Collection": 4109,
      "Out of Collection": 125,
    },
    {
      year: 2024,
      month: "May",
      "In Content": 1145,
      "Not In Content": 286,
      "In Context": 1337,
      "Out Of Context": 94,
      "In Collection": 1395,
      "Out of Collection": 36,
    },
  ];

  // console.log("farmingRelatedData", farmingRelatedData);

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
      {/* <div>
        <h1>Sankey Diagram Example</h1>
        <SankeyDiagram />
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
        <h1 className="chart-title">
          Aggregate Prompt-Based Feedback Analysis{" "}
        </h1>
        <h2 className="chart-description">
          Source: Kenya dataset, Coffee, 09 APR 2024 - 08 MAY 2024, Kenya{" "}
        </h2>
        <div className="chart">
          <SankeyChart feedback={true} data={sankyFeedback} />
        </div>
      </div>
      <div className="chart-container">
        <h1 className="chart-title">
          Aggregate Prompt-Based Feedback Analysis{" "}
        </h1>
        <h2 className="chart-description">
          Source: Kenya dataset, Coffee, 09 APR 2024 - 08 MAY 2024, Kenya{" "}
        </h2>
        <div className="chart-main-container">
          <div className="chart-container">
            <div className="chart">
              <StackedBarChart data={faithfulnessData} />
            </div>
          </div>
          <div className="chart-container">
            {/* <h1 className="chart-title">
            Aggregate Prompt-Based Feedback Analysis{" "}
          </h1>
          <h2 className="chart-description">
            Source: Kenya dataset, Coffee, 09 APR 2024 - 08 MAY 2024, Kenya{" "}
          </h2> */}
            <div className="chart">
              <RelevanceStackedBarChart data={relevanceData} />
            </div>
          </div>
          <div className="chart-container">
            {/* <h1 className="chart-title">Difficulty </h1> */}
            {/* <h2 className="chart-description">
            Source: Kenya dataset, Coffee, 09 APR 2024 - 08 MAY 2024, Kenya{" "}
          </h2> */}
            {/* <div className="chart">
              <DifficultyStackedBarChart data={difficultyData} />
            </div> */}
          </div>
        </div>
      </div>

      <div className="chart-container">
        {/* <h1 className="chart-title">
            Aggregate Prompt-Based Feedback Analysis{" "}
          </h1>
          <h2 className="chart-description">
            Source: Kenya dataset, Coffee, 09 APR 2024 - 08 MAY 2024, Kenya{" "}
          </h2> */}
        <div className="chart">
          <IntentFeedbackStackedBarChart />
        </div>
      </div>
      <div className="chart-container">
        {/* <h1 className="chart-title">
            Aggregate Prompt-Based Feedback Analysis{" "}
          </h1>
          <h2 className="chart-description">
            Source: Kenya dataset, Coffee, 09 APR 2024 - 08 MAY 2024, Kenya{" "}
          </h2> */}
        <div className="chart">
          <ClassificationsStackedBarChart />
        </div>
      </div>
      <div className="chart-container">
        {/* <h1 className="chart-title">
            Aggregate Prompt-Based Feedback Analysis{" "}
          </h1>
          <h2 className="chart-description">
            Source: Kenya dataset, Coffee, 09 APR 2024 - 08 MAY 2024, Kenya{" "}
          </h2> */}
        <div className="chart">
          <DifficultyFeedbackStackedBarChart />
        </div>
      </div>

      <div className="chart-container">
        <h1 className="chart-title">Denial Of Service</h1>
        <div className="chart">
          <DenialOfServiceChart data={denialOfService} />
        </div>
      </div>

      <div className="chart-container">
        <h1 className="chart-title">Intent Classification</h1>
        <div className="chart">
          <LineChart data={intentData} />
        </div>
      </div>
      <div className="chart-container">
        <h1 className="chart-title">Answered & Unanswered Questions</h1>
        <div className="chart">
          <AnsweredChart data={answeredData} />
        </div>
      </div>
      <div className="chart-container">
        <h1 className="chart-title">Feedback Classification</h1>
        <div className="chart">
          <FeedbackChart data={feedbackData} />
        </div>
      </div>

      <div className="chart-container">
        <h1 className="chart-title">Topic Classification Month-wise</h1>
        <div className="chart">
          <TopicChart data={topicData} />
        </div>
      </div>

      {/* <div className="chart-container">
        <h1 className="chart-title">Feedback Classification</h1>
        <div className="chart">
          <ResponseChart data={responseData} />
        </div>
      </div> */}

      <div className="chart-container">
        <h1 className="chart-title">Topic Classifications </h1>
        <h2 className="chart-description">
          Source: Kenya dataset, Coffee, 01 NOV 2023 - 30 MAY 2024, Kenya{" "}
        </h2>
        <div className="chart">
          <BubbleGraph data={wordData} />
        </div>
      </div>
    </div>
  );
}

export default App;
