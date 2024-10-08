import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';
import SyaratDanKetentuan from './SyaratDanKetentuan';
import React, { useEffect } from 'react';

const TermsLayout = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <>
            <Navbar />
            <SyaratDanKetentuan />
            <Footer />
        </>
    );
};

export default TermsLayout;
