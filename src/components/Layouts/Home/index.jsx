import Navbar from '../Navbar/Navbar';
import Hero from './Hero';
import PropertyType from './PropertyType';
import React from 'react';

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <PropertyType />
        </>
    );
};

export default HomeLayout;
