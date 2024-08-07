function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

let platformInfoSlide = (data, pptx, adData, startDate, endDate) => {
  let slide = pptx.addSlide();
  let actualReturns = [];
  slide.addText(
    `${data.overall_engagement.platform_name.toUpperCase()} DROVE LION'S SHARE OF THE ENGAGEMENTS`,
    { x: 0.3, y: 0.5, fontSize: 24, color: "EB3F43", bold: true }
  );

  // Table Data
  //Row configs
  const tableData = [];
  const platformNames = Object.keys(data.platform_insights);
  let headerRow = [
    "Platform",
    "Pillar",
    "Spend",
    "CPPV",
    "Actual",
    "Digital Activities",
    "CPDA",
  ];
  headerRow = headerRow.map((row) => {
    return {
      text: row,
      options: { fill: { color: "ED3F43" }, color: "ffffff" },
    };
  });
  tableData.push(headerRow);

  let totalSpend = 0;
  let totalReturn = 0;
  let totalDa = 0;
  let totalCpda = 0;

  platformNames.forEach((platform) => {
    let totalPlatformSpend = 0;
    let totalPlatformReturn = 0;
    let totalPlatformDa = 0;
    let totalPlatformCpda = 0;
    const platformData = data.platform_insights[platform];
    if (platformData && platformData.pillar_insight) {
      let platformRowAdded = false;
      Object.keys(platformData.pillar_insight).forEach((pillarId) => {
        const pillarData = platformData.pillar_insight[pillarId];
        totalPlatformSpend += pillarData.pillar_spend;
        totalPlatformReturn += pillarData.pillar_actualReturn * 100;
        totalPlatformDa += pillarData.pillarDa;
        totalPlatformCpda += pillarData.pillarCpda;
        tableData.push([
          platformRowAdded ? "" : platform, // Only add platform name for the first row
          pillarData.pillar_name || "",
          `$${pillarData.pillar_spend || 0}`,
          `$${pillarData.pillar_cppv.toFixed(3) || 0}`,
          Math.round(pillarData.pillar_actualReturn * 100) || 0,
          pillarData.pillarDa || 0,
          `$${pillarData.pillarCpda.toFixed(3) || 0}`,
        ]);
        platformRowAdded = true;
      });
      actualReturns.push(totalPlatformReturn);
      // Add total row for each platform
      let totalRow = [
        "",
        "Total",
        `$${totalPlatformSpend || 0}`,
        `$${platformData.platformCppv.toFixed(3) || 0}`,
        Math.round(totalPlatformReturn) || 0,
        totalPlatformDa || 0,
        `$${totalPlatformCpda.toFixed(3) || 0}`,
      ];
      totalRow = totalRow.map((row) => {
        return {
          text: row,
          options: { fill: { color: "#fbe7e9" }, bold: true },
        };
      });
      if (totalPlatformSpend) {
        tableData.push(totalRow);
      }
    }
    totalSpend += totalPlatformSpend;
    totalReturn += totalPlatformReturn;
    totalDa += totalPlatformDa;
    totalCpda += totalPlatformCpda;
  });

  // Add Grand Total Row
  let grandTotalRow = [
    "Total",
    "",
    `$${totalSpend || 0}`,
    `$${data.CPPV.toFixed(3) || 0}`,
    Math.round(totalReturn) || 0,
    totalDa || 0,
    `$${totalCpda.toFixed(3) || 0}`,
  ];
  grandTotalRow = grandTotalRow.map((row) => {
    return {
      text: row,
      options: { fill: { color: "ED3F43" }, color: "ffffff", bold: true },
    };
  });
  tableData.push(grandTotalRow);

  // Add Table to Slide
  slide.addTable(tableData, {
    x: 0.3,
    y: 1.0,
    w: 5.8,
    h: 4.3,
    fontSize: 7.2,
    border: { pt: 1, color: "ED3F43" },
    fill: "F5F5F5",
  });

  let chartData = [
    {
      labels: platformNames,
      values: actualReturns,
    },
  ];
  slide.addChart(pptx.ChartType.bar, chartData, {
    x: 6.3,
    y: 1,
    w: 3.3,
    h: 2,
    chartColors: ["#eb2121"],
    barDir: "bar",

    catAxisLabelFontFace: "Helvetica Neue",
    catAxisLabelFontSize: 6,
    catAxisOrientation: "maxMin",
    catAxisMajorTickMark: "in",
    catAxisMinorTickMark: "cross",

    valAxisMajorTickMark: "cross",
    valAxisMinorTickMark: "out",
    valAxisLabelFontSize: 6,
    catGridLine: { style: "none" },
    valGridLine: { style: "none" },
  });
  slide.addText(data.overall_engagement.description, {
    x: 6.3,
    y: 3.1,
    w: 3.3,
    h: 1.9,
    fontSize: 11,
    color: "585C62",
    line: { color: "535354", width: 1 },
  });
  slide.addImage({
    path: "src/images/mediaminds-logo.png",
    x: 9.2,
    y: 5.2,
    w: 0.5,
    h: 0.25,
  });
};

module.exports = {
  platformInfoSlide,
};
