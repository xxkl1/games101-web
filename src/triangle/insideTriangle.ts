import type { Vec2 } from "../math";
import type { TriangleVec2 } from "./type";

const insideTriangle = function (p: Vec2, triangle: TriangleVec2): boolean {
  const p1 = triangle[0];
  const p2 = triangle[1];
  const p3 = triangle[2];

  // 计算三角形的三条边向量
  const v0v1 = [p2[0] - p1[0], p2[1] - p1[1]];
  const v1v2 = [p3[0] - p2[0], p3[1] - p2[1]];
  const v2v0 = [p1[0] - p3[0], p1[1] - p3[1]];

  // 计算点 p 到各个顶点的向量
  const v0p = [p[0] - p1[0], p[1] - p1[1]];
  const v1p = [p[0] - p2[0], p[1] - p2[1]];
  const v2p = [p[0] - p3[0], p[1] - p3[1]];

  // 计算2D叉积（返回标量，表示z分量）
  const cross1 = v0v1[0] * v0p[1] - v0v1[1] * v0p[0];
  const cross2 = v1v2[0] * v1p[1] - v1v2[1] * v1p[0];
  const cross3 = v2v0[0] * v2p[1] - v2v0[1] * v2p[0];

  // 判断点是否在三角形内（同侧测试）
  return (cross1 >= 0 && cross2 >= 0 && cross3 >= 0) || (cross1 <= 0 && cross2 <= 0 && cross3 <= 0);
}

export {
  insideTriangle,
}
