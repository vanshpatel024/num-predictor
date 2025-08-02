import React, { useRef, useState, useEffect } from 'react';
import {
    clearCanvas,
    startDrawing as startDrawingUtil,
    draw as drawUtil,
    stopDrawing as stopDrawingUtil,
    startTouchDrawing as startTouchDrawingUtil,
    drawTouch as drawTouchUtil
} from './canvasUtils';
import { useCanvas } from './useCanvas';
import { predictDigit } from '../../utils/predict';

import '../../styles/DrawableCanvas.css';

const DrawableCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isCanvasVisible, setIsCanvasVisible] = useState(true);
    const [predictionResult, setPredictionResult] = useState<string>('Draw a number');

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
    useCanvas(canvasRef, isCanvasVisible, startTouchDrawing, drawTouch, stopDrawing, setCtx);

    const handlePredict = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        try {
            const result = await predictDigit(canvas);
            setPredictionResult(result);
        } catch (error) {
            if (typeof error === 'string') {
                setPredictionResult(error);
            } else {
                setPredictionResult('Unexpected error occurred');
            }
        }
    };

    return (
        <>
            <div className="mainWrapper">
                {
                    isCanvasVisible ? (
                        <div className="canvasWrapper" >
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
                                <div className="dotWrapper green" title="Maximize">
                                    <span className="dot">
                                        <i className="fa fa-expand icon" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <span className="title">digit_recognition.canvas</span>
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
                            <p className="hint">{predictionResult}</p>

                            <div className="buttonGroup">
                                <button onClick={handlePredict} className="btn">
                                    <i className="fas fa-wand-magic-sparkles"></i> Predict
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

                        </div >
                    ) : (
                        <div className="folderWrapper" onClick={openCanvas}>
                            <i className="fa fa-folder" aria-hidden="true"></i>
                            <span className="folderLabel">Canvas</span>
                        </div>
                    )}
            </div>
        </>
    );
};

export default DrawableCanvas;