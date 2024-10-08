import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';
import SyaratDanKetentuan from './KebijakanPrivasi';
import KebijakanPrivasi from './KebijakanPrivasi';
import React, { useEffect } from 'react';

const PrivacyLayout = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <>
            <Navbar />
            <KebijakanPrivasi />
            <Footer />
        </>
    );
};

export default PrivacyLayout;
