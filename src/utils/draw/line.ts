import { drawPoint } from "./point";
import type { Color, Point } from "./type";

/**
 * 使用布雷森汉姆直线算法，暂时不考虑去掉浮点数的优化，目前去掉浮点数的优化目前简单测试对js无效
 * @param imageData 画布
 * @param start 起点
 * @param end 终点
 * @param color 颜色
 */
const drawLine = function (imageData: ImageData, start: Point, end: Point, color: Color) {
    const steep = Math.abs(end.y - start.y) > Math.abs(end.x - start.x);
    // 斜率大于1，先进行反射变换，以保证转换为斜率小于等于1
    if (steep) {
        [start.x, start.y] = [start.y, start.x];
        [end.x, end.y] = [end.y, end.x];
    }

    if (start.x > end.x) {
        [start.x, end.x] = [end.x, start.x];
        [start.y, end.y] = [end.y, start.y];
    }

    const dx = end.x - start.x;
    const dy = Math.abs(end.y - start.y);

    let error = 0;
    let dError = dy / dx;

    let yStep: number;

    if (start.y < end.y) {
        yStep = 1;
    } else {
        yStep = -1;
    }

    let y = start.y;
    for (let x = start.x; x <= end.x; x++) {
        if (steep) {
            drawPoint(imageData, { x: y, y: x }, color);
        } else {
            drawPoint(imageData, { x, y }, color);
        }
        error += dError;
        if (error >= 0.5) {
            y += yStep;
            error -= 1;
        }
    }
}

export {
  drawLine,
}