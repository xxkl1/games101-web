import type { Mat4, Vec4 } from "../math";
import { cross, dot, normalize, subtract } from "../math";

/**
 * 创建相机视图矩阵
 * @param eye 相机位置
 * @param target 目标位置
 * @returns 视图矩阵
 */
const cameraView = function (eye: Vec4, target: Vec4): Mat4 {
    let up: Vec4 = [0, 1, 0, 1];

    // 计算 z 轴（相机的前方向，从 target 指向 eye）
    const zAxis = normalize(subtract(eye, target));

    // 计算 x 轴（相机的右方向）
    // 首先计算 cross，检查结果是否为零向量
    let xAxisRaw = cross(up, zAxis);
    let xAxis: Vec4;

    // 检查 cross 结果是否为零向量（up 和 zAxis 平行的情况）
    if (xAxisRaw[0] === 0 && xAxisRaw[1] === 0 && xAxisRaw[2] === 0) {
        up = [0, 0, 1, 1];
        xAxisRaw = cross(up, zAxis);
    }

    xAxis = normalize(xAxisRaw);

    // 计算 y 轴（相机的上方向）
    const yAxisRaw = cross(zAxis, xAxis);
    const yAxis = normalize(yAxisRaw);

    // 构建视图矩阵
    return [
        xAxis[0], xAxis[1], xAxis[2], -dot(xAxis, eye),
        yAxis[0], yAxis[1], yAxis[2], -dot(yAxis, eye),
        zAxis[0], zAxis[1], zAxis[2], -dot(zAxis, eye),
        0, 0, 0, 1,
    ];
};

export { cameraView };