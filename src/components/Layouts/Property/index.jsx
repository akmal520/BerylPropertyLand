import Navbar from '../Navbar/Navbar';
import PropertyCard from './PropertyCard';
import PropertySearch from './PropertySearch';
import React from 'react';

const PropertyLayout = () => {
    return (
        <section>
            <Navbar />
            <div>
                <PropertySearch />
                <PropertyCard />
            </div>
        </section>
    );
};

export default PropertyLayout;
