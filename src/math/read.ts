const read = function (l: number[], i: number) {
    if (i >= 0 && i < l.length) {
        return l[i];
    }
    throw new Error(`index out of range: ${JSON.stringify(l)},index: ${i}`);
}

export {
    read,
}