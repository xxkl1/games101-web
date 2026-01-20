import type { Vec4, Vec3 } from "./type";

/**
 * 向量点积 (Vec4)
 */
const dot = function(a: Vec4, b: Vec4): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * 向量点积 (Vec3)
 */
const dotVec3 = function(a: Vec3, b: Vec3): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * 向量叉积 (Vec4)
 */
const cross = function(a: Vec4, b: Vec4): Vec4 {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
        1,
    ];
};

/**
 * 向量减法 (Vec4)
 */
const subtract = function(a: Vec4, b: Vec4): Vec4 {
    return [
        a[0] - b[0],
        a[1] - b[1],
        a[2] - b[2],
        1,
    ];
};

/**
 * 向量减法 (Vec3)
 */
const subtractVec3 = function(a: Vec3, b: Vec3): Vec3 {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
};

/**
 * 向量归一化 (Vec4)
 */
const normalize = function(vec: Vec4): Vec4 {
    const len = Math.hypot(vec[0], vec[1], vec[2]);
    if (len === 0) {
        throw new Error("Cannot normalize zero vector");
    }
    return [
        vec[0] / len,
        vec[1] / len,
        vec[2] / len,
        1,
    ];
};

/**
 * 向量归一化 (Vec3)
 */
const normalizeVec3 = function(v: Vec3): Vec3 {
    const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    if (len === 0) return [0, 0, 0];
    return [v[0] / len, v[1] / len, v[2] / len];
};

/**
 * 向量乘以标量 (Vec3)
 */
const scaleVec3 = function(v: Vec3, s: number): Vec3 {
    return [v[0] * s, v[1] * s, v[2] * s];
};

/**
 * 分量乘法 (Vec3)
 */
const cwiseProduct = function(a: Vec3, b: Vec3): Vec3 {
    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
};

export {
    dot,
    dotVec3,
    cross,
    subtract,
    subtractVec3,
    normalize,
    normalizeVec3,
    scaleVec3,
    cwiseProduct,
};
