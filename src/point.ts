import type { Vec2 } from "./math"
import type { Vec4 } from "./math"
import type { Vec3 } from "./math"

const vec4ToVec2 = function (v: Vec4) : Vec2 {
  return [v[0], v[1]]
}

const vec3ToVec2 = function (v: Vec3) : Vec2 {
  return [v[0], v[1]]
}

/**
 * 获取点在buffer中的index，buffer像素顺序是从上到下，从左到右
 * @param p
 * @param width
 * @returns
 */
const getBufferIndex = function (p: Vec2, width: number) {
  return (p[1] * width + p[0])
}

export {
  vec4ToVec2,
  vec3ToVec2,
  getBufferIndex,
}
