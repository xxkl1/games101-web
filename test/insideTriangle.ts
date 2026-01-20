import { insideTriangle } from "../src/triangle";
import { ensure } from "./ensure";
import type { Vec2 } from "../src/math";
import type { TriangleVec2 } from "../src/triangle";

/**
 * 测试点在三角形内部
 */
const testInsideTriangle1 = function () {
  const triangle: TriangleVec2 = [
    [0, 0],
    [10, 0],
    [5, 10]
  ];

  // 测试三角形中心点
  const point1: Vec2 = [5, 5];
  ensure(
    insideTriangle(point1, triangle),
    true,
    "testInsideTriangle1 - point inside"
  );

  // 测试另一个内部点
  const point2: Vec2 = [3, 2];
  ensure(
    insideTriangle(point2, triangle),
    true,
    "testInsideTriangle1 - another point inside"
  );
}

/**
 * 测试点在三角形外部
 */
const testInsideTriangle2 = function () {
  const triangle: TriangleVec2 = [
    [0, 0],
    [10, 0],
    [5, 10]
  ];

  // 测试三角形下方的点
  const point1: Vec2 = [5, -1];
  ensure(
    insideTriangle(point1, triangle),
    false,
    "testInsideTriangle2 - point below triangle"
  );

  // 测试三角形左侧的点
  const point2: Vec2 = [-1, 5];
  ensure(
    insideTriangle(point2, triangle),
    false,
    "testInsideTriangle2 - point left of triangle"
  );

  // 测试三角形右侧的点
  const point3: Vec2 = [11, 5];
  ensure(
    insideTriangle(point3, triangle),
    false,
    "testInsideTriangle2 - point right of triangle"
  );

  // 测试三角形上方的点
  const point4: Vec2 = [5, 15];
  ensure(
    insideTriangle(point4, triangle),
    false,
    "testInsideTriangle2 - point above triangle"
  );
}

/**
 * 测试点在三角形边上
 */
const testInsideTriangle3 = function () {
  const triangle: TriangleVec2 = [
    [0, 0],
    [10, 0],
    [5, 10]
  ];

  // 测试底边中点
  const point1: Vec2 = [5, 0];
  ensure(
    insideTriangle(point1, triangle),
    true,
    "testInsideTriangle3 - point on bottom edge"
  );

  // 测试左边中点
  const point2: Vec2 = [2.5, 5];
  ensure(
    insideTriangle(point2, triangle),
    true,
    "testInsideTriangle3 - point on left edge"
  );

  // 测试右边中点
  const point3: Vec2 = [7.5, 5];
  ensure(
    insideTriangle(point3, triangle),
    true,
    "testInsideTriangle3 - point on right edge"
  );
}

/**
 * 测试点在三角形顶点
 */
const testInsideTriangle4 = function () {
  const triangle: TriangleVec2 = [
    [0, 0],
    [10, 0],
    [5, 10]
  ];

  // 测试第一个顶点
  const point1: Vec2 = [0, 0];
  ensure(
    insideTriangle(point1, triangle),
    true,
    "testInsideTriangle4 - point at vertex p1"
  );

  // 测试第二个顶点
  const point2: Vec2 = [10, 0];
  ensure(
    insideTriangle(point2, triangle),
    true,
    "testInsideTriangle4 - point at vertex p2"
  );

  // 测试第三个顶点
  const point3: Vec2 = [5, 10];
  ensure(
    insideTriangle(point3, triangle),
    true,
    "testInsideTriangle4 - point at vertex p3"
  );
}

/**
 * 测试逆时针定义的三角形
 */
const testInsideTriangle5 = function () {
  const triangle: TriangleVec2 = [
    [0, 0],
    [5, 10],
    [10, 0]
  ];

  // 测试内部点
  const point1: Vec2 = [5, 5];
  ensure(
    insideTriangle(point1, triangle),
    true,
    "testInsideTriangle5 - point inside counter-clockwise triangle"
  );

  // 测试外部点
  const point2: Vec2 = [5, -1];
  ensure(
    insideTriangle(point2, triangle),
    false,
    "testInsideTriangle5 - point outside counter-clockwise triangle"
  );
}

/**
 * 测试退化三角形（三点共线）
 */
const testInsideTriangle6 = function () {
  const triangle: TriangleVec2 = [
    [0, 0],
    [5, 0],
    [10, 0]
  ];

  // 测试共线上的点
  const point1: Vec2 = [2.5, 0];
  ensure(
    insideTriangle(point1, triangle),
    true,
    "testInsideTriangle6 - point on degenerate triangle"
  );

  // 测试不在共线上的点
  const point2: Vec2 = [5, 1];
  ensure(
    insideTriangle(point2, triangle),
    false,
    "testInsideTriangle6 - point outside degenerate triangle"
  );
}

/**
 * 测试负坐标三角形
 */
const testInsideTriangle7 = function () {
  const triangle: TriangleVec2 = [
    [-5, -5],
    [5, -5],
    [0, 5]
  ];

  // 测试内部点
  const point1: Vec2 = [0, 0];
  ensure(
    insideTriangle(point1, triangle),
    true,
    "testInsideTriangle7 - point inside negative coordinate triangle"
  );

  // 测试外部点
  const point2: Vec2 = [-10, 0];
  ensure(
    insideTriangle(point2, triangle),
    false,
    "testInsideTriangle7 - point outside negative coordinate triangle"
  );
}

const testInsideTriangle = function () {
  testInsideTriangle1();
  testInsideTriangle2();
  testInsideTriangle3();
  testInsideTriangle4();
  testInsideTriangle5();
  testInsideTriangle6();
  testInsideTriangle7();
};

export {
  testInsideTriangle,
}
