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

const ResponseAnalysis = ({ darkTheme }) => {
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
    Difficult: 5340,
    "Fairly Difficult": 5002,
    Standard: 4782,
    "Fairly Easy": 2372,
    Easy: 2139,
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
  const answeredUnanswered = {
    Answered: 15867,
    "Not answered": 5350,
  };
  const answeredUnansweredColor = {
    Answered: "rgb(44, 160, 44)",
    "Not answered": "#d62728",
  };

  const totalDenialOfService = {
    "Out Of Content": 6410,
    "Out Of Context": 2223,
    "Out of Collection": 1032,
  };

  const gtransBleuScore = {
    "Quality often better than human": 2,
    "Very high quality, adequate, and fluent translations": 9,
    "High quality translations": 317,
    "Understandable to good translations": 1359,
    "The gist is clear, but has significant grammatical errors": 312,
    "Hard to get the gist": 40,
    "Almost useless": 34,
  };

  const mbartBleuScore = {
    "Quality often better than human": 1,
    "Very high quality, adequate, and fluent translations": 2,
    "High quality translations": 119,
    "Understandable to good translations": 925,
    "The gist is clear, but has significant grammatical errors": 784,
    "Hard to get the gist": 189,
    "Almost useless": 53,
  };
  const fsm4tv2BleuScore = {
    "Very high quality, adequate, and fluent translations": 2,
    "High quality translations": 21,
    "Understandable to good translations": 126,
    "The gist is clear, but has significant grammatical errors": 186,
    "Hard to get the gist": 82,
    "Almost useless": 32,
  };

  const bhashiniBleuScore = {
    "High quality translations": 323,
    "Understandable to good translations": 1458,
    "The gist is clear, but has significant grammatical errors": 221,
    "Almost useless": 29,
    "Hard to get the gist": 42,
  };
  const bleuScoreColors = {
    "The gist is clear, but has significant grammatical errors": "#FF4500", // around 20-29, corresponding to a reddish color
    "High quality translations": "#32CD32", // around 40-50, corresponding to a greenish color
    "Understandable to good translations": "#74871B", // around 30-40, corresponding to a yellowish color
    "Hard to get the gist": "#FF6347", // around 10-19, corresponding to an orange color
    "Almost useless": "#FF0000", // below 10, corresponding to a red color
    "Very high quality, adequate, and fluent translations": "#008000", // around 50-60, corresponding to a green color
  };

  return (
    <div className={`response-analysis ${darkTheme ? "dark" : ""}`}>
      <h1 className={` ${darkTheme ? "dark" : ""}`}>Analysis Overview </h1>
      <div className={`overview-section ${darkTheme ? "dark" : ""}`}>
        <div className={`card ${darkTheme ? "darkCard" : ""}`}>
          {/* section 1: Aggregate Response Analysis: */}
          <h2>Aggregate Response Analysis:</h2>
          <p>
            These are overall analysis of the responses from NOV 2024 - MAY
            2024.
          </p>
          <h2 className="subtitle">Accuracy scores:</h2>
          <div className="subtitle">
            <p>
              RAG is retrieval augmented generation. It has two parts retrieval
              which fins the relevant text snippets (chunks) from all the
              documents for a given query. And generation, which generates
              answers for a given query based on the retrieved text snippets
              (chunks).
              <br />
              The results below are for end to end RAG and are measured in terms
              of faithfulness and relevance as defined below.
            </p>
          </div>
          <div className="metrics">
            <div className={`metric ${darkTheme ? "dark-metric" : ""}`}>
              <span className="title">RAG Accuracy (overall)</span>

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
            <div className={`metric ${darkTheme ? "dark-metric" : ""}`}>
              <span className="title">Faithfulness</span>
              <span>
                For every response, a set of factual statements are generated
                which can be established. Each statement is measured against the
                passed context (text snippets or chunks form the documents). For
                Example: If 3 out of 4 factual statements given by the chatbot
                are correct, the score would be 75%.
              </span>
            </div>
            <div className={`metric ${darkTheme ? "dark-metric" : ""}`}>
              <span className="title">Completely Faithful</span>
              <span>
                This is the measure of how many responses have 100 %
                faitfhulness score. That is, the answers don’t establish any
                factual statement that is not based on the passed context
              </span>
            </div>
            <div className={`metric ${darkTheme ? "dark-metric" : ""}`}>
              <span className="title">Relevance</span>
              <span>
                For every response, a set of factual statements are generated
                which can be established. Each statement is analysed if it is
                relevant for the question asked. For Example: If 6 out of 8
                responses are mostly relevant to the questions asked, the score
                would be 75%.
              </span>
            </div>
            <div className={`metric ${darkTheme ? "dark-metric" : ""}`}>
              <span className="title">Complete Relevant</span>
              <span>
                This is the measure of how many responses are completely
                relevant to the query. A completely relevant response directly
                answers the question without adding unrelated information or
                omitting necessary details.
              </span>
            </div>
          </div>
          <div className="subtitle-text">
            <p>
              Further, in the plots below the faithfulness and relevance scores
              are classified as high, medium, low. High corresponds to 70-100 %,
              Medium corresponds to 30-70 %, Low corresponds to 0-30 %.
            </p>
          </div>
          <div className="pie-charts">
            <div className={`pie-chart ${darkTheme ? "dark-pie-chart" : ""}`}>
              <h3>
                Accuracy: Faithfulness Distribution
                <IconButton
                  hoverText={`This pie chart titled "Accuracy: Faithfulness Distribution" visually represents the reliability of the answers provided by a chatbot. The chart is divided into three sections:

                High Faithfulness: The largest section indicates that the chatbot provides correct and reliable answers most of the time.
                
                Medium Faithfulness: A smaller section represents instances where the chatbot's answers are somewhat reliable but may require some verification or further clarification.
                
                Low Faithfulness: The smallest section signifies the instances where the chatbot's answers are not reliable or correct.
                
                Overall, the chart demonstrates that the chatbot is predominantly accurate and reliable, with a significant portion of its responses falling into the high faithfulness category.`}
                />
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
            <div className={`pie-chart ${darkTheme ? "dark-pie-chart" : ""}`}>
              <h3>
                Accuracy: Relevance Distribution
                <IconButton
                  hoverText={`This pie chart titled "Accuracy: Relevance Distribution" shows how relevant the chatbot's responses are to user questions:

High Relevance: The largest segment, indicating most responses are directly related to the questions.
Medium Relevance: A smaller segment, where responses are somewhat related but may need more interpretation.
Low Relevance: The smallest segment, where responses are not relevant to the questions.
Overall, the chatbot mostly provides highly relevant answers, enhancing user satisfaction.






`}
                />
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
          </div>
          <div className="subtitle">
            <h2>Translation accuracy:</h2>
            <p>
              BLEU score measures between a gold standard, which is obtained
              from the human translation. It is a measure of how well the humans
              can understand the translation. We have taken machine-generated
              translations of 2000 questions and responses and compared them
              with human translations.
            </p>
            <div className="model-explain">
              <div>
                <h3>Bleu Score Interpretation:</h3>
                <img className="blue-score-img" src="bleu-score.png" />
              </div>
              <span>
                <h3>
                  We have run tests on three different models for translations:
                </h3>
                <div className="flex ">
                  <div className={`metric ${darkTheme ? "dark-metric" : ""}`}>
                    <span className="title">mBART</span>
                    <span>
                      The mBART model is a powerful translator that learns from
                      many languages at once, allowing it to translate text
                      accurately, even for languages it hasn't seen before.
                    </span>
                  </div>
                  <div className={`metric ${darkTheme ? "dark-metric" : ""}`}>
                    <span className="title">Google Translater</span>
                    <span>
                      The Google Translater is Google’s well-known translation
                      tool that uses neural machine translation to support
                      numerous languages, providing generally accurate and
                      understandable translations.
                    </span>
                  </div>
                  <div className={`metric ${darkTheme ? "dark-metric" : ""}`}>
                    <span className="title"> FSM4T V2 </span>
                    <span>
                      The Facebook / seamless m4t (FSM4T) v2 model is designed
                      to produce high-quality and fluent translations by
                      utilizing advanced machine learning techniques for better
                      grammatical accuracy.
                    </span>
                  </div>
                  <div className={`metric ${darkTheme ? "dark-metric" : ""}`}>
                    <span className="title"> Bhashini </span>
                    <span>
                      The Bhashini language model bridges language barriers in
                      India using AI for seamless translations and
                      transcriptions, enhancing accessibility across diverse
                      languages.
                    </span>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div className="pie-charts">
            <div className={`pie-chart ${darkTheme ? "dark-pie-chart" : ""}`}>
              <h3>
                mBART
                <p></p>
              </h3>

              <InteractivePieChart
                colorSchema={bleuScoreColors}
                data={mbartBleuScore}
              />
            </div>
            <div className={`pie-chart ${darkTheme ? "dark-pie-chart" : ""}`}>
              <h3>
                Google Translater
                <p></p>
              </h3>

              <InteractivePieChart
                colorSchema={bleuScoreColors}
                data={gtransBleuScore}
              />
            </div>
            <div className={`pie-chart ${darkTheme ? "dark-pie-chart" : ""}`}>
              <h3>
                Facebook / Seamless m4t (FSM4T) v2
                <p></p>
              </h3>

              <InteractivePieChart
                colorSchema={bleuScoreColors}
                data={fsm4tv2BleuScore}
              />
            </div>
            <div className={`pie-chart ${darkTheme ? "dark-pie-chart" : ""}`}>
              <h3>
                Bhashini
                <p></p>
              </h3>

              <InteractivePieChart
                colorSchema={bleuScoreColors}
                data={bhashiniBleuScore}
              />
            </div>
          </div>
          <div className="subtitle">
            <h2>Readability score:</h2>
            <p>
              Using the ML library, we analyze all the English responses before
              translation in terms of their complexity in understanding. This is
              for the entire data. These are characterized as:
            </p>
          </div>
          <div className="pie-charts">
            <div className={`pie-chart ${darkTheme ? "dark-pie-chart" : ""}`}>
              <h3>
                Readability Distribution
                <IconButton
                  hoverText={`This pie chart titled "Readability Distribution" shows how easy it is to understand the chatbot's responses:

Very Confusing: Hard to understand.
Fairly Difficult: Somewhat challenging to understand.
Difficult: Harder to understand.
Standard: Clear and understandable.
Fairly Easy: Mostly easy to understand.
Easy: Simple and easy to understand.
Very Easy: Extremely easy to understand.
The chart highlights the chatbot's effectiveness in communicating clearly.`}
                />
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
        </div>
        <div className={`card ${darkTheme ? "darkCard" : ""}`}>
          {/* section 2: Aggregate Prompt Analysis: */}
          <div className="subtitle">
            <h2>Aggregate Prompt Analysis:</h2>
            <p>
              {/* By leveraging advanced Language Learning Models (LLMs), we analyze
              each user query to accurately determine the underlying intent.
              This visualization provides insights into what users are primarily
              seeking when they interact with the bot. */}
              By leveraging a Large Language Model (LLM) to analyze user queries
              and extract key metrics. The analysis includes identifying the
              primary intents behind user questions, categorizing the most
              frequently discussed farming-related topics, determining the
              proportion of answered versus unanswered queries, and
              understanding the reasons behind any unanswered questions. These
              insights are visualized using pie charts to provide a clear and
              comprehensive overview of user interactions and the chatbot's
              performance.
            </p>
          </div>

          <div className="pie-charts-flex">
            <div>
              <div className={`pie-chart ${darkTheme ? "dark-pie-chart" : ""}`}>
                <h3>
                  User Query Intent
                  <IconButton
                    hoverText={`This pie chart illustrates the main topics or purposes behind users' questions:

Farming_related: The majority of user queries, focusing on various aspects of farming.
Change_crop: Queries about changing crops, indicating a need for guidance on crop rotation or new crop types.
Unclear: Ambiguous or unclear queries, suggesting areas where the chatbot could improve in understanding user intent.
Referring_back: Users referencing previous conversations, showing the importance of continuity in interactions.
Greeting: Simple greetings, reflecting user engagement and initial interaction.
Exit: Users indicating they want to exit the conversation.
Disappointment: Expressing dissatisfaction, highlighting areas for chatbot improvement.
This distribution helps understand the primary reasons users interact with the chatbot and identifies areas for enhancing the chatbot's responses and user experience.`}
                  />
                  <p>Main topics or purposes behind users' questions.</p>
                </h3>

                <InteractivePieChart data={intentOverview} />
              </div>
              <div className="pie-left-text">
                <p>
                  By leveraging advanced Language Learning Models (LLMs), we
                  analyze each user query to accurately determine the underlying
                  intent. This visualization provides insights into what users
                  are primarily seeking when they interact with the bot.
                </p>
              </div>
            </div>
            <div>
              <div className="pie-left-text">
                <p>
                  Utilizing advanced Language Learning Models (LLMs), we have
                  analyzed the entire dataset to accurately categorize and
                  understand topics within the farming-related queries submitted
                  to our bot. This visualization offers valuable insights into
                  the detailed aspects of farming that users are most interested
                  in.
                </p>
              </div>
              <div className={`pie-chart ${darkTheme ? "dark-pie-chart" : ""}`}>
                <h3>
                  Topic Distribution
                  <IconButton
                    hoverText={`This pie chart shows the distribution of common topics in user interactions, highlighting the variety of subjects users inquire about.
                  
                  Sowing: Questions about planting seeds.
                  Unclear: Ambiguous questions.
                  Harvesting: Inquiries about collecting crops.
                  Marketing: Queries related to selling agricultural products.
Not related to agriculture: Questions unrelated to farming.
Varieties: Questions about different crop types.
Fertilizers: Inquiries about using fertilizers.
Soil Management: Questions about maintaining soil health.
Pests and Diseases: Inquiries about pest and disease management.
Pruning Techniques: Questions about pruning plants.
Storage: Queries about storing crops.
Pruning: General pruning questions.
Others: Miscellaneous topics.
Climate Change: Questions about climate change.
Climate Impact: Inquiries about the impact of climate on farming.`}
                  />
                  <p>Distribution of common topics in user interactions.</p>
                </h3>

                <InteractivePieChart data={topicOverview} />
              </div>
            </div>
            <div>
              <div className={`pie-chart ${darkTheme ? "dark-pie-chart" : ""}`}>
                <h3>
                  Answered & Unanswered
                  <p>No. of questions were answered and unanswered</p>
                </h3>

                <InteractivePieChart
                  colorSchema={answeredUnansweredColor}
                  data={answeredUnanswered}
                />
              </div>
              <div className="pie-left-text">
                <p>
                  This pie chart illustrates the distribution of total answered
                  and unanswered questions handled by our bot. By analyzing user
                  interactions, we can determine how effectively the bot
                  responds to user queries.
                </p>
              </div>
            </div>
            <div>
              <div className="pie-left-text">
                <p>
                  As we analyze our bot's performance, we've identified key
                  reasons for unanswered questions using advanced Language
                  Learning Models (LLMs). The main issues are a lack of relevant
                  information (Out of Content), difficulties in understanding
                  the query context (Context Issues), and problems with data
                  retrieval (Collection Problems). To address these, we plan to
                  expand our content database, enhance context recognition, and
                  optimize data collection. These improvements aim to reduce
                  unanswered questions and improve user satisfaction. In the
                  coming months, users can expect updates focused on these
                  areas, enhancing the bot's responsiveness and reliability.
                  Stay tuned for these exciting developments.
                </p>
              </div>
              <div className={`pie-chart ${darkTheme ? "dark-pie-chart" : ""}`}>
                <h3>
                  Unanswered
                  <p>
                    Reasons for unanswered questions: Out of Content, Context,
                    Collection.
                  </p>
                </h3>

                <InteractivePieChart
                  // colorSchema={answeredUnansweredColor}
                  data={totalDenialOfService}
                />
              </div>
            </div>
          </div>
          <div className="chart-container word-chart-container">
            <h3 className="chart-title">
              Topic Classifications
              <IconButton
                hoverText={`This bubble chart visualizes the most discussed topics in user interactions, with the size of each bubble indicating the frequency of discussions on each topic.

Pests and Diseases: The largest bubble, showing this is the most frequently discussed topic.
Soil Management: A significant topic, indicating many users have questions about soil health.
Marketing: Another major topic, reflecting concerns about selling agricultural products.
Storage: Queries about storing crops are also common.
Fertilizers: Users frequently inquire about the use of fertilizers.
Varieties: Discussions about different crop varieties.
Sowing: Questions related to planting seeds.
Others: Miscellaneous topics that don't fit into the other categories.
Unclear: Ambiguous or unclear queries.
Harvesting: Inquiries about collecting crops.
Not related to agriculture: Questions unrelated to farming.
The chart helps identify the key areas of interest and concern among users.`}
              />
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
        </div>
      </div>
    </div>
  );
};

export default ResponseAnalysis;
