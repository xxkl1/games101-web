const fromArray = function (
    arr: number[],
    width: number,
    height: number
): ImageData {
    const data = new Uint8ClampedArray(arr);
    return new ImageData(data, width, height);
};

export {
    fromArray,
}
