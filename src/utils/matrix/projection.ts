import { Mat4 } from "./mat4";
import { multiply } from "./multiply";

/**
 * 获取透视投影矩阵
 * @param eyeFov 视野角度
 * @param aspectRatio 宽高比
 * @param zNear 近截面
 * @param zFar 远截面
 */
const projection = function (
    eyeFov: number,
    aspectRatio: number,
    zNear: number,
    zFar: number
) {
    const angle = eyeFov / 180.0 * Math.PI;
    const t = zNear * Math.tan(angle / 2);
    const r = t * aspectRatio;
    const l = -r;
    const b = -t;

    const MorthoScale = new Mat4([
      2 / (r - l), 0, 0, 0,
      0, 2 / (t - b), 0, 0,
      0, 0, 2 / (zFar - zNear), 0,
      0, 0, 0, 1
    ]);

    const MorthoPos = new Mat4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, -(zFar + zNear) / 2,
      0, 0, 0, 1
    ]);

    const Mpersp2ortho = new Mat4([
      zNear, 0, 0, 0,
      0, zNear, 0, 0,
      0, 0, -(zFar + zNear), -zFar * zNear,
      0, 0, -1, 0
    ]);

    return multiply(MorthoScale, multiply(MorthoPos, Mpersp2ortho))
};

export {
  projection,
}
