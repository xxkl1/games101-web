import type { Point } from "../draw/type";
import type { Barycentric, TrianglePoints } from "./type";

const computeBarycentric2D = function (p: Point, triangle: TrianglePoints) : Barycentric {
    const x = p.x;
    const y = p.y;
    const p1 = triangle.p1;
    const p2 = triangle.p2;
    const p3 = triangle.p3;

    // 计算 alpha (对应 p1)
    const alphaNumerator = x * (p2.y - p3.y) + (p3.x - p2.x) * y + p2.x * p3.y - p3.x * p2.y;
    const alphaDenominator = p1.x * (p2.y - p3.y) + (p3.x - p2.x) * p1.y + p2.x * p3.y - p3.x * p2.y;
    const alpha = alphaNumerator / alphaDenominator;

    // 计算 beta (对应 p2)
    const betaNumerator = x * (p3.y - p1.y) + (p1.x - p3.x) * y + p3.x * p1.y - p1.x * p3.y;
    const betaDenominator = p2.x * (p3.y - p1.y) + (p1.x - p3.x) * p2.y + p3.x * p1.y - p1.x * p3.y;
    const beta = betaNumerator / betaDenominator;

    // 计算 gamma (对应 p3)
    const gammaNumerator = x * (p1.y - p2.y) + (p2.x - p1.x) * y + p1.x * p2.y - p2.x * p1.y;
    const gammaDenominator = p3.x * (p1.y - p2.y) + (p2.x - p1.x) * p3.y + p1.x * p2.y - p2.x * p1.y;
    const gamma = gammaNumerator / gammaDenominator;

    return { alpha, beta, gamma };
}

export {
  computeBarycentric2D,
}