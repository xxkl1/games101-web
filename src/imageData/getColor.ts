import type { Color } from "../color";


// TODO: 需要进行代码整理，将其他地方对于image data相关的操作函数和集合起来
const getPixel = function (
    imageData: ImageData,
    x: number,
    y: number
): Color {
    const { width } = imageData;

    const index = (y * width + x) * 4;

    return [
        imageData.data[index],
        imageData.data[index + 1],
        imageData.data[index + 2],
        imageData.data[index + 3],
    ]
};

/**
 * 获取指定 UV 坐标的颜色（最近邻采样）
 * @param u U 坐标 [0, 1]
 * @param v V 坐标 [0, 1]
 * @returns [R, G, B] 颜色值 (0-255)
 */
const getColor = function (imageData: ImageData, u: number, v: number): Color {
    const { width, height } = imageData
    // 坐标夹限到 [0, 1]
    u = Math.max(0, Math.min(1, u));
    v = Math.max(0, Math.min(1, v));

    // 转换到图像坐标
    const xImage = Math.floor(u * (width - 1));
    const yImage = Math.floor((1 - v) * (height - 1)); // 翻转 v 坐标

    return getPixel(imageData, xImage, yImage);
};

/**
 * 获取指定 UV 坐标的颜色（双线性插值采样）
 * @param u U 坐标 [0, 1]
 * @param v V 坐标 [0, 1]
 * @returns [R, G, B] 颜色值 (0-255)
 */
const getColorBilinear = function (
    imageData: ImageData,
    u: number,
    v: number
): Color {
    const { width, height } = imageData;
    // 坐标夹限到 [0, 1]
    u = Math.max(0, Math.min(1, u));
    v = Math.max(0, Math.min(1, v));

    // 转换到图像坐标
    const xImage = u * width;
    const yImage = (1 - v) * height;

    // 计算四个相邻像素的坐标
    let x0 = Math.floor(xImage - 0.5);
    let x1 = x0 + 1;
    let y0 = Math.floor(yImage - 0.5);
    let y1 = y0 + 1;

    // 边界夹限
    x0 = Math.max(0, x0);
    x1 = Math.min(width - 1, x1);
    y0 = Math.max(0, y0);
    y1 = Math.min(height - 1, y1);

    // 获取四个角点的颜色
    const color00 = getPixel(imageData, x0, y0);
    const color01 = getPixel(imageData, x1, y0);
    const color10 = getPixel(imageData, x0, y1);
    const color11 = getPixel(imageData, x1, y1);

    // 计算插值权重
    const s = xImage - (x0 + 0.5);
    const t = yImage - (y0 + 0.5);

    // 双线性插值
    const color0 = [
        color00[0] + s * (color01[0] - color00[0]),
        color00[1] + s * (color01[1] - color00[1]),
        color00[2] + s * (color01[2] - color00[2]),
    ];

    const color1 = [
        color10[0] + s * (color11[0] - color10[0]),
        color10[1] + s * (color11[1] - color10[1]),
        color10[2] + s * (color11[2] - color10[2]),
    ];

    return [
      color0[0] + t * (color1[0] - color0[0]),
      color0[1] + t * (color1[1] - color0[1]),
      color0[2] + t * (color1[2] - color0[2]),
      255,
    ]
};

export {
    getColor,
    getColorBilinear,
}
