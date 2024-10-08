import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';
import HubungiKami from './HubungiKami';
import React, { useEffect } from 'react';

const ContactUsLayout = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <>
            <Navbar />
            <HubungiKami />
            <Footer />
        </>
    );
};

export default ContactUsLayout;
