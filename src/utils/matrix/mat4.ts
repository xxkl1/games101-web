// 4*4矩阵
// 采用行主序列表示方式
class Mat4 {
    value: number[] = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
    constructor(value: number[]) {
        this.value = value;
    }
}

export {
    Mat4,
}
