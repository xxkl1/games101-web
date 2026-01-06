// 4维列向量
// TODO：Vec4、Vec3和Mat4去掉类和范型的使用，统一改成对象的形式，例如 Vec4 = {x: number, y: number, z: number, w: number}
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
