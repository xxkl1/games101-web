import { rasterizer } from "./utils/common/rasterize";
import { projection, rotate, Vec4, viewMat } from "./utils/matrix";

const main = function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const w = canvas.width;
  const h = canvas.height;

  const imageData = new ImageData(w, h);
  rasterizer({
    triangle: {
      p1: new Vec4([0, 5, -5, 1]),
      p2: new Vec4([5, 0, -5, 1]),
      p3: new Vec4([-5, -5, -5, 1]),
    },
    w,
    h,
    matModel: rotate(new Vec4([0, 0, 1, 1]), Math.PI / 4),
    matView: viewMat(new Vec4([0, 0, 15, 1]), new Vec4([0, 0, -5, 1])),
    matProjection: projection(45, w / h, 0.1, 100),
    color: { r: 255, g: 0, b: 0, a: 255 },
    imageData: imageData,
  })

  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(imageData, 0, 0);
};

main();