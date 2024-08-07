let endSlide = (pptx) => {
  let end_slide = pptx.addSlide();

  // Manually set slide dimensions
  let slideWidth = 10; // 10 inches
  let slideHeight = 5; // 7.5 inches

  // Image dimensions
  let imageWidth = 1.5;
  let imageHeight = 0.75;

  // Calculate center position
  let xCenter = (slideWidth - imageWidth) / 2;
  let yCenter = (slideHeight - imageHeight) / 2;

  end_slide.addImage({
    path: "src/images/mediaminds-logo.png",
    x: xCenter,
    y: yCenter,
    w: imageWidth,
    h: imageHeight,
  });
};

module.exports = {
  endSlide,
};
