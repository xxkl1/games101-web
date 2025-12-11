import { Vec4 } from "./vec4";
import { Mat4 } from "./mat4";
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

export { at };
