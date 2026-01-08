import type { Point } from "../draw/type";
import type { TrianglePoints } from "./type";

const insideTriangle = function (p: Point, triangle: TrianglePoints): boolean {
  const { p1, p2, p3 } = triangle;

  // 计算三角形的三条边向量
  const v0v1 = [p2.x - p1.x, p2.y - p1.y];
  const v1v2 = [p3.x - p2.x, p3.y - p2.y];
  const v2v0 = [p1.x - p3.x, p1.y - p3.y];

  // 计算点 p 到各个顶点的向量
  const v0p = [p.x - p1.x, p.y - p1.y];
  const v1p = [p.x - p2.x, p.y - p2.y];
  const v2p = [p.x - p3.x, p.y - p3.y];

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