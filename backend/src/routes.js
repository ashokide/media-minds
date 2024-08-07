const express = require("express");
const {
  askGPT,
  readJSONData,
  generatePresentation,
  getLastQuarterDates,
  getLastMonthDates,
} = require("./utils");
const { getSlideData } = require("./constants");

const router = express.Router();

router.get("/data", (req, res) => {
  const socialMediaData = utils.readJSONData();
  res.json({
    data: socialMediaData ? socialMediaData : "No data found",
  });
});

router.get("/generate-presentation/:timeRange", async (req, res) => {
  const timeRange = req.params.timeRange;
  let { startDate, endDate } = req.query;
  let timeRangePrompt = "";
  switch (timeRange) {
    case "last_month":
      ({ startDate, endDate } = getLastMonthDates());
      break;
    case "last_quarter":
      ({ startDate, endDate } = getLastQuarterDates());

      break;
    case "custom_range":
      if (!(startDate && endDate)) {
        res
          .status(400)
          .write("Custom range requires 'start' and 'end' query parameters.");
        res.end();
      }
      break;
    default:
      res.status(400).write("Invalid Input");
      res.end();
  }

  const modifiedPrompt = getSlideData(
    JSON.stringify(readJSONData()),
    startDate,
    endDate
  );

  let gptResponse = await askGPT(modifiedPrompt);
  gptResponse = await gptResponse?.choices[0]?.message?.content;
  const fileName = "Ad-Performance.pptx";
  const generatedPresentation = await generatePresentation(
    gptResponse,
    startDate,
    endDate
  );
  await generatedPresentation
    .stream()
    .then((data) => {
      res.writeHead(200, {
        "Content-disposition": "attachment;filename=" + fileName,
        "Content-Length": data.length,
      });
      res.end(new Buffer(data, "binary"));
    })
    .catch((err) => {
      res
        .status(400)
        .write("Something went wrong in preparing presentation. Error: " + err);
      res.end();
    });
});

module.exports = router;
