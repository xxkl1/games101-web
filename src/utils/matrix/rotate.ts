import { Mat4 } from "../matrix";
import type { Vec4 } from "./vec4";

const rotate = function (n: Vec4, theta: number) {
    // n: [x, y, z]
    let [x, y, z] = n.value;

    // normalize
    const len = Math.hypot(x, y, z);

    if (len === 0) throw new Error("axis length is zero");
    x /= len;
    y /= len;
    z /= len;

    const c = Math.cos(theta);
    const s = Math.sin(theta);
    const t = 1 - c;

    return new Mat4([
        t * x * x + c, t * x * y - s * z, t * x * z + s * y, 0,
        t * x * y + s * z, t * y * y + c, t * y * z - s * x, 0,
        t * x * z - s * y, t * y * z + s * x, t * z * z + c, 0,
        0, 0, 0, 1,
    ]);
};

export { rotate };
