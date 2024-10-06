import React from 'react';
import SyaratDanKetentuan from './KebijakanPrivasi';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';
import KebijakanPrivasi from './KebijakanPrivasi';

const PrivacyLayout = () => {
    return (
        <>
        <Navbar/>
        <KebijakanPrivasi/>
        <Footer/>
        </>
    );
};

export default PrivacyLayout;