import { testDrawLine } from "./drawLine";
import { testDrawPoint } from "./drawPoint";

const testDraw = function () {
  testDrawPoint();
  testDrawLine();
};

export { testDraw };