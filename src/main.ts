import { rasterizer } from "./rasterize";
import { loadImageByImageUrl } from "./imageData/load";
import { projection, rotate, cameraView } from "./transform";
import { loadObjFromUrl } from "./obj";
import { textureShader } from "./shader";

const main = async function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const w = canvas.width;
  const h = canvas.height;
  const texture = await loadImageByImageUrl('/models/spot/spot_texture.png');

  const model = await loadObjFromUrl('/models/spot/spot_triangulated_good.obj');
  const mesh = model.meshes[0];

  const colors: number[] = [];
  for (let i = 0; i < mesh.positions.length / 3; i++) {
      colors.push(255, 255, 255, 255);
  }

  const imageData = new ImageData(w, h);
  rasterizer({
    positions: mesh.positions,
    colors,
    indices: mesh.indices,
    w,
    h,
    matModel: rotate([0, 1, 0, 1], Math.PI / 180 * 135),
    matView: cameraView([0, 0, 5, 1], [0, 0, -5, 1]),
    matProjection: projection(45, w / h, 0.1, 50),
    imageData: imageData,
    fragmentShader: textureShader,
    texture,
    normals: mesh.normals,
    texcoords: mesh.texcoords,
  })

  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(imageData, 0, 0);
};

main();
