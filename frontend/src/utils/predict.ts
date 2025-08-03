export const predictDigit = (canvas: HTMLCanvasElement): Promise<string> => {
    return new Promise((resolve, reject) => {
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = canvas.width;
        exportCanvas.height = canvas.height;

        const exportCtx = exportCanvas.getContext('2d');
        if (!exportCtx) {
            reject('Error: Unable to get export canvas context');
            return;
        }

        // Fill white background and draw current canvas
        exportCtx.fillStyle = '#FFFFFF';
        exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
        exportCtx.globalAlpha = 1.0;
        exportCtx.drawImage(canvas, 0, 0);

        exportCanvas.toBlob(blob => {
            if (!blob) {
                reject('Error: Unable to export image');
                return;
            }

            const formData = new FormData();
            formData.append('file', blob, 'digit.png');

            const isLocalhost = window.location.hostname === 'localhost';
            const BASE_URL = isLocalhost
                ? process.env.REACT_APP_API_BASE_URL
                : process.env.REACT_APP_API_PROD_URL;

            fetch(`${BASE_URL}/predict`, {
                method: 'POST',
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    if (data.prediction === "NO_DIGIT_FOUND") {
                        reject("Please draw something on the canvas.");
                    } else if (data.prediction !== undefined) {
                        resolve(`Prediction: ${data.prediction}`);
                    } else {
                        reject('Prediction failed');
                    }
                })
                .catch(err => {
                    console.error(err);
                    reject('Error: Failed to fetch prediction');
                });
        }, 'image/png');
    });
};
