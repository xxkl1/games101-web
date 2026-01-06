import { testDraw } from "./draw";
import { testMatrix } from "./matrix";
import { testDrawMVP } from "./mvp";
import { testBarycentric } from "./barycentric";

const test = function () {
  testMatrix();
  testDraw();
  testDrawMVP();
  testBarycentric();
}

test();