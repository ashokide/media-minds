let impSlide1 = (pptx, gptResponseData) => {
  let imp_slide1 = pptx.addSlide();

  // Set slide background color
  imp_slide1.background = { fill: "ED3F43" };

  // Add the main title
  imp_slide1.addText(` ${gptResponseData.Quarter} KEY PERFORMANCE`, {
    x: 0.25,
    y: 0.25,
    w: 7,
    h: 2.5,
    fontSize: 48,
    color: "FFFFFF",
    bold: true,
  });

  imp_slide1.addText("MEDIA MINDS", {
    x: -0.1,
    y: 3.5,
    h: 0.3,
    w: 1,
    fontSize: 8,
    color: "FFFFFF",
    rotate: 270,
  });

  imp_slide1.addImage({
    path: "src/images/mediaminds-logo.png",
    x: 9.2,
    y: 5.2,
    w: 0.5,
    h: 0.25,
  });
};

module.exports = {
  impSlide1,
};
