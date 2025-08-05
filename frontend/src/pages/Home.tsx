import React from 'react';
import DrawableCanvas from '../components/DrawableCanvas/DrawableCanvas';
import DynamicGrid from '../components/DynamicGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';
import ModelInsights from '../components/ModelInsights';

const Home = () => {
    return (
        <div className="home-container">
            <Header />
            <main className="home-main">
                <DrawableCanvas />
                <ModelInsights />
                <DynamicGrid />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
