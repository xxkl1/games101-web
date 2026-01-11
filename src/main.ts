import { rasterizer } from "./utils/common/rasterize";
import { projection, rotate, Vec4, viewMat } from "./utils/matrix";

const main = function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const w = canvas.width;
  const h = canvas.height;

  // 定义三角形的三个顶点位置
  const positions = [
      2, 0, -2,   // 顶点0
      0, 2, -2,   // 顶点1
      -2, 0, -2,   // 顶点2

      3.5, -1, -5 ,   // 顶点3
      2.5, 1.5, -5,   // 顶点4
      -1, 0.5, -5  // 顶点5
  ];

  // 定义索引（两个三角形）
  const indices = [0, 1, 2, 3, 4, 5];

  // 定义顶点颜色（每个顶点对应一个RGB颜色）
  const colors = [
      217.0, 238.0, 185.0,  // 顶点0 - 浅绿色
      217.0, 238.0, 185.0,  // 顶点1 - 浅绿色
      217.0, 238.0, 185.0,  // 顶点2 - 浅绿色
      185.0, 217.0, 238.0,  // 顶点3 - 浅蓝色
      185.0, 217.0, 238.0,  // 顶点4 - 浅蓝色
      185.0, 217.0, 238.0,  // 顶点5 - 浅蓝色
  ]

  const imageData = new ImageData(w, h);
  rasterizer({
    positions,
    colors,
    indices,
    w,
    h,
    matModel: rotate(new Vec4([0, 0, 1, 1]), 0),
    matView: viewMat(new Vec4([0, 0, 5, 1]), new Vec4([0, 0, -5, 1])),
    matProjection: projection(45, w / h, 0.1, 50),
    imageData: imageData,
  })

  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(imageData, 0, 0);
};

main();