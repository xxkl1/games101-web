import { getBufferIndex } from "../point";
import type { Vec2 } from "../math";
import type { Color } from "../color";

const setPoint = function (imageData: ImageData, point: Vec2, color: Color) {
    const [x, y] = point;
    if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
        return;
    }

    const index = getBufferIndex([x, y], imageData.width) * 4;
    imageData.data.set([color[0], color[1], color[2], color[3]], index);
}

export {
    setPoint,
}
