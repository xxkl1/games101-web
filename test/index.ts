import { testDraw } from "./draw";
import { testMatrix } from "./matrix";
import { testDrawMVP } from "./mvp";
import { testBarycentric } from "./barycentric";
import { testInsideTriangle } from "./insideTriangle";
import { testZBuffer } from "./zBuffer";
import { testSSAA } from "./ssaa";

const test = function () {
  testMatrix();
  testDraw();
  testDrawMVP();
  testBarycentric();
  testInsideTriangle();
  testZBuffer();
  testSSAA();
}

test();