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

export {
  vec4ToPoint,
  vec3ToPoint,
}