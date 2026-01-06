import { Vec4 } from "./vec4";

const perspectiveDivide = function (vec: Vec4) {
    const v = vec.value;
    const w = v[3];
    return new Vec4([v[0] / w, v[1] / w, v[2] / w, 1]);
};

export {
  perspectiveDivide,
}