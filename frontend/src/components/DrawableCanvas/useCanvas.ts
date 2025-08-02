import { useEffect, useState } from 'react';

export const useCanvas = (
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    isCanvasVisible: boolean,
    startTouchDrawing: any,
    drawTouch: any,
    stopDrawing: any,
    setCtx: React.Dispatch<React.SetStateAction<CanvasRenderingContext2D | null>>
) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            const containerWidth = canvas.parentElement?.offsetWidth || 700;
            const canvasWidth = Math.min(containerWidth - 32, 700);
            const canvasHeight = window.innerWidth < 500 ? 300 : 200;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const context = canvas.getContext('2d');
            if (!context) return;

            const rootStyles = getComputedStyle(document.documentElement);
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.lineWidth = 8;
            context.strokeStyle = rootStyles.getPropertyValue('--stroke-color').trim();
            context.fillStyle = rootStyles.getPropertyValue('--bg-tertiary').trim();
            context.fillRect(0, 0, canvas.width, canvas.height);

            setCtx(context);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const touchStartHandler = (e: TouchEvent) => startTouchDrawing(e as any);
        const touchMoveHandler = (e: TouchEvent) => drawTouch(e as any);
        const touchEndHandler = () => stopDrawing();

        canvas.addEventListener('touchstart', touchStartHandler, { passive: false });
        canvas.addEventListener('touchmove', touchMoveHandler, { passive: false });
        canvas.addEventListener('touchend', touchEndHandler, { passive: false });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('touchstart', touchStartHandler);
            canvas.removeEventListener('touchmove', touchMoveHandler);
            canvas.removeEventListener('touchend', touchEndHandler);
        };
    }, [isCanvasVisible]);
};
