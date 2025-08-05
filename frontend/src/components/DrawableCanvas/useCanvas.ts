import { useEffect, useState } from 'react';
import { UseCanvasTypes } from '../../types/useCanvasTypes';

export const useCanvas = ({
    canvasRef,
    isCanvasVisible,
    startTouchDrawing,
    drawTouch,
    stopDrawing,
    setCtx,
}: UseCanvasTypes) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const containerWidth = canvas.parentElement?.offsetWidth || 700;
            const canvasCSSWidth = Math.min(containerWidth - 32, 700);
            const canvasCSSHeight = window.innerWidth < 500 ? 300 : 200;

            const dpr = window.devicePixelRatio || 1;

            canvas.style.width = `${canvasCSSWidth}px`;
            canvas.style.height = `${canvasCSSHeight}px`;

            canvas.width = canvasCSSWidth * dpr;
            canvas.height = canvasCSSHeight * dpr;

            const context = canvas.getContext('2d');
            if (!context) return;

            context.scale(dpr, dpr); // <-- This is the key for pixel-perfect rendering

            const rootStyles = getComputedStyle(document.documentElement);
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.lineWidth = 8;
            context.strokeStyle = rootStyles.getPropertyValue('--stroke-color').trim();
            context.fillStyle = rootStyles.getPropertyValue('--bg-tertiary').trim();

            // Note: fillRect uses CSS width/height not scaled dimensions
            context.fillRect(0, 0, canvasCSSWidth, canvasCSSHeight);

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
