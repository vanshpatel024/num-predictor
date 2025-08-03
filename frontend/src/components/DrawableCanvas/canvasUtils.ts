// not exporting getRelative Coords cause its used within this file.
const getRelativeCoords = (e: React.MouseEvent, canvas: HTMLCanvasElement | null) => {
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    };
};


export const clearCanvas = (canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null) => {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};


export const startDrawing = (
    e: React.MouseEvent,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    ctx: CanvasRenderingContext2D | null,
    setIsDrawing: (drawing: boolean) => void
) => {
    if (!ctx) return;
    const { x, y } = getRelativeCoords(e, canvasRef.current);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
};


export const draw = (
    e: React.MouseEvent,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    ctx: CanvasRenderingContext2D | null,
    isDrawing: boolean
) => {
    if (!isDrawing || !ctx) return;
    const { x, y } = getRelativeCoords(e, canvasRef.current);
    ctx.lineTo(x, y);
    ctx.stroke();
};


export const stopDrawing = (
    ctx: CanvasRenderingContext2D | null,
    setIsDrawing: (drawing: boolean) => void
) => {
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
};


export const startTouchDrawing = (
    e: React.TouchEvent<HTMLCanvasElement>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    ctx: CanvasRenderingContext2D | null,
    setIsDrawing: (drawing: boolean) => void
) => {
    if (!ctx || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
};


export const drawTouch = (
    e: React.TouchEvent<HTMLCanvasElement>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    ctx: CanvasRenderingContext2D | null,
    isDrawing: boolean
) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
};

export const isCanvasEmpty = (canvas: HTMLCanvasElement): boolean => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return true;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // Get first pixel color
    const r0 = imageData[0];
    const g0 = imageData[1];
    const b0 = imageData[2];
    const a0 = imageData[3];

    for (let i = 4; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];

        if (r !== r0 || g !== g0 || b !== b0 || a !== a0) {
            return false;
        }
    }

    return true;
};

