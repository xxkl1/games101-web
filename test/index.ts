import { testDraw } from "./draw";
import { testMatrix } from "./matrix";
import { testDrawMVP } from "./mvp";
import { testBarycentric } from "./barycentric";
import { testInsideTriangle } from "./insideTriangle";

const test = function () {
  testMatrix();
  testDraw();
  testDrawMVP();
  testBarycentric();
  testInsideTriangle();
}

test();