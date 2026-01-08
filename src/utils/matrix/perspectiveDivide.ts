import { Vec3 } from "./vec3";
import { Vec4 } from "./vec4";

const perspectiveDivide = function (vec: Vec4) {
    const v = vec.value;
    const w = v[3];
    return new Vec4([v[0] / w, v[1] / w, v[2] / w, 1]);
};

const perspectiveDivide2Vec3 = function (vec: Vec4) {
    const v = vec.value;
    const w = v[3];
    return new Vec3([v[0] / w, v[1] / w, v[2] / w]);
};

export {
  perspectiveDivide,
  perspectiveDivide2Vec3,
}