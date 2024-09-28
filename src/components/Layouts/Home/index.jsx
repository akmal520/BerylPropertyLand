import Navbar from '../Navbar/Navbar';
import Hero from './Hero';
import LayananKami from './LayananKami';
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
        </>
    );
};

export default HomeLayout;
