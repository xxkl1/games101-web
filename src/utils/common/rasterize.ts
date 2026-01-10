import { setPoint } from "../draw/point";
import type { Color, Point } from "../draw/type";
import { multiply, ndc2Screen, Vec4, type Mat4 } from "../matrix";
import { perspectiveDivide, perspectiveDivide2Vec3 } from "../matrix/perspectiveDivide";
import type { Vec3 } from "../matrix/vec3";
import { computeBarycentric2D } from "./barycentric";
import { getBufferIndex, vec3ToPoint } from "./point";
import { insideTriangle } from "./triangle";
import type { TriangleVec4s, TriangleVec3s } from "./type";

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

const getAABBInt = function (triangle: TriangleVec3s) {
    const { p1, p2, p3 } = triangle;

    return {
        xMin: Math.floor(Math.min(p1.value[0], p2.value[0], p3.value[0])),
        xMax: Math.ceil(Math.max(p1.value[0], p2.value[0], p3.value[0])),
        yMin: Math.floor(Math.min(p1.value[1], p2.value[1], p3.value[1])),
        yMax: Math.ceil(Math.max(p1.value[1], p2.value[1], p3.value[1])),
    };
}

const triangleVec3sToTrianglePoints = function (triangleVec3s: TriangleVec3s) {
    const { p1, p2, p3 } = triangleVec3s;
    return {
        p1: vec3ToPoint(p1),
        p2: vec3ToPoint(p2),
        p3: vec3ToPoint(p3),
    }
}

const rasterizer = function (params: {
    triangleList: TriangleVec4s[];
    w: number;
    h: number;
    matModel: Mat4;
    matView: Mat4;
    matProjection: Mat4;
    colorList: Color[];
    imageData: ImageData;
}) {
    const { triangleList, w, h, matModel, matView, matProjection, colorList, imageData } = params;
    const mvp = multiply(matProjection, multiply(matView, matModel));
    const matNdc2Screen = ndc2Screen(w, h);
    const depthBuffer : number[] = new Array(w * h).fill(Infinity);

    for (let i = 0; i < triangleList.length; i++) {
        const triangle = triangleList[i];
        const t = getTriangleRasterize({
            triangle,
            matMVP: mvp,
            matNdc2Screen,
            color: colorList[i],
        });
        const aabb = getAABBInt(t.triangleVec3s);

        for (let x = aabb.xMin; x <= aabb.xMax; x++) {
            for (let y = aabb.yMin; y <= aabb.yMax; y++) {
                if (insideTriangle({ x, y }, triangleVec3sToTrianglePoints(t.triangleVec3s))) {
                    const { alpha, beta, gamma } = computeBarycentric2D({ x, y }, triangleVec3sToTrianglePoints(t.triangleVec3s));
                    const v4d = t.triangleVec4sAfterMVP;
                    const wReciprocal = 1.0 / (alpha / v4d.p1.value[3] + beta / v4d.p2.value[3] + gamma / v4d.p3.value[3]);
                    const zInterpolated = (alpha * v4d.p1.value[2] / v4d.p1.value[3] + beta * v4d.p2.value[2] / v4d.p2.value[3] + gamma * v4d.p3.value[2] / v4d.p3.value[3]) * wReciprocal;
                    const index = getBufferIndex({ x, y }, w);
                    if (zInterpolated < depthBuffer[index]) {
                        depthBuffer[index] = zInterpolated;
                        setPoint(imageData, { x, y }, t.color);
                    }
                }
            }
        }
    }
};

export {
    rasterizer,
}
