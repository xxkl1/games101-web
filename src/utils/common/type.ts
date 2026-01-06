import type { Point } from "../draw/type"; 

// TODO: 优化类型的管理，目前类型文件有点分散，比较乱
interface TrianglePoints {
  p1: Point;
  p2: Point;
  p3: Point;
}

interface Barycentric {
  alpha: number;
  beta: number;
  gamma: number;
}

export type {
  TrianglePoints,
  Barycentric,
}

