import { testDraw } from "./draw";
import { testMatrix } from "./matrix";
import { testDrawMVP } from "./mvp";

const test = function () {
  testMatrix();
  testDraw();
  testDrawMVP();
}

test();