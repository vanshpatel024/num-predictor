export type UseCanvasTypes = {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    isCanvasVisible: boolean;
    startTouchDrawing: (e: React.TouchEvent<HTMLCanvasElement>) => void;
    drawTouch: (e: React.TouchEvent<HTMLCanvasElement>) => void;
    stopDrawing: () => void;
    setCtx: React.Dispatch<React.SetStateAction<CanvasRenderingContext2D | null>>;
};