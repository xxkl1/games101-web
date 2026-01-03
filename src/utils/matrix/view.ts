import { cross, dot, normalize, subtract } from "./helper";
import { Mat4 } from "./mat4";
import { Vec4 } from "./vec4";

const viewMat = function (eye: Vec4, target: Vec4) {
    let up = new Vec4([0, 1, 0, 1]);
    const zAxis = normalize(subtract(eye, target));
    let xAxis = normalize(cross(up, zAxis));
    if (isNaN(xAxis.value[0]) || isNaN(xAxis.value[1]) || isNaN(xAxis.value[2])) {
        up = new Vec4([0, 0, 1, 1]);
        xAxis = normalize(cross(up, zAxis));
    }
    const yAxis = normalize(cross(zAxis, xAxis));
    return new Mat4([
        xAxis.value[0], xAxis.value[1], xAxis.value[2], -dot(xAxis, eye),
        yAxis.value[0], yAxis.value[1], yAxis.value[2], -dot(yAxis, eye),
        zAxis.value[0], zAxis.value[1], zAxis.value[2], -dot(zAxis, eye),
        0, 0, 0, 1,
    ]);
}

export {
    viewMat,
}