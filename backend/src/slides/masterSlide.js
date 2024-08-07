let masterSlide = (pptx, gptResponseData) => {
  let master_slide = pptx.addSlide();

  let today = new Date();
  let options = { month: "long", day: "numeric", year: "numeric" };
  let formattedDate = today.toLocaleDateString("en-US", options);
  let currentYear = new Date().getFullYear();

  master_slide.addImage({
    path: "src/images/mediaminds-logo.png",
    x: 0.5,
    y: 0.5,
    w: 1.5,
    h: 0.75,
  });
  master_slide.addText("Ads Performance", {
    x: 0.5,
    y: 2.5,
    fontSize: 36,
    color: "333333",
    bold: true,
  });
  master_slide.addText(`${gptResponseData.Quarter} -  ${currentYear}`, {
    x: 0.5,
    y: 3,
    fontSize: 18,
    color: "666666",
  });

  master_slide.addText(formattedDate, {
    x: 0.5,
    y: 4.5,
    fontSize: 11,
    color: "333333",
  });
};

module.exports = {
  masterSlide,
};
