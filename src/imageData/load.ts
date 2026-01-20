const loadImageByImageUrl = function (url: string) : Promise<ImageData> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
            // 创建临时 canvas 来获取像素数据
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("Failed to get canvas context"));
                return;
            }

            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            resolve(imageData);
        };

        img.onerror = () => {
            reject(new Error(`Failed to load texture from ${url}`));
        };

        img.src = url;
    });
};

export {
  loadImageByImageUrl,
}
