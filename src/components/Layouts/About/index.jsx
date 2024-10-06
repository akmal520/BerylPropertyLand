import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';
import TentangKami from './TentangKami';
import VisiMisi from './VisiMisi';
import React from 'react';

const AboutLayout = () => {
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
