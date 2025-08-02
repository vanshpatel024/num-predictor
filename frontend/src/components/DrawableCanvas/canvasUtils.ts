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
