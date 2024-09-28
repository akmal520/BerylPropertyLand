import { Link } from 'react-router-dom';
import propertyList1 from '../../../assets/propertyList1.jpg';
import propertyList2 from '../../../assets/propertyList2.jpg';
import propertyList3 from '../../../assets/propertyList3.jpg';
import Details from './Details';
import React from 'react';


const PropertyType = () => {
    const properties = [
        {
            id: 1,
            city: "Jakarta",
            title: "Apartemen di Jakarta",
            price: "Rp 1.500.000.000",
            image: propertyList1 
        },
        {
            id: 2,
            city: "Bandung",
            title: "Villa di Bandung",
            price: "Rp 2.000.000.000",
            image: propertyList2 
        },
        {
            id: 3,
            city: "Bali",
            title: "Rumah di Bali",
            price: "Rp 3.500.000.000",
            image: propertyList3 
        }, 
    ]; 

    return (
        <section className='container mx-auto'>
            <h2 className='text-2xl font-bold py-7'>Cari properti ideal di kota impian Anda.</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {properties.map(property => (
                    <Link to={`/details/${property.id}`} key={property.id} style={{ textDecoration: 'none', width: '300px' }}>

                    <div 
                    key={property.id} 
                    className='border rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105'
                    >
                        <img src={property.image} alt={property.title} className='w-full h-40 object-cover' />
                        <div className='p-2'>
                            <h3 className='font-semibold text-lg'>{property.title}</h3>
                            <p className='text-gray-700'>{property.city}</p>
                            <p className='text-green-600 font-bold'>{property.price}</p>
                        </div>
                    </div>
                        </Link>
                ))}
            </div>
        </section>
    );
};

export default PropertyType;
