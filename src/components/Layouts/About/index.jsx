import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';
import TentangKami from './TentangKami';
import VisiMisi from './VisiMisi';
import React, { useEffect } from 'react';

const AboutLayout = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <>
            <Navbar />
            <TentangKami />
            <VisiMisi />
            <Footer />
        </>
    );
};

export default AboutLayout;
