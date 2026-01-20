import type { Vec3 } from '../math';

/**
 * 片段着色器的输入数据结构
 */
export interface FragmentShaderPayload {
    viewPos: Vec3;      // 观察空间位置 [x, y, z]
    color: Vec3;         // 插值颜色 [r, g, b]
    normal: Vec3;        // 插值法向量 [nx, ny, nz]
    texCoords: Vec3;    // 纹理坐标 [u, v]
    texture: ImageData | null; // 纹理对象
}

/**
 * 光源结构
 */
export interface Light {
    position: Vec3;  // 光源位置 [x, y, z]
    intensity: Vec3; // 光照强度 [r, g, b]
}

/**
 * 片段着色器函数类型
 */
export type FragmentShader = (payload: FragmentShaderPayload) => Vec3;
