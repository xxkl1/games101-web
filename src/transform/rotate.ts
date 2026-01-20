import type { Mat4, Vec4 } from "../math";

/**
 * 创建绕任意轴旋转的矩阵
 * @param n 旋转轴向量 [x, y, z, w]
 * @param theta 旋转角度（弧度）
 * @returns 旋转矩阵
 */
const rotate = function (n: Vec4, theta: number): Mat4 {
    // 提取 x, y, z 分量
    let [x, y, z] = n;

    // 归一化
    const len = Math.hypot(x, y, z);

    if (len === 0) {
        throw new Error("axis length is zero");
    }

    x /= len;
    y /= len;
    z /= len;

    const c = Math.cos(theta);
    const s = Math.sin(theta);
    const t = 1 - c;

    return [
        t * x * x + c, t * x * y - s * z, t * x * z + s * y, 0,
        t * x * y + s * z, t * y * y + c, t * y * z - s * x, 0,
        t * x * z - s * y, t * y * z + s * x, t * z * z + c, 0,
        0, 0, 0, 1,
    ];
};

export { rotate };
