const axios = require("axios");
const socialMediaData = require("./data/ads-api-mock.json");
const PptxGenJS = require("pptxgenjs");
const { masterSlide } = require("./slides/masterSlide");
const { platformInfoSlide } = require("./slides/platformInfoSlide");
const { slide_3 } = require("./slides/bestPerformingAds-Slide3");
const { slide1 } = require("./slides/slide1");
const { impSlide1 } = require("./slides/impSlide1");
const { impSlide2 } = require("./slides/impSlide2");
const { impSlide3 } = require("./slides/impSlide3");
const { endSlide } = require("./slides/endSlide");
const readJSONData = () => {
  return socialMediaData;
};

const askGPT = async (prompt) => {
  prompt = prompt || "no prompt given, bye.";
  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.GPT4V_KEY,
  };
  const payload = {
    messages: [
      {
        role: "system",
        content: "You are ChatGPT, a large language model trained by OpenAI.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0,
    top_p: 0,
    max_tokens: 4000,
  };
  try {
    const response = await axios.post(process.env.GPT4V_ENDPOINT, payload, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return "Failed to make the request. Error : " + error;
  }
};

const generatePresentation = async (gptResponse, startDate, endDate) => {
  const pptx = new PptxGenJS();
  const jsonResponse = gptResponse.replace(/```json|```/g, "").trim();
  const data = JSON.parse(jsonResponse);
  masterSlide(pptx, data);
  impSlide1(pptx, data);
  slide1(pptx, data);
  impSlide2(pptx, data);
  platformInfoSlide(data, pptx, readJSONData(), startDate, endDate);
  impSlide3(pptx, data);
  slide_3(pptx, data);
  endSlide(pptx);

  return await pptx;
};

function getLastQuarterDates() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let startMonth, endMonth, startYear, endYear;

  if (currentMonth >= 0 && currentMonth <= 2) {
    // Q1 (Jan-Mar)
    startMonth = 9; // October
    endMonth = 11; // December
    startYear = currentYear - 1;
    endYear = currentYear - 1;
  } else if (currentMonth >= 3 && currentMonth <= 5) {
    // Q2 (Apr-Jun)
    startMonth = 0; // January
    endMonth = 2; // March
    startYear = currentYear;
    endYear = currentYear;
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    // Q3 (Jul-Sep)
    startMonth = 3; // April
    endMonth = 5; // June
    startYear = currentYear;
    endYear = currentYear;
  } else {
    // Q4 (Oct-Dec)
    startMonth = 6; // July
    endMonth = 8; // September
    startYear = currentYear;
    endYear = currentYear;
  }

  const startDate = new Date(startYear, startMonth, 1);
  const endDate = new Date(endYear, endMonth + 1, 0); // Last day of the end month

  return { startDate, endDate };
}

function getLastMonthDates() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let startMonth, endMonth, year;

  if (currentMonth === 0) {
    // If the current month is January
    startMonth = 11; // December of the previous year
    endMonth = 11;
    year = currentYear - 1;
  } else {
    startMonth = currentMonth - 1;
    endMonth = currentMonth - 1;
    year = currentYear;
  }

  const startDate = new Date(year, startMonth, 1);
  const endDate = new Date(year, endMonth + 1, 0); // Last day of the end month

  return { startDate, endDate };
}

module.exports = {
  readJSONData,
  askGPT,
  generatePresentation,
  getLastQuarterDates,
  getLastMonthDates,
};
