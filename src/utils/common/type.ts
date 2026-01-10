import type { Point } from "../draw/type"; 
import type { Vec4 } from "../matrix";
import type { Vec3 } from "../matrix/vec3";

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

interface TriangleVec3s {
  p1: Vec3;
  p2: Vec3;
  p3: Vec3;
}

interface Barycentric {
  alpha: number;
  beta: number;
  gamma: number;
}

export type {
  TrianglePoints,
  TriangleVec4s,
  TriangleVec3s,
  Barycentric,
}

