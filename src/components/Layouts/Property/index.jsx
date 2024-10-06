import Footer from '../Footer';
import Navbar from '../Navbar/Navbar';
import PropertyCard from './PropertyCard';
import PropertySearch from './PropertySearch';
import { supabase } from '@/utils/supabase/client';
import { Loader, LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PropertyLayout = () => {
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const city = searchParams.get('city') || '';
        const propertyType = searchParams.get('property_type') || '';
        const minPrice = searchParams.get('minPrice') || '';
        const maxPrice = searchParams.get('maxPrice') || '';
        const bedrooms = searchParams.get('bedrooms') || '';
        const bathrooms = searchParams.get('bathrooms') || '';

        window.scrollTo({ top: 0, behavior: 'smooth' });

        const fetchDataProperties = async () => {
            let query = supabase.from('properties').select('*');

            if (city) {
                query = query.ilike('city', `%${city}%`);
            }
            if (propertyType) {
                query = query.ilike('property_type', `%${propertyType}%`);
            }
            if (bedrooms) {
                if (parseInt(bedrooms) === 5) {
                    query = query.gte('bedroom', parseInt(bedrooms));
                } else {
                    query = query.eq('bedroom', parseInt(bedrooms));
                }
            }
            if (bathrooms) {
                if (parseInt(bathrooms) === 5) {
                    query = query.gte('bathroom', parseInt(bathrooms));
                } else {
                    query = query.eq('bathroom', parseInt(bathrooms));
                }
            }
            if (minPrice && !maxPrice) {
                // Jika hanya min price diisi
                query = query.gte('price', parseInt(minPrice));
            } else if (!minPrice && maxPrice) {
                // Jika hanya max price diisi
                query = query.lte('price', parseInt(maxPrice));
            } else if (minPrice && maxPrice) {
                // Jika min dan max price keduanya diisi
                query = query
                    .gte('price', parseInt(minPrice))
                    .lte('price', parseInt(maxPrice));
            }

            const { data, error } = await query;
            if (data) {
                setProperties(data);
                setTimeout(() => setLoading(false), 1000);
            } else {
                console.error(error);
            }
        };

        fetchDataProperties();
    }, [location.search]);

    return (
        <section>
            <Navbar />
            {/* <div> */}
            <PropertySearch />
            <PropertyCard dataProperties={properties}>
                {loading ? (
                    <div className="w-full flex flex-col justify-center items-center">
                        <LoaderCircle className="w-20 h-20 animate-spin" />
                        <span className="text-lg mt-2">Loading...</span>
                    </div>
                ) : (
                    <PropertyCard.PropertyCardList
                        dataProperties={properties}
                    />
                )}
            </PropertyCard>
            {/* </div> */}

            <Footer />
        </section>
    );
};

export default PropertyLayout;
