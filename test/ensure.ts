const ensure = function (result: any, expect: any, message: string) {
    if (typeof result === typeof expect && JSON.stringify(result) === JSON.stringify(expect)) {
        console.log(`${message} pass`);
    } else {
        console.error(`${message} fail, expect: ${JSON.stringify(expect)}, actual: ${JSON.stringify(result)}`);
    }
};

export { ensure };
