import { setPoint } from "./point";
import type { Vec2 } from "../math";
import type { Color } from "../color";

const copyVec2 = function (point: Vec2) : Vec2 {
    return [point[0], point[1]];
}

/**
 * 使用布雷森汉姆直线算法，暂时不考虑去掉浮点数的优化，目前去掉浮点数的优化目前简单测试对js无效
 * @param imageData 画布
 * @param start 起点
 * @param end 终点
 * @param color 颜色
 */
const drawLine = function (imageData: ImageData, start: Vec2, end: Vec2, color: Color) {
    start = copyVec2(start);
    end = copyVec2(end);
    start[0] = Math.round(start[0]);
    start[1] = Math.round(start[1]);
    end[0] = Math.round(end[0]);
    end[1] = Math.round(end[1]);

    const steep = Math.abs(end[1] - start[1]) > Math.abs(end[0] - start[0]);
    // 斜率大于1，先进行反射变换，以保证转换为斜率小于等于1
    if (steep) {
        [start[0], start[1]] = [start[1], start[0]];
        [end[0], end[1]] = [end[1], end[0]];
    }

    if (start[0] > end[0]) {
        [start[0], end[0]] = [end[0], start[0]];
        [start[1], end[1]] = [end[1], start[1]];
    }

    const dx = end[0] - start[0];
    const dy = Math.abs(end[1] - start[1]);

    let error = 0;
    let dError = dy / dx;

    let yStep: number;

    if (start[1] < end[1]) {
        yStep = 1;
    } else {
        yStep = -1;
    }

    let y = start[1];
    for (let x = start[0]; x <= end[0]; x++) {
        if (steep) {
            setPoint(imageData, [y, x], color);
        } else {
            setPoint(imageData, [x, y], color);
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
