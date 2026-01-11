// 4维列向量
// TODO：Vec4、Vec3和Mat4去掉类和范型的使用，统一改成对象的形式，例如 Vec4 = {x: number, y: number, z: number, w: number}
// TODO: 后面重构想法，Vec4这种，可以由一个const createVec4 = function (x: number, y: number, z: number, w: number) : { type: 'vec4', value: number[] } =  { type: Vec4, value: [x, y, z, w] }这样的函数去创建，这样就避免引入面向对象的概念，又有了类型约束
class Vec4 {
    value: number[] = [0, 0, 0, 1,];
    constructor(value: number[]) {
        if (value.length !== 4) throw new Error("value length must be 4");
        this.value = value;
    }
}

export {
    Vec4,
}
