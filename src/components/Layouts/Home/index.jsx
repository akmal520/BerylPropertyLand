import Navbar from '../Navbar/Navbar';
import Hero from './Hero';
import React from 'react';
import PropertyType from './PropertyType';
import LayananKami from './LayananKami';


const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <PropertyType/>
            <LayananKami/>
        </>
    );
};

export default HomeLayout;
