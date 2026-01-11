import { setPoint } from "../draw/point";
import type { Color, Point } from "../draw/type";
import { multiply, ndc2Screen, Vec4, type Mat4 } from "../matrix";
import { perspectiveDivide, perspectiveDivide2Vec3 } from "../matrix/perspectiveDivide";
import type { Vec3 } from "../matrix/vec3";
import { computeBarycentric2D } from "./barycentric";
import { getBufferIndex, vec3ToPoint } from "./point";
import { insideTriangle } from "./triangle";
import type { TriangleVec4s, TriangleVec3s } from "./type";

const ssaaBuffer2ImageData = function (imageData: ImageData, ssaaBuffer: Color[], ssaa: number) {
    const sampleCount = ssaa * ssaa;
    const w = imageData.width;
    const h = imageData.height;

    for (let i = 0; i < w * h; i++) {
        let r = 0;
        let g = 0;
        let b = 0;
        for (let j = 0; j < sampleCount; j++) {
            const sample = ssaaBuffer[i * sampleCount + j];
            r += sample.r;
            g += sample.g;
            b += sample.b;
        }
        r /= sampleCount;
        g /= sampleCount;
        b /= sampleCount;

        imageData.data.set([r, g, b, 255], i * 4);
    }
    return ;
}

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
    positions: number[];
    colors: number[];
    indices: number[];
    w: number;
    h: number;
    matModel: Mat4;
    matView: Mat4;
    matProjection: Mat4;
    imageData: ImageData;
    ssaa?: number;
}) {
    const { w, h, matModel, matView, matProjection, positions, colors, indices, imageData, ssaa = 2 } = params;
    const mvp = multiply(matProjection, multiply(matView, matModel));
    const matNdc2Screen = ndc2Screen(w, h);
    const bufferLenSass = w * h * ssaa * ssaa
    const depthBuffer : number[] = new Array(bufferLenSass).fill(Infinity);
    const ssaaBuffer : Color[] = new Array(bufferLenSass).fill({ r: 0, g: 0, b: 0, a: 255 });

    // TODO: 后面数据还是都使用数组来存放吧，虽然数组语意性没那么好，但是可以避免很多的数据结构转换，且查询性能会更好
    const triangleList: TriangleVec4s[] = [];
    const colorList: Color[] = [];
    for (let i = 0; i < indices.length; i += 3) {
        const p1 = positions.slice(indices[i] * 3, indices[i] * 3 + 3);
        const p2 = positions.slice(indices[i + 1] * 3, indices[i + 1] * 3 + 3);
        const p3 = positions.slice(indices[i + 2] * 3, indices[i + 2] * 3 + 3);
        const c = colors.slice(indices[i] * 3, indices[i] * 3 + 3);
        triangleList.push({ p1: new Vec4([...p1, 1]), p2: new Vec4([...p2, 1]), p3: new Vec4([...p3, 1]) });
        colorList.push({ r: c[0], g: c[1], b: c[2], a: 255 })
    }

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
                for (let j = 0; j < ssaa; j++) {
                    for (let i = 0; i < ssaa; i++) {
                        // 计算子采样点的位置
                        const sampleX = x + 1.0 / (2 * ssaa) + i * 1.0 / ssaa;
                        const sampleY = y + 1.0 / (2 * ssaa) + j * 1.0 / ssaa;
                        if (insideTriangle({ x: sampleX, y: sampleY }, triangleVec3sToTrianglePoints(t.triangleVec3s))) {
                            const { alpha, beta, gamma } = computeBarycentric2D({ x, y }, triangleVec3sToTrianglePoints(t.triangleVec3s));
                            const v4d = t.triangleVec4sAfterMVP;
                            const wReciprocal = 1.0 / (alpha / v4d.p1.value[3] + beta / v4d.p2.value[3] + gamma / v4d.p3.value[3]);
                            const zInterpolated = (alpha * v4d.p1.value[2] / v4d.p1.value[3] + beta * v4d.p2.value[2] / v4d.p2.value[3] + gamma * v4d.p3.value[2] / v4d.p3.value[3]) * wReciprocal;
                            const index = getBufferIndex({ x, y }, w) * ssaa * ssaa + (j * ssaa + i);
                            if (zInterpolated < depthBuffer[index]) {
                                depthBuffer[index] = zInterpolated;
                                ssaaBuffer[index] = t.color;
                            }
                        }
                    }
                }
            }
        }
    }

    ssaaBuffer2ImageData(imageData, ssaaBuffer, ssaa);
};

export {
    rasterizer,
}
