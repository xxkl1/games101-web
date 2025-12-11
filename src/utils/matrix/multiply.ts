import { at } from "./helper";
import { Mat4 } from "./mat4"
import { Vec4 } from "./vec4"


const multiply = function (a: Mat4, b: Mat4 | Vec4) {
  if (b instanceof Mat4) {
    const value : number[] = [
      // 1行1列
      at(a, 1, 1) * at(b, 1, 1) + at(a, 1, 2) * at(b, 2, 1) + at(a, 1, 3) * at(b, 3, 1) + at(a, 1, 4) * at(b, 4, 1),
      // 1行2列
      at(a, 1, 1) * at(b, 1, 2) + at(a, 1, 2) * at(b, 2, 2) + at(a, 1, 3) * at(b, 3, 2) + at(a, 1, 4) * at(b, 4, 2),
      // 1行3列
      at(a, 1, 1) * at(b, 1, 3) + at(a, 1, 2) * at(b, 2, 3) + at(a, 1, 3) * at(b, 3, 3) + at(a, 1, 4) * at(b, 4, 3),
      // 1行4列
      at(a, 1, 1) * at(b, 1, 4) + at(a, 1, 2) * at(b, 2, 4) + at(a, 1, 3) * at(b, 3, 4) + at(a, 1, 4) * at(b, 4, 4),

      // 2行1列
      at(a, 2, 1) * at(b, 1, 1) + at(a, 2, 2) * at(b, 2, 1) + at(a, 2, 3) * at(b, 3, 1) + at(a, 2, 4) * at(b, 4, 1),
      // 2行2列
      at(a, 2, 1) * at(b, 1, 2) + at(a, 2, 2) * at(b, 2, 2) + at(a, 2, 3) * at(b, 3, 2) + at(a, 2, 4) * at(b, 4, 2),
      // 2行3列
      at(a, 2, 1) * at(b, 1, 3) + at(a, 2, 2) * at(b, 2, 3) + at(a, 2, 3) * at(b, 3, 3) + at(a, 2, 4) * at(b, 4, 3),
      // 2行4列
      at(a, 2, 1) * at(b, 1, 4) + at(a, 2, 2) * at(b, 2, 4) + at(a, 2, 3) * at(b, 3, 4) + at(a, 2, 4) * at(b, 4, 4),

      // 3行1列
      at(a, 3, 1) * at(b, 1, 1) + at(a, 3, 2) * at(b, 2, 1) + at(a, 3, 3) * at(b, 3, 1) + at(a, 3, 4) * at(b, 4, 1),
      // 3行2列
      at(a, 3, 1) * at(b, 1, 2) + at(a, 3, 2) * at(b, 2, 2) + at(a, 3, 3) * at(b, 3, 2) + at(a, 3, 4) * at(b, 4, 2),
      // 3行3列
      at(a, 3, 1) * at(b, 1, 3) + at(a, 3, 2) * at(b, 2, 3) + at(a, 3, 3) * at(b, 3, 3) + at(a, 3, 4) * at(b, 4, 3),
      // 3行4列
      at(a, 3, 1) * at(b, 1, 4) + at(a, 3, 2) * at(b, 2, 4) + at(a, 3, 3) * at(b, 3, 4) + at(a, 3, 4) * at(b, 4, 4),

      // 4行1列
      at(a, 4, 1) * at(b, 1, 1) + at(a, 4, 2) * at(b, 2, 1) + at(a, 4, 3) * at(b, 3, 1) + at(a, 4, 4) * at(b, 4, 1),
      // 4行2列
      at(a, 4, 1) * at(b, 1, 2) + at(a, 4, 2) * at(b, 2, 2) + at(a, 4, 3) * at(b, 3, 2) + at(a, 4, 4) * at(b, 4, 2),
      // 4行3列
      at(a, 4, 1) * at(b, 1, 3) + at(a, 4, 2) * at(b, 2, 3) + at(a, 4, 3) * at(b, 3, 3) + at(a, 4, 4) * at(b, 4, 3),
      // 4行4列
      at(a, 4, 1) * at(b, 1, 4) + at(a, 4, 2) * at(b, 2, 4) + at(a, 4, 3) * at(b, 3, 4) + at(a, 4, 4) * at(b, 4, 4),
    ];

    return new Mat4(value);
  }
  const value : number[] = [
    // 第1行1列
    at(a, 1, 1) * at(b, 1, 1) + at(a, 1, 2) * at(b, 2, 1) + at(a, 1, 3) * at(b, 3, 1) + at(a, 1, 4) * at(b, 4, 1),
    // 第2行1列
    at(a, 2, 1) * at(b, 1, 1) + at(a, 2, 2) * at(b, 2, 1) + at(a, 2, 3) * at(b, 3, 1) + at(a, 2, 4) * at(b, 4, 1),
    // 第3行1列
    at(a, 3, 1) * at(b, 1, 1) + at(a, 3, 2) * at(b, 2, 1) + at(a, 3, 3) * at(b, 3, 1) + at(a, 3, 4) * at(b, 4, 1),
    // 第4行1列
    at(a, 4, 1) * at(b, 1, 1) + at(a, 4, 2) * at(b, 2, 1) + at(a, 4, 3) * at(b, 3, 1) + at(a, 4, 4) * at(b, 4, 1),
  ];
  return new Vec4(value);
};

export {
    multiply,
};
