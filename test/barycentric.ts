import { computeBarycentric2D } from "../src/utils/common/barycentric";


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
  actual: { alpha: number; beta: number; gamma: number },
  expected: { alpha: number; beta: number; gamma: number },
  message: string
) {
  const match = almostEqual(actual.alpha, expected.alpha) &&
                almostEqual(actual.beta, expected.beta) &&
                almostEqual(actual.gamma, expected.gamma);

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
  const triangle = {
    p1: { x: 0, y: 0 },
    p2: { x: 1, y: 0 },
    p3: { x: 0, y: 1 },
  };

  const p = { x: 0.33, y: 0.33 };
  const result = computeBarycentric2D(p, triangle);

  // 三个坐标都应该接近 0.33，和为 1
  ensureBarycentric(
    result,
    { alpha: 0.34, beta: 0.33, gamma: 0.33 },
    "testBarycentric1"
  );
};

/**
 * 测试2：点在三角形顶点
 */
const testBarycentric2 = function () {
  const triangle = {
    p1: { x: 0, y: 0 },
    p2: { x: 1, y: 0 },
    p3: { x: 0, y: 1 },
  };

  // 测试点在 p1
  const p1 = { x: 0, y: 0 };
  const result1 = computeBarycentric2D(p1, triangle);
  ensureBarycentric(
    result1,
    { alpha: 1, beta: 0, gamma: 0 },
    "testBarycentric2 - 点在p1"
  );

  // 测试点在 p2
  const p2 = { x: 1, y: 0 };
  const result2 = computeBarycentric2D(p2, triangle);
  ensureBarycentric(
    result2,
    { alpha: 0, beta: 1, gamma: 0 },
    "testBarycentric2 - 点在p2"
  );

  // 测试点在 p3
  const p3 = { x: 0, y: 1 };
  const result3 = computeBarycentric2D(p3, triangle);
  ensureBarycentric(
    result3,
    { alpha: 0, beta: 0, gamma: 1 },
    "testBarycentric2 - 点在p3"
  );
};

/**
 * 测试3：点在三角形边上
 */
const testBarycentric3 = function () {
  const triangle = {
    p1: { x: 0, y: 0 },
    p2: { x: 2, y: 0 },
    p3: { x: 0, y: 2 },
  };

  // 点在 p1-p2 边上，gamma 应该为 0
  const p1 = { x: 1, y: 0 };
  const result1 = computeBarycentric2D(p1, triangle);
  ensureBarycentric(
    result1,
    { alpha: 0.5, beta: 0.5, gamma: 0 },
    "testBarycentric3 - 点在p1-p2边上"
  );

  // 点在 p1-p3 边上，beta 应该为 0
  const p2 = { x: 0, y: 1 };
  const result2 = computeBarycentric2D(p2, triangle);
  ensureBarycentric(
    result2,
    { alpha: 0.5, beta: 0, gamma: 0.5 },
    "testBarycentric3 - 点在p1-p3边上"
  );
};

/**
 * 测试4：点在三角形外部
 */
const testBarycentric4 = function () {
  const triangle = {
    p1: { x: 0, y: 0 },
    p2: { x: 1, y: 0 },
    p3: { x: 0, y: 1 },
  };

  const p = { x: -1, y: -1 };
  const result = computeBarycentric2D(p, triangle);

  // 外部点至少有一个坐标为负数
  const hasNegative = result.alpha < 0 || result.beta < 0 || result.gamma < 0;

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
