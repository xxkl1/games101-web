import type { Vec2, Vec3, Vec4 } from "../math";

type TriangleVec2 = [Vec2, Vec2, Vec2];
type TriangleVec3 = [Vec3, Vec3, Vec3];
type TriangleVec4 = [Vec4, Vec4, Vec4];

type Barycentric = [number, number, number]; // [alpha, beta, gamma]

export type {
  TriangleVec2,
  TriangleVec3,
  TriangleVec4,
  Barycentric,
}