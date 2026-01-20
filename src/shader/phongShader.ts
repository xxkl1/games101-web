import { normalizeVec3, dotVec3, subtractVec3, scaleVec3, cwiseProduct } from '../math';
import type { Vec3 } from '../math';
import type { FragmentShaderPayload, Light } from './type';
import { ka, ks, p, ambLightIntensity, defaultLights } from './constants';

/**
 * Phong 着色器（使用顶点颜色进行 Phong 光照计算）
 */
export function phongShader(
    payload: FragmentShaderPayload,
    lights: Light[] = defaultLights,
    eye_pos: Vec3 = [0, 0, 10]
): Vec3 {
    const kd: Vec3 = [
        payload.color[0] / 255.0,
        payload.color[1] / 255.0,
        payload.color[2] / 255.0
    ];

    const point = payload.viewPos;
    const normal = normalizeVec3(payload.normal);

    let resultColor: Vec3 = [0, 0, 0];

    for (const light of lights) {
        const lightDir = normalizeVec3(subtractVec3(light.position, point));
        const viewDir = normalizeVec3(subtractVec3(eye_pos, point));
        const halfVec = normalizeVec3([
            lightDir[0] + viewDir[0],
            lightDir[1] + viewDir[1],
            lightDir[2] + viewDir[2]
        ]);

        const rSquared =
            (light.position[0] - point[0]) ** 2 +
            (light.position[1] - point[1]) ** 2 +
            (light.position[2] - point[2]) ** 2;

        const intensity: Vec3 = [
            light.intensity[0] / rSquared,
            light.intensity[1] / rSquared,
            light.intensity[2] / rSquared
        ];

        const ambient = cwiseProduct(ka, ambLightIntensity);
        const diffuseCoeff = Math.max(0, dotVec3(normal, lightDir));
        const diffuse = scaleVec3(cwiseProduct(kd, intensity), diffuseCoeff);
        const specularCoeff = Math.pow(Math.max(0, dotVec3(normal, halfVec)), p);
        const specular = scaleVec3(cwiseProduct(ks, intensity), specularCoeff);

        resultColor[0] += ambient[0] + diffuse[0] + specular[0];
        resultColor[1] += ambient[1] + diffuse[1] + specular[1];
        resultColor[2] += ambient[2] + diffuse[2] + specular[2];
    }

    return [
        Math.min(255, Math.max(0, resultColor[0] * 255)),
        Math.min(255, Math.max(0, resultColor[1] * 255)),
        Math.min(255, Math.max(0, resultColor[2] * 255))
    ];
}
