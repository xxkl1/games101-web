import type { Point } from "../draw/type"
import type { Vec4 } from "../matrix"

const vec4ToPoint = function (v: Vec4) : Point {
  return {
    x: v.value[0],
    y: v.value[1],
  }
}

export { vec4ToPoint }