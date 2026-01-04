import { drawLine } from "../src/utils/draw/line";
import {
    multiply,
    ndc2Screen,
    projection,
    rotate,
    Vec4,
    viewMat,
} from "../src/utils/matrix";
import { vec4ToPoint } from "../src/utils/common";
import { ensure } from "./ensure";

const testDrawMVP = function () {
    const w = 10;
    const h = 10;

    const m = rotate(new Vec4([0, 0, 1, 1]), Math.PI / 4);
    const v = viewMat(new Vec4([0, 0, 15, 1]), new Vec4([0, 0, -5, 1]));
    const p = projection(45, w / h, 0.1, 100);

    const mvp = multiply(p, multiply(v, m));
    const ndc2ScreenMat = ndc2Screen(w, h);

    const imageData = new ImageData(w, h);
    const p1 = vec4ToPoint(
        multiply(
            ndc2ScreenMat,
            multiply(mvp, new Vec4([0, 5, -5, 1])).perspectiveDivide()
        )
    );
    const p2 = vec4ToPoint(
        multiply(
            ndc2ScreenMat,
            multiply(mvp, new Vec4([5, 0, -5, 1])).perspectiveDivide()
        )
    );
    const p3 = vec4ToPoint(
        multiply(
            ndc2ScreenMat,
            multiply(mvp, new Vec4([-5, -5, -5, 1])).perspectiveDivide()
        )
    );

    drawLine(imageData, p1, p2, { r: 255, g: 0, b: 0, a: 255 });
    drawLine(imageData, p2, p3, { r: 0, g: 255, b: 0, a: 255 });
    drawLine(imageData, p3, p1, { r: 0, g: 0, b: 255, a: 255 });
    ensure(
        Array.from(imageData.data),
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255,
            255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 0, 255, 0, 255,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 255, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 255, 255, 0, 0, 0, 0, 0, 255, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255,
            255, 0, 0, 0, 0, 0, 255, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 0,
            0, 0, 0, 0, 255, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255,
            255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        "testDrawMVP"
    );
};

export { testDrawMVP };
