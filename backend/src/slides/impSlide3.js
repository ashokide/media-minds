let impSlide3 = (pptx, gptResponseData) => {
  let imp_slide3 = pptx.addSlide();
  let currentYear = new Date().getFullYear();

  // Set slide background color
  imp_slide3.background = { fill: "ED3F43" };

  // Add the main title
  imp_slide3.addText(
    ` ${gptResponseData.Quarter} ${currentYear} SOCIAL MEDIA PLATFORM HIGHLIGHTS`,
    {
      x: 0.25,
      y: 0.25,
      w: 7,
      h: 2.5,
      fontSize: 48,
      color: "FFFFFF",
      bold: true,
    }
  );

  imp_slide3.addText("MEDIA MINDS", {
    x: -0.1,
    y: 3.5,
    h: 0.3,
    w: 1,
    fontSize: 8,
    color: "FFFFFF",
    rotate: 270,
  });

  imp_slide3.addImage({
    path: "src/images/mediaminds-logo.png",
    x: 9.2,
    y: 5.2,
    w: 0.5,
    h: 0.25,
  });
};

module.exports = {
  impSlide3,
};
