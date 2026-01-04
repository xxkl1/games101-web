import { vec4ToPoint } from "./utils/common";
import { drawLine } from "./utils/draw/line";
import { multiply, ndc2Screen, projection, rotate, Vec4, viewMat } from "./utils/matrix";

const main = function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const w = canvas.width;
  const h = canvas.height;

  const m = rotate(new Vec4([0, 0, 1, 1]), Math.PI / 4);
  const v = viewMat(new Vec4([0, 0, 15, 1]), new Vec4([0, 0, -5, 1]));
  const p = projection(45, w / h, 0.1, 100);

  const mvp = multiply(p, multiply(v, m));
  const ndc2ScreenMat = ndc2Screen(w, h);

  const imageData = new ImageData(w, h);
  const p1 = vec4ToPoint(multiply(ndc2ScreenMat, multiply(mvp, new Vec4([0, 5, -5, 1])).perspectiveDivide()));
  const p2 = vec4ToPoint(multiply(ndc2ScreenMat, multiply(mvp, new Vec4([5, 0, -5, 1])).perspectiveDivide()));
  const p3 = vec4ToPoint(multiply(ndc2ScreenMat, multiply(mvp, new Vec4([-5, -5, -5, 1])).perspectiveDivide()));

  drawLine(imageData, p1, p2, { r: 255, g: 0, b: 0, a: 255 });
  drawLine(imageData, p2, p3, { r: 0, g: 255, b: 0, a: 255 });
  drawLine(imageData, p3, p1, { r: 0, g: 0, b: 255, a: 255 });

  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(imageData, 0, 0);
  console.log(Array.from(imageData.data));
};

main();