import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';
import FAQ from './FAQ';
import React, { useEffect } from 'react';

const FaqLayout = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <>
            <Navbar />
            <FAQ />
            <Footer />
        </>
    );
};

export default FaqLayout;
