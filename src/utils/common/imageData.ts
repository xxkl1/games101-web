const drawImageData = function (imageData: ImageData) {
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  canvas.getContext("2d")?.putImageData(imageData, 0, 0);
  document.body.append(canvas);
}

export {
  drawImageData,
}