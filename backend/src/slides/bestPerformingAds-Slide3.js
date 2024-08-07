let slide_3 = (pptx, gptResponseData) => {
  let slide3 = pptx.addSlide();

  slide3.addText("AD CAMPAIGN STARS AND STRUGGLERS", {
    x: 0.3,
    y: 0.5,
    fontSize: 24,
    color: "EB3F43",
    bold: true,
  });

  slide3.addText("Highest Performing Campaign", {
    x: 0.5,
    y: 1,
    w: 3,
    h: 0.5,
    fontSize: 10,
    underline: true,
    bold: true,
    align: "center",
    color: "#D94E4A",
  });

  slide3.addText("Honorable Mention", {
    x: 3.5,
    y: 1,
    w: 3,
    h: 0.5,
    fontSize: 10,
    align: "center",
    underline: true,
    bold: true,
    color: "#D94E4A",
  });

  slide3.addText("Lowest Performing Campaign", {
    x: 6.5,
    y: 1,
    w: 3,
    h: 0.5,
    fontSize: 10,
    align: "center",
    underline: true,
    bold: true,
    color: "#D94E4A",
  });

  // Adding placeholder texts for the content
  slide3.addText(
    `What?\n\n• ${gptResponseData.highest_performing_campaign.what} \n\n\n\nWhy?\n\n• ${gptResponseData.highest_performing_campaign.why} `,
    {
      x: 0.5,
      y: 1.5,
      w: 1.5,
      h: 3.8,
      fontSize: 7.5,
      color: "000000",
      line: { color: "535354", width: 1 },
    }
  );

  slide3.addImage({
    path: `src/images/${gptResponseData.highest_performing_campaign.Campaign_id}.png`,
    x: 2.1,
    y: 2.5,
    w: 1.3,
    h: 2,
  });

  slide3.addText(
    `What?\n\n• ${gptResponseData.honorable_mention.what} \n\n\n\nWhy?\n\n• ${gptResponseData.honorable_mention.why} `,
    {
      x: 3.5,
      y: 1.5,
      w: 1.5,
      h: 3.8,
      fontSize: 7.5,
      color: "000000",
      line: { color: "535354", width: 1 },
    }
  );

  slide3.addImage({
    path: `src/images/${gptResponseData.honorable_mention.Campaign_id}.png`,
    x: 5.1,
    y: 2.5,
    w: 1.3,
    h: 2,
  });

  slide3.addText(
    `What?\n\n• ${gptResponseData.lowest_performing_campaign.what} \n\n\n\nWhy?\n\n• ${gptResponseData.lowest_performing_campaign.why} `,
    {
      x: 6.5,
      y: 1.5,
      w: 1.5,
      h: 3.8,
      fontSize: 7.5,
      color: "000000",
      line: { color: "535354", width: 1 },
    }
  );

  slide3.addImage({
    path: `src/images/${gptResponseData.lowest_performing_campaign.Campaign_id}.png`,
    x: 8.1,
    y: 2.5,
    w: 1.3,
    h: 2,
  });

  slide3.addImage({
    path: "src/images/mediaminds-logo.png",
    x: 9.2,
    y: 5.2,
    w: 0.5,
    h: 0.25,
  });
};

module.exports = {
  slide_3,
};
