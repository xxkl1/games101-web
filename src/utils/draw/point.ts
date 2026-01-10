import { getBufferIndex } from "../common/point";
import type { Color, Point } from "./type";

const setPoint = function (imageData: ImageData, point: Point, color: Color) {
    const { x, y } = point;
    if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
        return;
    }

    const index = getBufferIndex({ x, y }, imageData.width) * 4;
    imageData.data.set([color.r, color.g, color.b, color.a], index);
}

/**
 * 画布绘制一个点，屏幕画布最左上角的点是(1, 1)
 * 可以传入x, y为0的点，但是不会被绘制到屏幕上
 * @param imageData 画布，imageData格式 
 * @param point 位置
 * @param color 颜色
 */
const drawPoint = function (imageData: ImageData, point: Point, color: Color) {
    const x = point.x - 1;
    const y = point.y - 1;
    setPoint(imageData, { x, y }, color);
}

export {
    drawPoint,
    setPoint,
}
