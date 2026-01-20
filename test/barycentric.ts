import { computeBarycentric2D, type Barycentric } from "../src/triangle";
import type { Vec2 } from "../src/math";


// TODO：优化这个文件，保证都用ensure来进行测试

/**
 * 浮点数近似相等判断
 */
const almostEqual = function (a: number, b: number, epsilon: number = 0.00001): boolean {
  return Math.abs(a - b) < epsilon;
};

/**
 * 验证重心坐标结果
 */
const ensureBarycentric = function (
  actual: Barycentric,
  expected: Barycentric,
  message: string
) {
  const match = almostEqual(actual[0], expected[0]) &&
                almostEqual(actual[1], expected[1]) &&
                almostEqual(actual[2], expected[2]);

  if (match) {
    console.log(`${message} pass`);
  } else {
    console.error(
      `${message} fail, expect: ${JSON.stringify(expected)}, actual: ${JSON.stringify(actual)}`
    );
  }
};

/**
 * 测试1：点在三角形中心附近
 */
const testBarycentric1 = function () {
  const triangle: [[number, number], [number, number], [number, number]] = [
    [0, 0],
    [1, 0],
    [0, 1],
  ];

  const p: Vec2 = [0.33, 0.33];
  const result = computeBarycentric2D(p, triangle);

  // 三个坐标都应该接近 0.33，和为 1
  ensureBarycentric(
    result,
    [0.34, 0.33, 0.33],
    "testBarycentric1"
  );
};

/**
 * 测试2：点在三角形顶点
 */
const testBarycentric2 = function () {
  const triangle: [[number, number], [number, number], [number, number]] = [
    [0, 0],
    [1, 0],
    [0, 1],
  ];

  // 测试点在 p1
  const p1: Vec2 = [0, 0];
  const result1 = computeBarycentric2D(p1, triangle);
  ensureBarycentric(
    result1,
    [1, 0, 0],
    "testBarycentric2 - 点在p1"
  );

  // 测试点在 p2
  const p2: Vec2 = [1, 0];
  const result2 = computeBarycentric2D(p2, triangle);
  ensureBarycentric(
    result2,
    [0, 1, 0],
    "testBarycentric2 - 点在p2"
  );

  // 测试点在 p3
  const p3: Vec2 = [0, 1];
  const result3 = computeBarycentric2D(p3, triangle);
  ensureBarycentric(
    result3,
    [0, 0, 1],
    "testBarycentric2 - 点在p3"
  );
};

/**
 * 测试3：点在三角形边上
 */
const testBarycentric3 = function () {
  const triangle: [[number, number], [number, number], [number, number]] = [
    [0, 0],
    [2, 0],
    [0, 2],
  ];

  // 点在 p1-p2 边上，gamma 应该为 0
  const p1: Vec2 = [1, 0];
  const result1 = computeBarycentric2D(p1, triangle);
  ensureBarycentric(
    result1,
    [0.5, 0.5, 0],
    "testBarycentric3 - 点在p1-p2边上"
  );

  // 点在 p1-p3 边上，beta 应该为 0
  const p2: Vec2 = [0, 1];
  const result2 = computeBarycentric2D(p2, triangle);
  ensureBarycentric(
    result2,
    [0.5, 0, 0.5],
    "testBarycentric3 - 点在p1-p3边上"
  );
};

/**
 * 测试4：点在三角形外部
 */
const testBarycentric4 = function () {
  const triangle: [[number, number], [number, number], [number, number]] = [
    [0, 0],
    [1, 0],
    [0, 1],
  ];

  const p: Vec2 = [-1, -1];
  const result = computeBarycentric2D(p, triangle);

  // 外部点至少有一个坐标为负数
  const hasNegative = result[0] < 0 || result[1] < 0 || result[2] < 0;

  if (hasNegative) {
    console.log("testBarycentric4 pass");
  } else {
    console.error(
      `testBarycentric4 fail, expect at least one negative coordinate, actual: ${JSON.stringify(result)}`
    );
  }
};

const testBarycentric = function () {
  testBarycentric1();
  testBarycentric2();
  testBarycentric3();
  testBarycentric4();
};

export {
  testBarycentric,
};
