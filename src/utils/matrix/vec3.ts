// 3维列向量
class Vec3 {
    value: number[] = [0, 0, 0];
    constructor(value: number[]) {
        if (value.length !== 3) throw new Error("value length must be 3");
        this.value = value;
    }
}

export {
    Vec3,
}