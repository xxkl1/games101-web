import { read } from "./read";
import type { Mat4, Vec4 } from "./type";

/**
 * 向量的内部值
 * @param m 向量，行主序
 * @param row 行数，从1开始
 * @param col 列数，从1开始
 * @returns
 */
const atVec4 = function (vec: Vec4, row: number, col: number) {
    const i = (row - 1) + (col - 1);
    return read(vec, i);
}

/**
 * 矩阵的内部值
 * @param m 矩阵，行主序
 * @param row 行数，从1开始
 * @param col 列数，从1开始
 * @returns
 */
const atMat4 = function (mat: Mat4, row: number, col: number) {
    const i = (row - 1) * 4 + (col - 1);
    return read(mat, i);
}

export {
  atVec4,
  atMat4,
}