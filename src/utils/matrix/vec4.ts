// 4维列向量
class Vec4 {
    value: number[] = [0, 0, 0, 1,];
    constructor(value: number[]) {
        this.value = value;
    }
    perspectiveDivide () {
        const v = this.value;
        const w = v[3];
        return new Vec4([v[0] / w, v[1] / w, v[2] / w, 1]);
    }
}

export {
    Vec4,
}
