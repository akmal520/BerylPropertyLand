import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';
import PropertyCard from './PropertyCard';
import PropertySearch from './PropertySearch';
import React from 'react';

const PropertyLayout = () => {
    return (
        <section>
            <Navbar />
            {/* <div> */}
            <PropertySearch />
            <PropertyCard />
            {/* </div> */}

            <Footer />
        </section>
    );
};

export default PropertyLayout;
