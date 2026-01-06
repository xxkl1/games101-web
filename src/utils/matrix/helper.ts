import { Vec4 } from "./vec4";
import { Mat4 } from "./mat4";
import { perspectiveDivide } from "./perspectiveDivide";
/**
 * 获取矩阵/向量的内部值
 * @param m 矩阵/向量，行主序
 * @param row 行数，从1开始
 * @param col 列数，从1开始
 * @returns
 */
const at = function (m: Mat4 | Vec4, row: number, col: number) {
    const numCol = m instanceof Mat4 ? 4 : 1;
    const value = m.value;
    const i = (row - 1) * numCol + (col - 1);
    if (i >= 0 && i < value.length) {
        return value[i];
    }
    throw new Error(`index out of range: ${JSON.stringify(value)}, row: ${row}, col: ${col}, index: ${i}`);
};

const normalize = function (vec4: Vec4) {
    const v = perspectiveDivide(vec4).value;
    const len = Math.hypot(v[0], v[1], v[2]);
    return new Vec4([v[0] / len, v[1] / len, v[2] / len, 1]);
}

const dot = function(a: Vec4, b: Vec4) {
    const aValue = perspectiveDivide(a).value;
    const bValue = perspectiveDivide(b).value;
    return aValue[0] * bValue[0] + aValue[1] * bValue[1] + aValue[2] * bValue[2];
}

const cross = function (a: Vec4, b: Vec4) {
    const aValue = perspectiveDivide(a).value;
    const bValue = perspectiveDivide(b).value;
    return new Vec4([
        aValue[1] * bValue[2] - aValue[2] * bValue[1],
        aValue[2] * bValue[0] - aValue[0] * bValue[2],
        aValue[0] * bValue[1] - aValue[1] * bValue[0],
        1,
    ]);
}

const subtract = function (a: Vec4, b: Vec4) {
    const aValue = perspectiveDivide(a).value;
    const bValue = perspectiveDivide(b).value;
    return new Vec4([aValue[0] - bValue[0], aValue[1] - bValue[1], aValue[2] - bValue[2], 1]);
}

export {
    at,
    normalize,
    dot,
    cross,
    subtract,
};
