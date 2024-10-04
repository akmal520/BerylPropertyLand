import React from 'react';
import Footer from '../Layouts/Footer'; 
import TentangKami from './TentangKami';
import VisiMisi from './VisiMisi';

const AboutLayout = () => {
    return (
        <>
            <TentangKami />
            <VisiMisi />
            <Footer />
        </>
    );
};

export default AboutLayout;
