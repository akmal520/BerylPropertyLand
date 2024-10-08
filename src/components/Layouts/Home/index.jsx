import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';
import Hero from './Hero';
import LayananKami from './LayananKami';
import MengapaMemilihKami from './MengapaMemilihKami';
import PropertyKota from './PropertyKota';
import PropertyType from './PropertyType';
import React, { useEffect } from 'react';

const HomeLayout = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <>
            <Navbar />
            <Hero />
            <PropertyKota />
            <PropertyType />
            <LayananKami />
            <MengapaMemilihKami />
            <Footer />
        </>
    );
};

export default HomeLayout;
