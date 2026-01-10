import { rasterizer } from "./utils/common/rasterize";
import { projection, rotate, Vec4, viewMat } from "./utils/matrix";

const main = function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const w = canvas.width;
  const h = canvas.height;

  const imageData = new ImageData(w, h);
  rasterizer({
    triangleList: [
      {
        p1: new Vec4([2, 0, -2, 1]),
        p2: new Vec4([0, 2, -2, 1]),
        p3: new Vec4([-2, 0, -2, 1]),
      },
      {
        p1: new Vec4([3.5, -1, -5, 1]),
        p2: new Vec4([2.5, 1.5, -5, 1]),
        p3: new Vec4([-1, 0.5, -5, 1]),
      },
    ],
    w,
    h,
    matModel: rotate(new Vec4([0, 0, 1, 1]), 0),
    matView: viewMat(new Vec4([0, 0, 5, 1]), new Vec4([0, 0, -5, 1])),
    matProjection: projection(45, w / h, 0.1, 50),
    colorList: [
      { r: 217, g: 238, b: 185, a: 255 },
      { r: 185, g: 217, b: 238, a: 255 },
    ],
    imageData: imageData,
  })

  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(imageData, 0, 0);
};

main();