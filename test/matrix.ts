import { multiplyMat4Vec4, multiplyMat4Mat4 } from "../src/math";
import { cameraView, projection, rotate } from "../src/transform";
import type { Vec4, Mat4 } from '../src/math';

import { ensure } from "./ensure";

const testMatrix1 = function () {
  const p : Vec4 = [1, 1, 1, 1];
  const translate : Mat4 = [
    1, 0, 0, -1,
    0, 1, 0, -1,
    0, 0, 1, -1,
    0, 0, 0, 1
  ]
  const r = multiplyMat4Vec4(translate, p);
  const expect : Vec4 = [0, 0, 0, 1];
  ensure(r, expect, "testMatrix1");
};

const testMatrix2 = function () {
  // 测试缩放矩阵 - 缩放因子为 2
  const p : Vec4 = [1, 2, 3, 1]
  const scale : Mat4 = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ];
  const r = multiplyMat4Vec4(scale, p);
  const expect : Vec4 = [2, 4, 6, 1];
  ensure(r, expect, "testMatrix2");
};

const testMatrix3 = function () {
  // 测试单位矩阵
  const p : Vec4 = [5, 6, 7, 1];
  const identity : Mat4 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  const r = multiplyMat4Vec4(identity, p);
  const expect : Vec4 = [5, 6, 7, 1];
  ensure(r, expect, "testMatrix3");
};

const testMatrix4 = function () {
  // 测试 X 轴旋转 90 度（绕 X 轴逆时针旋转）
  const p : Vec4 = [1, 0, 0, 1];
  const rotateX90 : Mat4 = [
    1, 0, 0, 0,
    0, 0, -1, 0,
    0, 1, 0, 0,
    0, 0, 0, 1
  ];
  const r : Vec4 = multiplyMat4Vec4(rotateX90, p);
  const expect : Vec4 = [1, 0, 0, 1];
  ensure(r, expect, "testMatrix4");
};

const testMatrix5 = function () {
  // 测试 Y 轴旋转 90 度
  const p : Vec4 = [0, 0, 1, 1];
  const rotateY90 : Mat4 = [
    0, 0, 1, 0,
    0, 1, 0, 0,
    -1, 0, 0, 0,
    0, 0, 0, 1
  ];
  const r : Vec4 = multiplyMat4Vec4(rotateY90, p);
  const expect : Vec4 = [1, 0, 0, 1];
  ensure(r, expect, "testMatrix5");
};

const testMatrix6 = function () {
  // 测试 Z 轴旋转 90 度
  const p : Vec4 = [1, 0, 0, 1];
  const rotateZ90 : Mat4 = [
    0, -1, 0, 0,
    1, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  const r = multiplyMat4Vec4(rotateZ90, p);
  const expect = [0, 1, 0, 1];
  ensure(r, expect, "testMatrix6");
};

const testMatrix7 = function () {
  // 测试组合变换：先缩放再平移
  const p : Vec4 = [1, 1, 1, 1];
  const scale : Mat4 = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ];
  const translate : Mat4 = [
    1, 0, 0, 3,
    0, 1, 0, 3,
    0, 0, 1, 3,
    0, 0, 0, 1
  ];
  // 先缩放
  const scaled = multiplyMat4Vec4(scale, p);
  // 再平移
  const r = multiplyMat4Vec4(translate, scaled);
  const expect = [5, 5, 5, 1];
  ensure(r, expect, "testMatrix7");
};

const testMatrix8 = function () {
  // 测试零向量
  const p : Vec4 = [0, 0, 0, 1];
  const translate : Mat4 = [
    1, 0, 0, 10,
    0, 1, 0, 20,
    0, 0, 1, 30,
    0, 0, 0, 1
  ];
  const r = multiplyMat4Vec4(translate, p);
  const expect = [10, 20, 30, 1];
  ensure(r, expect, "testMatrix8");
};

const testMatrix9 = function () {
  // 测试非均匀缩放
  const p: Vec4 = [2, 3, 4, 1];
  const scale: Mat4 = [
    3, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  const r = multiplyMat4Vec4(scale, p);
  const expect: Vec4 = [6, 6, 4, 1];
  ensure(r, expect, "testMatrix9");
};

const testMatrix10 = function () {
  // 测试负数缩放（镜像）
  const p: Vec4 = [1, 2, 3, 1];
  const mirror: Mat4 = [
    -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  const r = multiplyMat4Vec4(mirror, p);
  const expect: Vec4 = [-1, 2, 3, 1];
  ensure(r, expect, "testMatrix10");
};

// 矩阵*矩阵测试用例
const testMatrixMul1 = function () {
  // 测试单位矩阵 * 任意矩阵 = 任意矩阵
  const identity: Mat4 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  const translate: Mat4 = [
    1, 0, 0, 5,
    0, 1, 0, 10,
    0, 0, 1, 15,
    0, 0, 0, 1
  ];
  const r = multiplyMat4Mat4(identity, translate);
  const expect: Mat4 = [
    1, 0, 0, 5,
    0, 1, 0, 10,
    0, 0, 1, 15,
    0, 0, 0, 1
  ];
  ensure(r, expect, "testMatrixMul1");
};

const testMatrixMul2 = function () {
  // 测试平移矩阵 * 缩放矩阵
  const translate: Mat4 = [
    1, 0, 0, 3,
    0, 1, 0, 2,
    0, 0, 1, 1,
    0, 0, 0, 1
  ];
  const scale: Mat4 = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ];
  const r = multiplyMat4Mat4(translate, scale);
  const expect: Mat4 = [
    2, 0, 0, 3,
    0, 2, 0, 2,
    0, 0, 2, 1,
    0, 0, 0, 1
  ];
  ensure(r, expect, "testMatrixMul2");
};

const testMatrixMul3 = function () {
  // 测试缩放矩阵 * 平移矩阵
  const scale: Mat4 = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ];
  const translate: Mat4 = [
    1, 0, 0, 3,
    0, 1, 0, 2,
    0, 0, 1, 1,
    0, 0, 0, 1
  ];
  const r = multiplyMat4Mat4(scale, translate);
  const expect: Mat4 = [
    2, 0, 0, 6,
    0, 2, 0, 4,
    0, 0, 2, 2,
    0, 0, 0, 1
  ];
  ensure(r, expect, "testMatrixMul3");
};

const testMatrixMul4 = function () {
  // 测试两个旋转矩阵相乘（Z轴旋转90度 * Z轴旋转90度 = Z轴旋转180度）
  const rotateZ90: Mat4 = [
    0, -1, 0, 0,
    1, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  const r = multiplyMat4Mat4(rotateZ90, rotateZ90);
  const expect: Mat4 = [
    -1, 0, 0, 0,
    0, -1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  ensure(r, expect, "testMatrixMul4");
};

// 矩阵*矩阵*向量测试用例
const testMatrixMulVec1 = function () {
  // 测试结合律：(A * B) * v = A * (B * v)
  // 使用缩放和平移
  const scale: Mat4 = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ];
  const translate: Mat4 = [
    1, 0, 0, 3,
    0, 1, 0, 3,
    0, 0, 1, 3,
    0, 0, 0, 1
  ];
  const p: Vec4 = [1, 1, 1, 1];

  // 方法1：先计算矩阵乘积再乘向量
  const combined = multiplyMat4Mat4(translate, scale);
  const r1 = multiplyMat4Vec4(combined, p);

  // 方法2：从右到左依次计算
  const scaled = multiplyMat4Vec4(scale, p);
  const r2 = multiplyMat4Vec4(translate, scaled);

  ensure(r1, r2, "testMatrixMulVec1");
};

const testMatrixMulVec2 = function () {
  // 测试先缩放2倍，再平移(5,5,5)
  const scale: Mat4 = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ];
  const translate: Mat4 = [
    1, 0, 0, 5,
    0, 1, 0, 5,
    0, 0, 1, 5,
    0, 0, 0, 1
  ];
  const p: Vec4 = [1, 2, 3, 1];

  // 先组合矩阵再应用
  const transform = multiplyMat4Mat4(translate, scale);
  const r = multiplyMat4Vec4(transform, p);
  const expect: Vec4 = [7, 9, 11, 1];
  ensure(r, expect, "testMatrixMulVec2");
};

const testMatrixMulVec3 = function () {
  // 测试旋转+平移组合：先绕Z轴旋转90度，再平移
  const rotateZ90: Mat4 = [
    0, -1, 0, 0,
    1, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  const translate: Mat4 = [
    1, 0, 0, 10,
    0, 1, 0, 20,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  const p: Vec4 = [1, 0, 0, 1];

  const transform = multiplyMat4Mat4(translate, rotateZ90);
  const r = multiplyMat4Vec4(transform, p);
  const expect: Vec4 = [10, 21, 0, 1];
  ensure(r, expect, "testMatrixMulVec3");
};

const testMatrixMulVec4 = function () {
  // 测试复杂组合：缩放 * 旋转 * 平移
  const scale: Mat4 = [
    3, 0, 0, 0,
    0, 3, 0, 0,
    0, 0, 3, 0,
    0, 0, 0, 1
  ];
  const rotateZ90: Mat4 = [
    0, -1, 0, 0,
    1, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  const translate: Mat4 = [
    1, 0, 0, 2,
    0, 1, 0, 2,
    0, 0, 1, 2,
    0, 0, 0, 1
  ];
  const p: Vec4 = [1, 0, 0, 1];

  // 组合所有变换矩阵
  const temp = multiplyMat4Mat4(rotateZ90, translate);
  const transform = multiplyMat4Mat4(scale, temp);
  const r = multiplyMat4Vec4(transform, p);
  const expect: Vec4 = [-6, 9, 6, 1];
  ensure(r, expect, "testMatrixMulVec4");
};

const testProjection = function () {
  const r = projection(45, 1, 0.1, 100);
  const expect: Mat4 = [
    2.4142135623730954, 0, 0, 0,
    0, 2.4142135623730954, 0, 0,
    0, 0, -1.002002002002002, -0.20020020020020018,
    0, 0, -1, 0,
  ]
  ensure(r, expect, "testProjection");
};

const testViewMat1 = function () {
  const r = cameraView([0, 0, 0, 1], [0, 0, -5, 1]);
  const expect: Mat4 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]
  ensure(r, expect, "testViewMat1");
}

const testViewMat2 = function () {
  const r = cameraView([0, 0, 0, 1], [0, -5, 0, 1]);
  const expect: Mat4 = [
    -1, 0, 0, 0,
    0, 0, 1, 0,
    0, 1, 0, 0,
    0, 0, 0, 1,
]
  ensure(r, expect, "testViewMat2");
}

const testViewMat3 = function () {
  const r = cameraView([0, 1, 0, 1], [0, -5, -5, 1]);
  const expect: Mat4 = [
    1, 0, 0, 0,
    0, 0.6401843996644798, -0.768221279597376, -0.6401843996644798,
    0, 0.7682212795973757, 0.6401843996644797, -0.7682212795973757,
    0, 0, 0, 1,
  ]
  ensure(r, expect, "testViewMat3");
}

const testRotate1 = function () {
  // 测试绕 X 轴旋转 90 度
  const r = rotate([1, 0, 0, 1], Math.PI / 2);
  const expect: Mat4 = [
    1, 0, 0, 0,
    0, 6.123233995736766e-17, -1, 0,
    0, 1, 6.123233995736766e-17, 0,
    0, 0, 0, 1,
];
  ensure(r, expect, "testRotate2");
};

const testRotate2 = function () {
  const r = rotate([0, 1, 0, 1], 45);
  const expect: Mat4 = [
    0.5253219888177297, 0, 0.8509035245341184, 0,
    0, 1, 0, 0,
    -0.8509035245341184, 0, 0.5253219888177297, 0,
    0, 0, 0, 1,
  ]
  ensure(r, expect, "testRotate1");
}

const testRotate3 = function () {
  // 测试绕 Z 轴旋转 90 度
  const r = rotate([0, 0, 1, 1], Math.PI / 2);
  const expect: Mat4 = [
    6.123233995736766e-17, -1, 0, 0,
    1, 6.123233995736766e-17, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
];
  ensure(r, expect, "testRotate3");
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
  testMatrixMul1();
  testMatrixMul2();
  testMatrixMul3();
  testMatrixMul4();
  testMatrixMulVec1();
  testMatrixMulVec2();
  testMatrixMulVec3();
  testMatrixMulVec4();
  testProjection();
  testViewMat1();
  testViewMat2();
  testViewMat3();
  testRotate1();
  testRotate2();
  testRotate3();
};

export {
  testMatrix,
}