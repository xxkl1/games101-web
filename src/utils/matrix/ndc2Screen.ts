import { Mat4 } from "./mat4";

const ndc2Screen = function (screenWidth: number, screenHeight: number) {
  return new Mat4([
      screenWidth / 2, 0, 0, screenWidth / 2,
      0, -screenHeight / 2, 0, screenHeight / 2,
      0, 0, 1, 0,
      0, 0, 0, 1,
  ]);
}

export {
    ndc2Screen,
}