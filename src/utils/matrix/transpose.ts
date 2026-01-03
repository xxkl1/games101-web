import { Mat4 } from "./mat4";

const transpose = function (mat4: Mat4) {
    const v = mat4.value;
    const out = new Mat4([
      v[0], v[4], v[8], v[12],
      v[1], v[5], v[9], v[13],
      v[2], v[6], v[10], v[14],
      v[3], v[7], v[11], v[15],
    ]);
    return out;
};

export { transpose };
