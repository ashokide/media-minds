const generatePieChartData = (data) => {
  const filteredData = data.filter((item) => item.percentage > 0);
  return [
    {
      name: "Investment by Platform",
      labels: filteredData.map(
        (item) => `${item.name}\n$${item.spend.toLocaleString()}\n`
      ),
      values: filteredData.map((item) => Math.round(item.percentage) / 100),
    },
  ];
};

let slide1 = (pptx, gptResponseData) => {
  let slide_1 = pptx.addSlide();

  slide_1.addText(
    `COMPREHENSIVE ANALYSIS OF ADVERTISING PERFORMANCE AND EFFICIENCY FOR ${gptResponseData.Quarter}`,
    { x: 0.3, y: 0.5, fontSize: 24, color: "EB3F43", bold: true }
  );

  // Starting Y position for text blocks
  let yPosition = 1.5;

  // Add investment data with reversed styles for keys and values
  slide_1.addText(`Investment:`, {
    x: 0.5,
    y: yPosition,
    fontSize: 12,
    color: "FF5733",
    underline: true,
    bold: true,
  });
  slide_1.addText(`$${gptResponseData.Total_Investment.toLocaleString()}`, {
    x: 0.6,
    y: yPosition + 0.3,
    fontSize: 20,
    color: "535354",
    bold: true,
  });
  // Move to next line

  slide_1.addText(`Page Views:`, {
    x: 2,
    y: yPosition,
    fontSize: 12,
    color: "FF5733",
    underline: true,
    bold: true,
  });
  slide_1.addText(`${gptResponseData.Total_Views.toLocaleString()}`, {
    x: 2.1,
    y: yPosition + 0.3,
    fontSize: 20,
    color: "535354",
    bold: true,
  });
  yPosition += 1; // Move to next line

  slide_1.addText(`CPPV:`, {
    x: 0.5,
    y: yPosition,
    fontSize: 12,
    color: "FF5733",
    underline: true,
    bold: true,
  });
  slide_1.addText(`$${gptResponseData.CPPV.toFixed(2)}`, {
    x: 0.6,
    y: yPosition + 0.3,
    fontSize: 20,
    color: "535354",
    bold: true,
  });

  slide_1.addText(`CPDA:`, {
    x: 2,
    y: yPosition,
    fontSize: 12,
    color: "FF5733",
    underline: true,
    bold: true,
  });
  slide_1.addText(`$${gptResponseData.CPDA.toFixed(2)}`, {
    x: 2.1,
    y: yPosition + 0.3,
    fontSize: 20,
    color: "535354",
    bold: true,
  });

  // Prepare data for the pie chart
  let investmentByPlatformData = Object.entries(
    gptResponseData.Investment_by_Platform
  ).map(([platform, data]) => ({
    name: platform,
    percentage: data.Percentage_of_Total_Investment,
    spend: data.Total_Spend,
  }));

  slide_1.addText("Investment By Platform", {
    x: 5.3,
    y: 1.3,
    fontSize: 12,
    color: "EB3F43",
    bold: true,
  });

  // Generate pie chart data
  const pieChartData = generatePieChartData(investmentByPlatformData);

  // Add pie chart to slide
  slide_1.addChart(pptx.ChartType.pie, pieChartData, {
    x: 4,
    y: 1.5,
    w: 5,
    h: 2.5,
    dataBorder: { pt: 1, color: "F1F1F1" },
    showLegend: true,
    legendPos: "l",
    dataLabelPosition: "outEnd",
    dataLabelFontSize: 10,
    dataLabelColor: "333333",
    dataLabelFontFace: "Arial",
    showValue: true,
    showLeaderLines: true,
    dataLabelFormatCode: "0%",
    chartColors: ["ED3F43", "56585A", "030303", "FFD2D2", "F58E8E"],
  });

  // Add a text box with a background and border for description
  slide_1.addText(gptResponseData.overall_insight, {
    x: 0.5,
    y: 4.1,
    w: 9,
    h: 1,
    fontSize: 11,
    color: "585C62",
    line: { color: "535354", width: 1 },
  });

  slide_1.addImage({
    path: "src/images/mediaminds-logo.png",
    x: 9.2,
    y: 5.2,
    w: 0.5,
    h: 0.25,
  });
};

module.exports = { slide1 };
