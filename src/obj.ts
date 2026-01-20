/**
 * OBJ 模型加载器
 * 支持加载 .obj 文件格式的 3D 模型
 */

interface ObjMesh {
    positions: number[];   // 顶点位置数组 [x, y, z, x, y, z, ...]
    texcoords: number[];   // 纹理坐标数组 [u, v, u, v, ...]
    normals: number[];     // 法向量数组 [nx, ny, nz, nx, ny, nz, ...]
    indices: number[];     // 索引数组
}

interface ObjModel {
    meshes: ObjMesh[];
    name: string;
}

/**
 * 获取或创建顶点
 */
const getOrCreateVertex = function (
    vertexStr: string,
    tempPositions: number[][],
    tempTexcoords: number[][],
    tempNormals: number[][],
    positions: number[],
    texcoords: number[],
    normals: number[],
    vertexCache: Map<string, number>,
    currentIndex: number
): number {
    // 检查缓存
    if (vertexCache.has(vertexStr)) {
        return vertexCache.get(vertexStr)!;
    }

    // 解析顶点索引 (格式: v/vt/vn 或 v//vn 或 v/vt 或 v)
    const parts = vertexStr.split('/');
    const posIdx = parseInt(parts[0]) - 1; // OBJ 索引从 1 开始
    const texIdx = parts[1] ? parseInt(parts[1]) - 1 : -1;
    const norIdx = parts[2] ? parseInt(parts[2]) - 1 : -1;

    // 添加位置
    if (posIdx >= 0 && posIdx < tempPositions.length) {
        positions.push(...tempPositions[posIdx]);
    } else {
        positions.push(0, 0, 0);
    }

    // 添加纹理坐标
    if (texIdx >= 0 && texIdx < tempTexcoords.length) {
        texcoords.push(...tempTexcoords[texIdx]);
    } else {
        texcoords.push(0, 0);
    }

    // 添加法向量
    if (norIdx >= 0 && norIdx < tempNormals.length) {
        normals.push(...tempNormals[norIdx]);
    } else {
        normals.push(0, 0, 1);
    }

    // 缓存顶点
    vertexCache.set(vertexStr, currentIndex);

    return currentIndex;
}

/**
 * 解析 OBJ 文件内容
 */
const parseObj = function (objContent: string): ObjModel {
    const lines = objContent.split('\n');

    // 临时存储原始数据
    const tempPositions: number[][] = [];
    const tempTexcoords: number[][] = [];
    const tempNormals: number[][] = [];

    // 最终输出数据
    const positions: number[] = [];
    const texcoords: number[] = [];
    const normals: number[] = [];
    const indices: number[] = [];

    // 用于去重的顶点缓存
    const vertexCache: Map<string, number> = new Map();
    let vertexIndex = 0;

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.length === 0 || trimmedLine.startsWith('#')) {
            continue;
        }

        const parts = trimmedLine.split(/\s+/);
        const type = parts[0];

        switch (type) {
            case 'v': // 顶点位置
                tempPositions.push([
                    parseFloat(parts[1]),
                    parseFloat(parts[2]),
                    parseFloat(parts[3])
                ]);
                break;

            case 'vt': // 纹理坐标
                tempTexcoords.push([
                    parseFloat(parts[1]),
                    parseFloat(parts[2]) || 0
                ]);
                break;

            case 'vn': // 法向量
                tempNormals.push([
                    parseFloat(parts[1]),
                    parseFloat(parts[2]),
                    parseFloat(parts[3])
                ]);
                break;

            case 'f': // 面
                // 支持三角形和四边形
                const faceVertices: string[] = parts.slice(1);

                // 将多边形三角化
                for (let i = 1; i < faceVertices.length - 1; i++) {
                    const v0 = faceVertices[0];
                    const v1 = faceVertices[i];
                    const v2 = faceVertices[i + 1];

                    for (const vertex of [v0, v1, v2]) {
                        const idx = getOrCreateVertex(
                            vertex,
                            tempPositions,
                            tempTexcoords,
                            tempNormals,
                            positions,
                            texcoords,
                            normals,
                            vertexCache,
                            vertexIndex
                        );

                        if (idx === vertexIndex) {
                            vertexIndex++;
                        }

                        indices.push(idx);
                    }
                }
                break;
        }
    }

    return {
        name: 'obj_model',
        meshes: [{
            positions,
            texcoords,
            normals,
            indices
        }]
    };
}



/**
 * 从 URL 加载 OBJ 文件
 */
const loadObjFromUrl = async function (url: string): Promise<ObjModel> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load OBJ file: ${url}`);
    }
    const content = await response.text();
    return parseObj(content);
}

export {
    loadObjFromUrl,
}