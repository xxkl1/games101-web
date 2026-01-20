import type { Mat4 } from "../math";

/**
 * 创建 NDC 到屏幕空间的变换矩阵
 * @param screenWidth 屏幕宽度
 * @param screenHeight 屏幕高度
 * @returns NDC 到屏幕空间的变换矩阵
 */
const ndc2Screen = function (screenWidth: number, screenHeight: number): Mat4 {
    return [
        screenWidth / 2, 0, 0, screenWidth / 2,
        0, -screenHeight / 2, 0, screenHeight / 2,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
}

export {
    ndc2Screen,
};
