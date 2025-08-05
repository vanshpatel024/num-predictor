import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // ← ADD THIS
import '../styles/ModelInsights.css';

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

const ModelInsights = () => {
    const [isOpen, setIsOpen] = useState(false);
    const insightsRef = useRef<HTMLDivElement>(null);

    const toggleInsights = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (isOpen && insightsRef.current) {
            insightsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isOpen]);

    return (
        <>
            <div className="insights-button-container">
                <button className="btn" onClick={toggleInsights}>
                    <i className="fas fa-terminal"></i>
                    {isOpen ? 'Close Insights' : 'Model Insights'}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="insights-section"
                        ref={insightsRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="insights-grid">
                            {[
                                {
                                    title: "SVHN Dataset Training",
                                    description: "This CNN model is trained on the Street View House Numbers (SVHN) dataset from Google. It enables multi-digit detection through contour-based segmentation, processing each digit individually even though originally trained on single digits."
                                },
                                {
                                    title: "Improve Accuracy",
                                    description: "Since the model was trained on Google Street View house numbers, drawing digits in a print-style font (similar to house number fonts) will significantly increase prediction accuracy compared to cursive handwriting."
                                },
                                {
                                    title: "Model Limitations",
                                    description: "This model is not fully trained to reject non-digit inputs. It may classify random drawings, shapes, or letters as digits. For best results, please draw only numerical digits (0-9) on the canvas."
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="insight-card"
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="card-content">
                                        <div className="card-title">{item.title}</div>
                                        <div className="card-description">{item.description}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ModelInsights;
