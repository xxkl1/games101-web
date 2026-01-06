// 4维列向量
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
