const ensure = function (result: any, expect: any, message: string) {
    if (JSON.stringify(result) === JSON.stringify(expect)) {
        console.log(`${message} pass`);
    } else {
        console.error(`${message} fail, expect: ${JSON.stringify(expect)}, actual: ${JSON.stringify(result)}`);
    }
};

export { ensure };
