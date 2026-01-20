import { setPoint } from "../src/imageData/point";
import { ensure } from "./ensure";
import { randomInt } from "../src/random";

/**
 * 设置常规的颜色设置
 */
const testDrawPoint1 = function () {
  const imageData = new ImageData(2, 2);
  setPoint(imageData, [0, 0], [0, 0, 0, 255]);
  setPoint(imageData, [1, 0], [255, 0, 0, 255]);
  setPoint(imageData, [0, 1], [0, 255, 0, 255]);
  setPoint(imageData, [1, 1], [0, 0, 255, 125]);

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
  setPoint(imageData, [-1, -1], [0, 0, 0, 255]);
  setPoint(imageData, [-1, 2], [0, 0, 0, 255]);
  setPoint(imageData, [2, -1], [0, 0, 0, 255]);
  setPoint(imageData, [2, 2], [0, 0, 0, 255]);

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
  const color = [
    randomInt(0, 255),
    randomInt(0, 255),
    randomInt(0, 255),
    randomInt(0, 255),
  ] as [number, number, number, number];

  const imageData = new ImageData(1, 1);
  setPoint(imageData, [0, 0], color);

  ensure(
    Array.from(imageData.data),
    [color[0], color[1], color[2], color[3],],
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
