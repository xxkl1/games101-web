import { drawLine } from "../src/imageData/line";
import {
    multiplyMat4Mat4,
    multiplyMat4Vec4,
    perspectiveDivide,
} from "../src/math";
import { rotate, cameraView, projection, ndc2Screen } from "../src/transform";
import { vec4ToVec2 } from "../src/point";
import { ensure } from "./ensure";

const testDrawMVP = function () {
    const w = 10;
    const h = 10;

    const m = rotate([0, 0, 1, 1], Math.PI / 4);
    const v = cameraView([0, 0, 15, 1], [0, 0, -5, 1]);
    const p = projection(45, w / h, 0.1, 100);

    const mvp = multiplyMat4Mat4(p, multiplyMat4Mat4(v, m));
    const ndc2ScreenMat = ndc2Screen(w, h);

    const imageData = new ImageData(w, h);
    const p1 = vec4ToVec2(
        multiplyMat4Vec4(
            ndc2ScreenMat,
            perspectiveDivide(multiplyMat4Vec4(mvp, [0, 5, -5, 1]))
        )
    );
    const p2 = vec4ToVec2(
        multiplyMat4Vec4(
            ndc2ScreenMat,
            perspectiveDivide(multiplyMat4Vec4(mvp, [5, 0, -5, 1]))
        )
    );
    const p3 = vec4ToVec2(
        multiplyMat4Vec4(
            ndc2ScreenMat,
            perspectiveDivide(multiplyMat4Vec4(mvp, [-5, -5, -5, 1]))
        )
    );

    drawLine(imageData, p1, p2, [255, 0, 0, 255]);
    drawLine(imageData, p2, p3, [0, 255, 0, 255]);
    drawLine(imageData, p3, p1, [0, 0, 255, 255]);

    const expect = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 0, 0, 255, 255,
        0, 0, 255, 255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 255, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 0, 0, 0, 0, 0, 255, 0, 255, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 255, 255, 0, 0, 0, 0, 0, 255, 0, 255, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        255, 255, 0, 0, 0, 0, 0, 255, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    ensure(Array.from(imageData.data), expect, "testDrawMVP");
};

export { testDrawMVP };
