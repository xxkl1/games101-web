import { atMat4, atVec4 } from "./at";
import type { Mat4, Vec4 } from "./type";

const multiplyMat4Vec4 = function (a: Mat4, b: Vec4) : Vec4 {
  return [
    // 第1行1列
    atMat4(a, 1, 1) * atVec4(b, 1, 1) + atMat4(a, 1, 2) * atVec4(b, 2, 1) + atMat4(a, 1, 3) * atVec4(b, 3, 1) + atMat4(a, 1, 4) * atVec4(b, 4, 1),
    // 第2行1列
    atMat4(a, 2, 1) * atVec4(b, 1, 1) + atMat4(a, 2, 2) * atVec4(b, 2, 1) + atMat4(a, 2, 3) * atVec4(b, 3, 1) + atMat4(a, 2, 4) * atVec4(b, 4, 1),
    // 第3行1列
    atMat4(a, 3, 1) * atVec4(b, 1, 1) + atMat4(a, 3, 2) * atVec4(b, 2, 1) + atMat4(a, 3, 3) * atVec4(b, 3, 1) + atMat4(a, 3, 4) * atVec4(b, 4, 1),
    // 第4行1列
    atMat4(a, 4, 1) * atVec4(b, 1, 1) + atMat4(a, 4, 2) * atVec4(b, 2, 1) + atMat4(a, 4, 3) * atVec4(b, 3, 1) + atMat4(a, 4, 4) * atVec4(b, 4, 1),
  ]
};

const multiplyMat4Mat4 = function (a: Mat4, b: Mat4) : Mat4 {
    return [
      // 1行1列
      atMat4(a, 1, 1) * atMat4(b, 1, 1) + atMat4(a, 1, 2) * atMat4(b, 2, 1) + atMat4(a, 1, 3) * atMat4(b, 3, 1) + atMat4(a, 1, 4) * atMat4(b, 4, 1),
      // 1行2列
      atMat4(a, 1, 1) * atMat4(b, 1, 2) + atMat4(a, 1, 2) * atMat4(b, 2, 2) + atMat4(a, 1, 3) * atMat4(b, 3, 2) + atMat4(a, 1, 4) * atMat4(b, 4, 2),
      // 1行3列
      atMat4(a, 1, 1) * atMat4(b, 1, 3) + atMat4(a, 1, 2) * atMat4(b, 2, 3) + atMat4(a, 1, 3) * atMat4(b, 3, 3) + atMat4(a, 1, 4) * atMat4(b, 4, 3),
      // 1行4列
      atMat4(a, 1, 1) * atMat4(b, 1, 4) + atMat4(a, 1, 2) * atMat4(b, 2, 4) + atMat4(a, 1, 3) * atMat4(b, 3, 4) + atMat4(a, 1, 4) * atMat4(b, 4, 4),

      // 2行1列
      atMat4(a, 2, 1) * atMat4(b, 1, 1) + atMat4(a, 2, 2) * atMat4(b, 2, 1) + atMat4(a, 2, 3) * atMat4(b, 3, 1) + atMat4(a, 2, 4) * atMat4(b, 4, 1),
      // 2行2列
      atMat4(a, 2, 1) * atMat4(b, 1, 2) + atMat4(a, 2, 2) * atMat4(b, 2, 2) + atMat4(a, 2, 3) * atMat4(b, 3, 2) + atMat4(a, 2, 4) * atMat4(b, 4, 2),
      // 2行3列
      atMat4(a, 2, 1) * atMat4(b, 1, 3) + atMat4(a, 2, 2) * atMat4(b, 2, 3) + atMat4(a, 2, 3) * atMat4(b, 3, 3) + atMat4(a, 2, 4) * atMat4(b, 4, 3),
      // 2行4列
      atMat4(a, 2, 1) * atMat4(b, 1, 4) + atMat4(a, 2, 2) * atMat4(b, 2, 4) + atMat4(a, 2, 3) * atMat4(b, 3, 4) + atMat4(a, 2, 4) * atMat4(b, 4, 4),

      // 3行1列
      atMat4(a, 3, 1) * atMat4(b, 1, 1) + atMat4(a, 3, 2) * atMat4(b, 2, 1) + atMat4(a, 3, 3) * atMat4(b, 3, 1) + atMat4(a, 3, 4) * atMat4(b, 4, 1),
      // 3行2列
      atMat4(a, 3, 1) * atMat4(b, 1, 2) + atMat4(a, 3, 2) * atMat4(b, 2, 2) + atMat4(a, 3, 3) * atMat4(b, 3, 2) + atMat4(a, 3, 4) * atMat4(b, 4, 2),
      // 3行3列
      atMat4(a, 3, 1) * atMat4(b, 1, 3) + atMat4(a, 3, 2) * atMat4(b, 2, 3) + atMat4(a, 3, 3) * atMat4(b, 3, 3) + atMat4(a, 3, 4) * atMat4(b, 4, 3),
      // 3行4列
      atMat4(a, 3, 1) * atMat4(b, 1, 4) + atMat4(a, 3, 2) * atMat4(b, 2, 4) + atMat4(a, 3, 3) * atMat4(b, 3, 4) + atMat4(a, 3, 4) * atMat4(b, 4, 4),

      // 4行1列
      atMat4(a, 4, 1) * atMat4(b, 1, 1) + atMat4(a, 4, 2) * atMat4(b, 2, 1) + atMat4(a, 4, 3) * atMat4(b, 3, 1) + atMat4(a, 4, 4) * atMat4(b, 4, 1),
      // 4行2列
      atMat4(a, 4, 1) * atMat4(b, 1, 2) + atMat4(a, 4, 2) * atMat4(b, 2, 2) + atMat4(a, 4, 3) * atMat4(b, 3, 2) + atMat4(a, 4, 4) * atMat4(b, 4, 2),
      // 4行3列
      atMat4(a, 4, 1) * atMat4(b, 1, 3) + atMat4(a, 4, 2) * atMat4(b, 2, 3) + atMat4(a, 4, 3) * atMat4(b, 3, 3) + atMat4(a, 4, 4) * atMat4(b, 4, 3),
      // 4行4列
      atMat4(a, 4, 1) * atMat4(b, 1, 4) + atMat4(a, 4, 2) * atMat4(b, 2, 4) + atMat4(a, 4, 3) * atMat4(b, 3, 4) + atMat4(a, 4, 4) * atMat4(b, 4, 4),
    ]
};

export {
  multiplyMat4Vec4,
  multiplyMat4Mat4,
}