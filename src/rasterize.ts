import type { Mat4, Vec4, Vec3, Vec2 } from './math';
import { multiplyMat4Mat4, multiplyMat4Vec4, perspectiveDivide } from "./math";
import { ndc2Screen } from "./transform";
import { type FragmentShader, type FragmentShaderPayload } from "./shader";
import { computeBarycentric2D, insideTriangle } from "./triangle";
import { getBufferIndex, vec3ToVec2 } from "./point";
import type { TriangleVec4, TriangleVec3, TriangleVec2 } from "./triangle/type";
import type { Color } from './color';

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
            r += sample[0];
            g += sample[1];
            b += sample[2];
        }
        r /= sampleCount;
        g /= sampleCount;
        b /= sampleCount;

        imageData.data.set([r, g, b, 255], i * 4);
    }
    return ;
}

const interpolate = function (alpha: number, beta: number, gamma: number,
                       vert1: number[], vert2: number[], vert3: number[],
                       weight: number): number[] {
        const result: number[] = [];
        for (let i = 0; i < vert1.length; i++) {
            result.push((alpha * vert1[i] + beta * vert2[i] + gamma * vert3[i]) / weight);
        }
        return result;
}

const getTriangleRasterize = function (params: {
    triangle: TriangleVec4;
    matModel: Mat4, 
    matView: Mat4,
    matProjection: Mat4,
    matNdc2Screen: Mat4;
}) {
    const { triangle, matModel, matView, matProjection, matNdc2Screen } = params;
    const vec4sAfterMVP: Vec4[] = [];
    const vec3s: Vec3[] = [];
    const viewPos : Vec3[] = [];
    const matMv = multiplyMat4Mat4(matView, matModel);
    const matMVP = multiplyMat4Mat4(matProjection, matMv);

    for (let k = 0; k < triangle.length; k++) {
        const afterMVP = multiplyMat4Vec4(matMVP, triangle[k]);
        // 用于透视校正插值
        vec4sAfterMVP.push(afterMVP);
        const v = multiplyMat4Vec4(matMv, triangle[k]);
        viewPos.push([v[0], v[1], v[2]]);
        // 光栅化到屏幕的坐标，包含z值
        const perspectiveDivided = perspectiveDivide(afterMVP);
        const screenSpace = multiplyMat4Vec4(matNdc2Screen, perspectiveDivided);
        vec3s.push([screenSpace[0], screenSpace[1], screenSpace[2]]);
    }

    return {
        triangleVec4sAfterMVP: [vec4sAfterMVP[0], vec4sAfterMVP[1], vec4sAfterMVP[2]] as TriangleVec4,
        triangleVec3s: [vec3s[0], vec3s[1], vec3s[2]] as TriangleVec3,
        viewPos: [viewPos[0], viewPos[1], viewPos[2]] as TriangleVec3,
    };
};

const getAABBInt = function (triangle: TriangleVec3) {
    const [p1, p2, p3] = triangle;

    return {
        xMin: Math.floor(Math.min(p1[0], p2[0], p3[0])),
        xMax: Math.ceil(Math.max(p1[0], p2[0], p3[0])),
        yMin: Math.floor(Math.min(p1[1], p2[1], p3[1])),
        yMax: Math.ceil(Math.max(p1[1], p2[1], p3[1])),
    };
}

const triangleVec3ToTriangleVec2 = function (triangleVec3s: TriangleVec3) : TriangleVec2 {
    const [p1, p2, p3] = triangleVec3s;
    return [
        vec3ToVec2(p1),
        vec3ToVec2(p2),
        vec3ToVec2(p3),
    ];
}

type TriangleRasterize = {
    indices: [number, number, number];
    positions: TriangleVec4;
    normals: TriangleVec3;
    colors: [Color, Color, Color];
    texcoords: [[number, number], [number, number], [number, number]];
}

const getDataByVertexIndex = function (datas: number[], vertexIndex: number, size: number) : number[] {
    const start = vertexIndex * size;
    const end = start + size;
    return datas.slice(start, end);
}

const getPositionByVertexIndex = function (positions: number[], vertexIndex: number) : Vec4 {
    const l = getDataByVertexIndex(positions, vertexIndex, 3);
    return [l[0], l[1], l[2], 1];
}

const getNormalByVertexIndex = function (positions: number[], vertexIndex: number) : Vec3 {
    const l = getDataByVertexIndex(positions, vertexIndex, 3);
    return [l[0], l[1], l[2]];
}

const getTexcoordByVertexIndex = function (positions: number[], vertexIndex: number) : Vec2 {
    const l = getDataByVertexIndex(positions, vertexIndex, 2);
    return [l[0], l[1]];
}

const getColorByVertexIndex = function (positions: number[], vertexIndex: number) : Color {
    const l = getDataByVertexIndex(positions, vertexIndex, 4);
    return [l[0], l[1], l[2], l[3]];
}

const getTriangleList = function (params: {
    positions: number[];
    colors: number[];
    indices: number[];
    texcoords: number[];
    normals: number[];
}) {
    const { positions, colors, indices, texcoords, normals } = params;
    const r : TriangleRasterize[] = []; 
    for (let i = 0; i < indices.length; i += 3) {
        const index0 = indices[i];
        const index1 = indices[i + 1];
        const index2 = indices[i + 2];
        r.push({
            indices: [index0, index1, index2],
            positions: [getPositionByVertexIndex(positions, index0), getPositionByVertexIndex(positions, index1), getPositionByVertexIndex(positions, index2)],
            normals: [getNormalByVertexIndex(normals, index0), getNormalByVertexIndex(normals, index1), getNormalByVertexIndex(normals, index2)],
            texcoords: [getTexcoordByVertexIndex(texcoords, index0), getTexcoordByVertexIndex(texcoords, index1), getTexcoordByVertexIndex(texcoords, index2)],
            colors: [getColorByVertexIndex(colors, index0), getColorByVertexIndex(colors, index0), getColorByVertexIndex(colors, index0)],
        })
    }
    return r;
}

const rasterizer = function (params: {
    positions: number[];
    colors: number[];
    indices: number[];
    texcoords: number[];
    normals: number[];
    w: number;
    h: number;
    fragmentShader: FragmentShader;
    matModel: Mat4;
    matView: Mat4;
    matProjection: Mat4;
    imageData: ImageData;
    ssaa?: number;
    texture: ImageData;
}) {
    const { w, h, matModel, matView, matProjection, positions, colors, indices, imageData, ssaa = 2, normals, texcoords, texture,fragmentShader } = params;
    const matNdc2Screen = ndc2Screen(w, h);
    const bufferLenSass = w * h * ssaa * ssaa
    const depthBuffer : number[] = new Array(bufferLenSass).fill(Infinity);
    const ssaaBuffer : Color[] = new Array(bufferLenSass).fill([0, 0, 0, 255]);

    const triangleList = getTriangleList({
        positions,
        colors,
        indices,
        texcoords,
        normals,
    });


    for (let indexTriangleList = 0; indexTriangleList < triangleList.length; indexTriangleList++) {
        const triangle = triangleList[indexTriangleList];
        const t = getTriangleRasterize({
            triangle: triangle.positions,
            matModel, 
            matView,
            matProjection,
            matNdc2Screen,
        });
        const aabb = getAABBInt(t.triangleVec3s);

        for (let x = aabb.xMin; x <= aabb.xMax; x++) {
            for (let y = aabb.yMin; y <= aabb.yMax; y++) {
                for (let j = 0; j < ssaa; j++) {
                    for (let i = 0; i < ssaa; i++) {
                        // 计算子采样点的位置
                        const sampleX = x + 1.0 / (2 * ssaa) + i * 1.0 / ssaa;
                        const sampleY = y + 1.0 / (2 * ssaa) + j * 1.0 / ssaa;
                        if (insideTriangle([sampleX, sampleY], triangleVec3ToTriangleVec2(t.triangleVec3s))) {
                            const [alpha, beta, gamma] = computeBarycentric2D([x, y], triangleVec3ToTriangleVec2(t.triangleVec3s));
                            const v4d = t.triangleVec4sAfterMVP;
                            const wReciprocal = 1.0 / (alpha / v4d[0][3] + beta / v4d[1][3] + gamma / v4d[2][3]);
                            const zInterpolated = (alpha * v4d[0][2] / v4d[0][3] + beta * v4d[1][2] / v4d[1][3] + gamma * v4d[2][2] / v4d[2][3]) * wReciprocal;
                            const index = getBufferIndex([x, y], w) * ssaa * ssaa + (j * ssaa + i);

                            // 透视校正插值颜色
                            const interpolatedColor = interpolate(
                                alpha / v4d[0][3], beta / v4d[0][3], gamma / v4d[1][3],
                                triangle.colors[0], triangle.colors[1], triangle.colors[2],
                                1.0 / wReciprocal
                            );

                            // 透视校正插值法线
                            let interpolatedNormal = [0, 0, 0];
                            if (triangle.normals.length > 0) {
                                interpolatedNormal = interpolate(
                                    alpha / v4d[0][3], beta / v4d[0][3], gamma / v4d[1][3],
                                    triangle.normals[0], triangle.normals[1], triangle.normals[2],
                                    1.0 / wReciprocal
                                );
                            }

                            // 透视校正插值纹理坐标
                            let interpolatedTexcoords = [0, 0];
                            if (triangle.texcoords.length > 0) {
                                interpolatedTexcoords = interpolate(
                                    alpha / v4d[0][3], beta / v4d[0][3], gamma / v4d[1][3],
                                    triangle.texcoords[0], triangle.texcoords[1], triangle.texcoords[2],
                                    1.0 / wReciprocal
                                );
                            }


                            // 透视校正插值观察空间位置
                            let interpolatedViewpos = [0, 0, 0];
                            if (t.viewPos.length === 3) {
                                interpolatedViewpos = interpolate(
                                    alpha / v4d[0][3], beta / v4d[0][3], gamma / v4d[1][3],
                                    t.viewPos[0], t.viewPos[1], t.viewPos[2],
                                    1.0 / wReciprocal
                                );
                            }

                            // 创建片段着色器输入
                            const payload: FragmentShaderPayload = {
                                viewPos: interpolatedViewpos as Vec3,
                                color: interpolatedColor as Vec3,
                                normal: interpolatedNormal as Vec3,
                                texCoords: [...interpolatedTexcoords, 0] as Vec3,
                                texture: texture
                            };

                            if (zInterpolated < depthBuffer[index]) {
                                depthBuffer[index] = zInterpolated;
                                const c = fragmentShader(payload);
                                ssaaBuffer[index] = [c[0], c[1], c[2], 255];
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
