import type { Point } from "../draw/type"; 
import type { Vec4 } from "../matrix";

// TODO: 优化类型的管理，目前类型文件有点分散，比较乱
interface TrianglePoints {
  p1: Point;
  p2: Point;
  p3: Point;
}

interface TriangleVec4s {
  p1: Vec4;
  p2: Vec4;
  p3: Vec4;
}

interface Barycentric {
  alpha: number;
  beta: number;
  gamma: number;
}

export type {
  TrianglePoints,
  TriangleVec4s,
  Barycentric,
}

