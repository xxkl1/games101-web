import { Mat4, Vec4, multiply } from "../src/utils/matrix";
import { ensure } from "./ensure";

const testMatrix1 = function () {
  const p = new Vec4([1, 1, 1, 1]);
  const translate = new Mat4([
    1, 0, 0, -1,
    0, 1, 0, -1,
    0, 0, 1, -1,
    0, 0, 0, 1
  ])
  const r = multiply(translate, p);
  const expect = new Vec4([0, 0, 0, 1]);
  ensure(r, expect, "testMatrix1");
};

const testMatrix2 = function () {
  // 测试缩放矩阵 - 缩放因子为 2
  const p = new Vec4([1, 2, 3, 1]);
  const scale = new Mat4([
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ]);
  const r = multiply(scale, p);
  const expect = new Vec4([2, 4, 6, 1]);
  ensure(r, expect, "testMatrix2");
};

const testMatrix3 = function () {
  // 测试单位矩阵
  const p = new Vec4([5, 6, 7, 1]);
  const identity = new Mat4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  const r = multiply(identity, p);
  const expect = new Vec4([5, 6, 7, 1]);
  ensure(r, expect, "testMatrix3");
};

const testMatrix4 = function () {
  // 测试 X 轴旋转 90 度（绕 X 轴逆时针旋转）
  const p = new Vec4([1, 0, 0, 1]);
  const rotateX90 = new Mat4([
    1, 0, 0, 0,
    0, 0, -1, 0,
    0, 1, 0, 0,
    0, 0, 0, 1
  ]);
  const r = multiply(rotateX90, p);
  const expect = new Vec4([1, 0, 0, 1]);
  ensure(r, expect, "testMatrix4");
};

const testMatrix5 = function () {
  // 测试 Y 轴旋转 90 度
  const p = new Vec4([0, 0, 1, 1]);
  const rotateY90 = new Mat4([
    0, 0, 1, 0,
    0, 1, 0, 0,
    -1, 0, 0, 0,
    0, 0, 0, 1
  ]);
  const r = multiply(rotateY90, p);
  const expect = new Vec4([1, 0, 0, 1]);
  ensure(r, expect, "testMatrix5");
};

const testMatrix6 = function () {
  // 测试 Z 轴旋转 90 度
  const p = new Vec4([1, 0, 0, 1]);
  const rotateZ90 = new Mat4([
    0, -1, 0, 0,
    1, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  const r = multiply(rotateZ90, p);
  const expect = new Vec4([0, 1, 0, 1]);
  ensure(r, expect, "testMatrix6");
};

const testMatrix7 = function () {
  // 测试组合变换：先缩放再平移
  const p = new Vec4([1, 1, 1, 1]);
  const scale = new Mat4([
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ]);
  const translate = new Mat4([
    1, 0, 0, 3,
    0, 1, 0, 3,
    0, 0, 1, 3,
    0, 0, 0, 1
  ]);
  // 先缩放
  const scaled = multiply(scale, p);
  // 再平移
  const r = multiply(translate, scaled);
  const expect = new Vec4([5, 5, 5, 1]);
  ensure(r, expect, "testMatrix7");
};

const testMatrix8 = function () {
  // 测试零向量
  const p = new Vec4([0, 0, 0, 1]);
  const translate = new Mat4([
    1, 0, 0, 10,
    0, 1, 0, 20,
    0, 0, 1, 30,
    0, 0, 0, 1
  ]);
  const r = multiply(translate, p);
  const expect = new Vec4([10, 20, 30, 1]);
  ensure(r, expect, "testMatrix8");
};

const testMatrix9 = function () {
  // 测试非均匀缩放
  const p = new Vec4([2, 3, 4, 1]);
  const scale = new Mat4([
    3, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  const r = multiply(scale, p);
  const expect = new Vec4([6, 6, 4, 1]);
  ensure(r, expect, "testMatrix9");
};

const testMatrix10 = function () {
  // 测试负数缩放（镜像）
  const p = new Vec4([1, 2, 3, 1]);
  const mirror = new Mat4([
    -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  const r = multiply(mirror, p);
  const expect = new Vec4([-1, 2, 3, 1]);
  ensure(r, expect, "testMatrix10");
};

// 矩阵*矩阵测试用例
const testMatrixMul1 = function () {
  // 测试单位矩阵 * 任意矩阵 = 任意矩阵
  const identity = new Mat4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  const translate = new Mat4([
    1, 0, 0, 5,
    0, 1, 0, 10,
    0, 0, 1, 15,
    0, 0, 0, 1
  ]);
  const r = multiply(identity, translate);
  const expect = new Mat4([
    1, 0, 0, 5,
    0, 1, 0, 10,
    0, 0, 1, 15,
    0, 0, 0, 1
  ]);
  ensure(r, expect, "testMatrixMul1");
};

const testMatrixMul2 = function () {
  // 测试平移矩阵 * 缩放矩阵
  const translate = new Mat4([
    1, 0, 0, 3,
    0, 1, 0, 2,
    0, 0, 1, 1,
    0, 0, 0, 1
  ]);
  const scale = new Mat4([
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ]);
  const r = multiply(translate, scale);
  const expect = new Mat4([
    2, 0, 0, 3,
    0, 2, 0, 2,
    0, 0, 2, 1,
    0, 0, 0, 1
  ]);
  ensure(r, expect, "testMatrixMul2");
};

const testMatrixMul3 = function () {
  // 测试缩放矩阵 * 平移矩阵
  const scale = new Mat4([
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ]);
  const translate = new Mat4([
    1, 0, 0, 3,
    0, 1, 0, 2,
    0, 0, 1, 1,
    0, 0, 0, 1
  ]);
  const r = multiply(scale, translate);
  const expect = new Mat4([
    2, 0, 0, 6,
    0, 2, 0, 4,
    0, 0, 2, 2,
    0, 0, 0, 1
  ]);
  ensure(r, expect, "testMatrixMul3");
};

const testMatrixMul4 = function () {
  // 测试两个旋转矩阵相乘（Z轴旋转90度 * Z轴旋转90度 = Z轴旋转180度）
  const rotateZ90 = new Mat4([
    0, -1, 0, 0,
    1, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  const r = multiply(rotateZ90, rotateZ90);
  const expect = new Mat4([
    -1, 0, 0, 0,
    0, -1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  ensure(r, expect, "testMatrixMul4");
};

// 矩阵*矩阵*向量测试用例
const testMatrixMulVec1 = function () {
  // 测试结合律：(A * B) * v = A * (B * v)
  // 使用缩放和平移
  const scale = new Mat4([
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ]);
  const translate = new Mat4([
    1, 0, 0, 3,
    0, 1, 0, 3,
    0, 0, 1, 3,
    0, 0, 0, 1
  ]);
  const p = new Vec4([1, 1, 1, 1]);

  // 方法1：先计算矩阵乘积再乘向量
  const combined = multiply(translate, scale);
  const r1 = multiply(combined, p);

  // 方法2：从右到左依次计算
  const scaled = multiply(scale, p);
  const r2 = multiply(translate, scaled);

  ensure(r1, r2, "testMatrixMulVec1");
};

const testMatrixMulVec2 = function () {
  // 测试先缩放2倍，再平移(5,5,5)
  const scale = new Mat4([
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ]);
  const translate = new Mat4([
    1, 0, 0, 5,
    0, 1, 0, 5,
    0, 0, 1, 5,
    0, 0, 0, 1
  ]);
  const p = new Vec4([1, 2, 3, 1]);

  // 先组合矩阵再应用
  const transform = multiply(translate, scale);
  const r = multiply(transform, p);
  const expect = new Vec4([7, 9, 11, 1]);
  ensure(r, expect, "testMatrixMulVec2");
};

const testMatrixMulVec3 = function () {
  // 测试旋转+平移组合：先绕Z轴旋转90度，再平移
  const rotateZ90 = new Mat4([
    0, -1, 0, 0,
    1, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  const translate = new Mat4([
    1, 0, 0, 10,
    0, 1, 0, 20,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  const p = new Vec4([1, 0, 0, 1]);

  const transform = multiply(translate, rotateZ90);
  const r = multiply(transform, p);
  const expect = new Vec4([10, 21, 0, 1]);
  ensure(r, expect, "testMatrixMulVec3");
};

const testMatrixMulVec4 = function () {
  // 测试复杂组合：缩放 * 旋转 * 平移
  const scale = new Mat4([
    3, 0, 0, 0,
    0, 3, 0, 0,
    0, 0, 3, 0,
    0, 0, 0, 1
  ]);
  const rotateZ90 = new Mat4([
    0, -1, 0, 0,
    1, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  const translate = new Mat4([
    1, 0, 0, 2,
    0, 1, 0, 2,
    0, 0, 1, 2,
    0, 0, 0, 1
  ]);
  const p = new Vec4([1, 0, 0, 1]);

  // 组合所有变换矩阵
  const temp = multiply(rotateZ90, translate);
  const transform = multiply(scale, temp);
  const r = multiply(transform, p);
  const expect = new Vec4([-6, 9, 6, 1]);
  ensure(r, expect, "testMatrixMulVec4");
};


const testMatrix = function () {
  testMatrix1();
  testMatrix2();
  testMatrix3();
  testMatrix4();
  testMatrix5();
  testMatrix6();
  testMatrix7();
  testMatrix8();
  testMatrix9();
  testMatrix10();

  // 矩阵*矩阵测试
  testMatrixMul1();
  testMatrixMul2();
  testMatrixMul3();
  testMatrixMul4();

  // 矩阵*矩阵*向量测试
  testMatrixMulVec1();
  testMatrixMulVec2();
  testMatrixMulVec3();
  testMatrixMulVec4();
};

export {
  testMatrix,
}