import type { FragmentShaderPayload } from './type';
import type { Vec3 } from '../math';

/**
 * 纯色着色器（仅返回颜色）
 */
export function normalShader(payload: FragmentShaderPayload): Vec3 {
    return payload.color;
}
