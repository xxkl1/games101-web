import type { Vec3 } from '../math';
import type { Light } from './type';

/**
 * 默认光源配置
 */
export const defaultLights: Light[] = [
    { position: [20, 20, 20], intensity: [500, 500, 500] },
    { position: [-20, 20, 0], intensity: [500, 500, 500] }
];

/**
 * 默认环境光系数
 */
export const ambLightIntensity: Vec3 = [10, 10, 10];

/**
 * 默认材质参数
 */
export const ka: Vec3 = [0.005, 0.005, 0.005]; // 环境光反射系数
export const ks: Vec3 = [0.7937, 0.7937, 0.7937]; // 镜面反射系数
export const p = 150; // 高光指数
