import type { Point } from "../draw/type"
import type { Vec4 } from "../matrix"
import type { Vec3 } from "../matrix/vec3"

const vec4ToPoint = function (v: Vec4) : Point {
  return {
    x: v.value[0],
    y: v.value[1],
  }
}

const vec3ToPoint = function (v: Vec3) : Point {
  return {
    x: v.value[0],
    y: v.value[1],
  }
}

/**
 * 获取点在buffer中的index，buffer像素顺序是从上到下，从左到右
 * @param p 
 * @param width 
 * @returns 
 */
const getBufferIndex = function (p: Point, width: number) {
  return (p.y * width + p.x)
}

export {
  vec4ToPoint,
  vec3ToPoint,
  getBufferIndex,
}