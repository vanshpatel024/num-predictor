# NumSense – Digit Recognition Web App (React + FastAPI + CNN)

**NumSense** is a real-time digit classification web application powered by a custom-trained **CNN model** on the **SVHN (Street View House Numbers)** dataset. It allows users to draw **multiple handwritten digits** on a canvas and uses **contour-based segmentation** to extract and classify them individually.

This project brings together **AI model integration**, **OpenCV-based image preprocessing**, and a **modern UI/UX** for a clean, interactive experience.

---

## How It Works

1. Users draw digits on a canvas built with **React + TypeScript**.
2. The image is sent to a **FastAPI backend** where it’s preprocessed using **OpenCV** and **Pillow**.
3. Digit contours are detected, isolated, resized, and passed through a trained **CNN model (Keras)**.
4. Predictions are returned and rendered on the frontend in real time.

---

## Features

- Responsive drawing canvas (mouse + touch support)
- Multi-digit prediction using contour segmentation
- FastAPI backend with OpenCV preprocessing
- CNN-based digit classifier trained on SVHN
- Fullscreen drawing mode with centered layout
- Dynamic glowing grid background (CSS only)
- macOS-style UI with SF Mono font and window buttons
- Terminal-inspired “Model Insights” section with animated cards
- Clean UX: hover transitions, sticky footer, responsive layout
- Custom favicon, tab title, and modern web branding

---

## Live Demo

[**Try the App**](https://num-predictor.vercel.app/)  
*(Note: The backend is hosted on Render and may sleep after inactivity. If it doesn’t respond immediately, please wait a few seconds or reach out to wake it up.)*

---

## Tech Stack

- **Frontend:** React, TypeScript, Vanilla CSS  
- **Backend:** FastAPI, Python, OpenCV, Pillow  
- **Model:** Keras, CNN trained on SVHN  
- **Deployment:** Vercel (frontend) + Render (backend)

---

## Contact

Have feedback, questions, or want to try the backend live?  
**vanshpatel024@gmail.com**  
[LinkedIn](https://linkedin.com/in/vanshpatel024)

---
