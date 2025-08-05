import React, { useRef, useState, useEffect } from 'react';
import {
    isCanvasEmpty,
    clearCanvas,
    startDrawing as startDrawingUtil,
    draw as drawUtil,
    stopDrawing as stopDrawingUtil,
    startTouchDrawing as startTouchDrawingUtil,
    drawTouch as drawTouchUtil
} from './canvasUtils';
import { useCanvas } from './useCanvas';
import { predictDigit } from '../../utils/predict';
import DynamicGrid from '../DynamicGrid';

import '../../styles/DrawableCanvas.css';

const DrawableCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isCanvasVisible, setIsCanvasVisible] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [predictionResult, setPredictionResult] = useState<string>('Draw a number');
    const [isPredicting, setIsPredicting] = useState(false);


    const closeCanvas = () => setIsCanvasVisible(false);
    const openCanvas = () => setIsCanvasVisible(true);

    // used this to send the mouse event object to the function
    const startDrawing = (e: React.MouseEvent) =>
        startDrawingUtil(e, canvasRef, ctx, setIsDrawing);

    const draw = (e: React.MouseEvent) =>
        drawUtil(e, canvasRef, ctx, isDrawing);

    const stopDrawing = () =>
        stopDrawingUtil(ctx, setIsDrawing);

    const startTouchDrawing = (e: React.TouchEvent<HTMLCanvasElement>) =>
        startTouchDrawingUtil(e, canvasRef, ctx, setIsDrawing);

    const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) =>
        drawTouchUtil(e, canvasRef, ctx, isDrawing);

    // use effect
    useCanvas({
        canvasRef,
        isCanvasVisible,
        startTouchDrawing,
        drawTouch,
        stopDrawing,
        setCtx
    });

    const handlePredict = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (isCanvasEmpty(canvas)) {
            alert('Please draw on the canvas');
            return;
        }

        setIsPredicting(true);

        try {
            const result = await predictDigit(canvas);
            setPredictionResult(result);
        } catch (error) {
            if (typeof error === 'string') {
                setPredictionResult(error);
            } else {
                setPredictionResult('Unexpected error occurred');
            }
        } finally {
            setIsPredicting(false);
        }
    };

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement && containerRef.current) {
            await containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div className={`mainWrapper ${isFullscreen ? 'fullscreen' : ''}`} ref={containerRef}>
            {isFullscreen && <DynamicGrid />} {/* <-- Render grid only in fullscreen */}

            {isCanvasVisible ? (
                <div className="canvasWrapper">
                    <div className="canvasHeader">
                        <div className="dotWrapper red" onClick={closeCanvas} title="Close">
                            <span className="dot">
                                <i className="fa fa-times icon" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="dotWrapper yellow" onClick={closeCanvas} title="Minimize">
                            <span className="dot">
                                <i className="fa fa-minus icon" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="dotWrapper green" onClick={toggleFullscreen} title="Toggle Fullscreen">
                            <span className="dot">
                                <i className={`fa ${isFullscreen ? 'fa-compress' : 'fa-expand'} icon`} aria-hidden="true"></i>
                            </span>
                        </div>
                        <span className="title">num_recognition.canvas</span>
                    </div>

                    <canvas
                        ref={canvasRef}
                        className="canvasElement"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startTouchDrawing}
                        onTouchMove={drawTouch}
                        onTouchEnd={stopDrawing}
                    />
                    <p className={`hint ${predictionResult.startsWith('Prediction:') ? 'glow' : ''}`}>
                        {predictionResult}
                    </p>

                    <div className="buttonGroup">
                        <button onClick={handlePredict} className="btn" disabled={isPredicting}>
                            {isPredicting ? (
                                <>
                                    <i className="fas fa-circle-notch fa-spin"></i> Predicting...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-wand-magic-sparkles"></i> Predict
                                </>
                            )}

                        </button>

                        <button
                            onClick={() => {
                                clearCanvas(canvasRef.current, ctx);
                                setPredictionResult('Draw a number');
                            }}
                            className="btn"
                        >
                            <i className="fas fa-eraser"></i> Clear
                        </button>
                    </div>

                </div>
            ) : (
                <div className="folderWrapper" onClick={openCanvas}>
                    <i className="fa fa-folder" aria-hidden="true"></i>
                    <span className="folderLabel">Canvas</span>
                </div>
            )}
        </div>
    );
};

export default DrawableCanvas;