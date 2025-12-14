import { drawPoint } from "../src/utils/draw/point";
import { ensure } from "./ensure";
import { randomInt } from "../src/utils/common";

/**
 * 设置常规的颜色设置
 */
const testDrawPoint1 = function () {
  const imageData = new ImageData(2, 2);
  drawPoint(imageData, { x: 1, y: 1 }, { r: 0, g: 0, b: 0, a: 255 });
  drawPoint(imageData, { x: 2, y: 1 }, { r: 255, g: 0, b: 0, a: 255 });
  drawPoint(imageData, { x: 1, y: 2 }, { r: 0, g: 255, b: 0, a: 255 });
  drawPoint(imageData, { x: 2, y: 2 }, { r: 0, g: 0, b: 255, a: 125 });

  ensure(
    Array.from(imageData.data),
    [
      0, 0, 0, 255,
      255, 0, 0, 255,
      0, 255, 0, 255,
      0, 0, 255, 125,
    ], 
    "testDrawPoint1"
  );
}

/**
 * 越界处理
 */
const testDrawPoint2 = function () {
  const imageData = new ImageData(1, 1);
  drawPoint(imageData, { x: 0, y: 0 }, { r: 0, g: 0, b: 0, a: 255 });
  drawPoint(imageData, { x: 0, y: 2 }, { r: 0, g: 0, b: 0, a: 255 });
  drawPoint(imageData, { x: 2, y: 0 }, { r: 0, g: 0, b: 0, a: 255 });
  drawPoint(imageData, { x: 2, y: 2 }, { r: 0, g: 0, b: 0, a: 255 });

  ensure(
    Array.from(imageData.data),
    [
      0, 0, 0, 0,
    ], 
    "testDrawPoint2"
  );
}

/**
 * 随机颜色
 */
const testDrawPoint3 = function () {
  const color = {
    r: randomInt(0, 255),
    g: randomInt(0, 255),
    b: randomInt(0, 255),
    a: randomInt(0, 255),
  };

  const imageData = new ImageData(1, 1);
  drawPoint(imageData, { x: 1, y: 1 }, color);

  ensure(
    Array.from(imageData.data),
    [color.r, color.g, color.b, color.a,], 
    "testDrawPoint3"
  );
}

const testDrawPoint = function () {
  testDrawPoint1();
  testDrawPoint2();
  testDrawPoint3();
};

export {
  testDrawPoint,
}