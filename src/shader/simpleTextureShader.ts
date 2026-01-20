import { getColorBilinear } from '../imageData/getColor';
import type { FragmentShaderPayload } from './type';
import type { Vec3 } from '../math';

/**
 * 简单纹理着色器（仅纹理采样，无光照）
 */
export function simpleTextureShader(payload: FragmentShaderPayload): Vec3 {
    if (payload.texture && payload.texture) {
        const c = getColorBilinear(
            payload.texture,
            payload.texCoords[0],
            payload.texCoords[1]
        )
        return [c[0], c[1], c[2]];
    }
    return payload.color;
}
