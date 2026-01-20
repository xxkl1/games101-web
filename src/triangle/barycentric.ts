import type { Vec2 } from "../math";
import type { Barycentric, TriangleVec2 } from "./type";

const computeBarycentric2D = function (p: Vec2, triangle: TriangleVec2): Barycentric {
  const x = p[0];
  const y = p[1];
  const p1 = triangle[0];
  const p2 = triangle[1];
  const p3 = triangle[2];

  // 计算 alpha (对应 p1)
  const alphaNumerator = x * (p2[1] - p3[1]) + (p3[0] - p2[0]) * y + p2[0] * p3[1] - p3[0] * p2[1];
  const alphaDenominator = p1[0] * (p2[1] - p3[1]) + (p3[0] - p2[0]) * p1[1] + p2[0] * p3[1] - p3[0] * p2[1];
  const alpha = alphaNumerator / alphaDenominator;

  // 计算 beta (对应 p2)
  const betaNumerator = x * (p3[1] - p1[1]) + (p1[0] - p3[0]) * y + p3[0] * p1[1] - p1[0] * p3[1];
  const betaDenominator = p2[0] * (p3[1] - p1[1]) + (p1[0] - p3[0]) * p2[1] + p3[0] * p1[1] - p1[0] * p3[1];
  const beta = betaNumerator / betaDenominator;

  // 计算 gamma (对应 p3)
  const gammaNumerator = x * (p1[1] - p2[1]) + (p2[0] - p1[0]) * y + p1[0] * p2[1] - p2[0] * p1[1];
  const gammaDenominator = p3[0] * (p1[1] - p2[1]) + (p2[0] - p1[0]) * p3[1] + p1[0] * p2[1] - p2[0] * p1[1];
  const gamma = gammaNumerator / gammaDenominator;

  return [alpha, beta, gamma];
}

export {
  computeBarycentric2D,
}
