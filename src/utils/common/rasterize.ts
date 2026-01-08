import { drawLine } from "../draw/line";
import type { Color } from "../draw/type";
import { multiply, ndc2Screen, Vec4, type Mat4 } from "../matrix";
import { perspectiveDivide, perspectiveDivide2Vec3 } from "../matrix/perspectiveDivide";
import type { Vec3 } from "../matrix/vec3";
import { vec3ToPoint } from "./point";
import type { TriangleVec4s } from "./type";

const getTriangleRasterize = function (params: {
    triangle: TriangleVec4s;
    matMVP: Mat4;
    matNdc2Screen: Mat4;
    color: Color;
}) {
    const { triangle, matMVP, matNdc2Screen, color } = params;
    const vec4sAfterMVP: Vec4[] = [];
    const vec3s: Vec3[] = [];
    for (let k in triangle) {
        const afterMVP = multiply(matMVP, triangle[k as keyof TriangleVec4s]);
        // 用于透视校正插值
        vec4sAfterMVP.push(afterMVP);

        // 光栅化到屏幕的坐标，包含z值
        vec3s.push(perspectiveDivide2Vec3(multiply(matNdc2Screen, perspectiveDivide(afterMVP))));
    }


    return {
        triangleVec4sAfterMVP: {
            p1: vec4sAfterMVP[0],
            p2: vec4sAfterMVP[1],
            p3: vec4sAfterMVP[2],
        },
        triangleVec3s: {
            p1: vec3s[0],
            p2: vec3s[1],
            p3: vec3s[2],
        },
        color,
    };
};

const rasterizer = function (params: {
    triangle: TriangleVec4s;
    w: number;
    h: number;
    matModel: Mat4;
    matView: Mat4;
    matProjection: Mat4;
    color: Color;
    imageData: ImageData;
}) {
    const { triangle, w, h, matModel, matView, matProjection, color, imageData } = params;
    const mvp = multiply(matProjection, multiply(matView, matModel));
    const matNdc2Screen = ndc2Screen(w, h);

    const t = getTriangleRasterize({
        triangle,
        matMVP: mvp,
        matNdc2Screen,
        color,
    });

    drawLine(imageData, vec3ToPoint(t.triangleVec3s.p1), vec3ToPoint(t.triangleVec3s.p2), t.color);
    drawLine(imageData, vec3ToPoint(t.triangleVec3s.p2), vec3ToPoint(t.triangleVec3s.p3), t.color);
    drawLine(imageData, vec3ToPoint(t.triangleVec3s.p3), vec3ToPoint(t.triangleVec3s.p1), t.color);
};

export {
    rasterizer,
}
