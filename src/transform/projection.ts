import type { Mat4 } from "../math";
import { multiplyMat4Mat4 } from "../math";

/**
 * 获取透视投影矩阵
 * @param eyeFov 视野角度（度）
 * @param aspectRatio 宽高比
 * @param zNear 近截面
 * @param zFar 远截面
 * @returns 透视投影矩阵
 */
const projection = function (
    eyeFov: number,
    aspectRatio: number,
    zNear: number,
    zFar: number
): Mat4 {
    const angle = eyeFov / 180.0 * Math.PI;
    const t = zNear * Math.tan(angle / 2);
    const r = t * aspectRatio;
    const l = -r;
    const b = -t;

    const MorthoScale: Mat4 = [
        2 / (r - l), 0, 0, 0,
        0, 2 / (t - b), 0, 0,
        0, 0, 2 / (zFar - zNear), 0,
        0, 0, 0, 1
    ];

    const MorthoPos: Mat4 = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, -(zFar + zNear) / 2,
        0, 0, 0, 1
    ];

    const Mpersp2ortho: Mat4 = [
        zNear, 0, 0, 0,
        0, zNear, 0, 0,
        0, 0, -(zFar + zNear), -zFar * zNear,
        0, 0, -1, 0
    ];

    const temp: Mat4 = multiplyMat4Mat4(MorthoPos, Mpersp2ortho) as Mat4;
    const result: Mat4 = multiplyMat4Mat4(MorthoScale, temp) as Mat4;
    return result;
};

export { projection };
