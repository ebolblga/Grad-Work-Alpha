export function binarizationWulff(image: ImageData, imgWidth: number, imgHeight: number, matrixSize: number, a: number) {
    const integralImg = IntegralByteImage(image, imgWidth, imgHeight);

    let r = 0; // maximum standard deviation
    let min = 255; // darkest pixel in the image

    for (let i = 0; i < imgHeight; ++i)
    {
        for (let j = 0; j < imgWidth; ++j)
        {
            const windowI = i < matrixSize ? i + 1 : matrixSize;
            const windowJ = j < matrixSize ? j + 1 : matrixSize;

            const windowSum = integralImg[j + 1][i + 1] - integralImg[j + 1][i + 1 - windowI] - integralImg[j + 1 - windowJ][i + 1] + integralImg[j + 1 - windowJ][i + 1 - windowI];
            // mathematical expectation
            const expected_value = Math.floor(windowSum / (windowI * windowJ));

            const brightness = (image.data[((i * 4 * imgWidth) + j * 4)] * 0.2125) + (image.data[((i * 4 * imgWidth) + j * 4) + 1] * 0.7154) + (image.data[((i * 4 * imgWidth) + j * 4) + 2] * 0.0721);
            min = brightness < min ? brightness : min;

            // dispersion
            const dispersion = Math.sqrt(Math.abs((brightness * brightness) - (expected_value * expected_value)));
            r = dispersion > r ? dispersion : r;
        }
    }

    for (let i = 0; i < imgHeight; ++i)
    {
        for (let j = 0; j < imgWidth; ++j)
        {
            const windowI = i < matrixSize ? i + 1 : matrixSize;
            const windowJ = j < matrixSize ? j + 1 : matrixSize;

            const windowSum = integralImg[j + 1][i + 1] - integralImg[j + 1][i + 1 - windowI] - integralImg[j + 1 - windowJ][i + 1] + integralImg[j + 1 - windowJ][i + 1 - windowI];
            // mathematical expectation
            const expected_value = Math.floor(windowSum / (windowI * windowJ));

            const brightness = (image.data[((i * 4 * imgWidth) + j * 4)] * 0.2125) + (image.data[((i * 4 * imgWidth) + j * 4) + 1] * 0.7154) + (image.data[((i * 4 * imgWidth) + j * 4) + 2] * 0.0721);
            // dispersion
            const dispersion = Math.sqrt(Math.abs((brightness * brightness) - (expected_value * expected_value)));

            // threshold
            const threshold = ((1 - a) * expected_value) + (a * min) + (a * ((dispersion / r * expected_value) - min));

            const value = brightness > threshold ? 255 : 0;
            image.data.fill(value, ((i * 4 * imgWidth) + j * 4), ((i * 4 * imgWidth) + j * 4) + 3);
        }
    }

    return image;
}

function IntegralByteImage(image: ImageData, width: number, height: number) {
    var integralImg = Array(width + 1);
    for (var i = 0; i < width + 1; i++) {
        integralImg[i] = Array(height + 1).fill(0);
    }

    for (let i = 1; i < height + 1; ++i)
    {
        for (let j = 1; j < width + 1; ++j)
        {
            const brightness = (0.2125 * image.data[((((i - 1) * width) + j - 1) * 4)]) + (0.7154 * image.data[((((i - 1) * width) + j - 1) * 4) + 1]) + (0.0721 * image.data[((((i - 1) * width) + j - 1) * 4) + 2]);
            integralImg[j][i] = brightness + integralImg[j - 1][i] + integralImg[j][i - 1] - integralImg[j - 1][i - 1];
        }
    }

    return integralImg;
}