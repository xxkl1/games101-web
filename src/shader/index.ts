// 类型导出
export type { FragmentShaderPayload, Light, FragmentShader } from './type';

// 常量导出
export { defaultLights, ambLightIntensity, ka, ks, p } from './constants';

// 着色器导出
export { normalShader } from './normalShader';
export { textureShader } from './textureShader';
export { simpleTextureShader } from './simpleTextureShader';
export { phongShader } from './phongShader';
