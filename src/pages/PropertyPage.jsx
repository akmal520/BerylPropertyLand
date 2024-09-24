import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PropertyPage = () => {
    const location = useLocation();
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Cek apakah data ada di location.state
        if (location.state && location.state.filteredData) {
            setFilteredData(location.state.filteredData);
        } else {
            // Ambil data dari localStorage jika tidak ada di state
            const storedData = localStorage.getItem('filteredData');
            if (storedData) {
                setFilteredData(JSON.parse(storedData));
            }
        }
    }, [location.state]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Property Results</h1>
            {filteredData.length > 0 ? (
                <ul className="space-y-2">
                    {filteredData.map((item) => (
                        <li
                            key={item.id}
                            className="border p-4 rounded-lg shadow-sm"
                        >
                            <p>City: {item.city}</p>
                            <p>Property Type: {item.propertyType}</p>
                            <p>Sell Type: {item.sellType}</p>
                            <p>Price: ${item.price.toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No properties found</p>
            )}
        </div>
    );
};

export default PropertyPage;
