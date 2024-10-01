import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';
import Hero from './Hero';
import LayananKami from './LayananKami';
import MengapaMemilihKami from './MengapaMemilihKami';
import VisiMIsi from './VisiMIsi';
import PropertyKota from './PropertyKota';
import PropertyType from './PropertyType';
import React from 'react';

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <PropertyKota />
            <PropertyType />
            <LayananKami />
            <MengapaMemilihKami />
            <VisiMIsi/>
            <Footer />
        </>
    );
};

export default HomeLayout;
