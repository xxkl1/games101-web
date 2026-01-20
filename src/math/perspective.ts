import type { Vec4, Vec3 } from "./type";

/**
 * 透视除法 - 将 Vec4 转换为齐次坐标
 * @param vec 输入向量
 * @returns 透视除法后的 Vec4
 */
const perspectiveDivide = function (vec: Vec4): Vec4 {
    const w = vec[3];
    return [vec[0] / w, vec[1] / w, vec[2] / w, 1];
};

/**
 * 透视除法 - 将 Vec4 转换为 Vec3
 * @param vec 输入向量
 * @returns 透视除法后的 Vec3
 */
const perspectiveDivideToVec3 = function (vec: Vec4): Vec3 {
    const w = vec[3];
    return [vec[0] / w, vec[1] / w, vec[2] / w];
};

export {
    perspectiveDivide,
    perspectiveDivideToVec3,
};
