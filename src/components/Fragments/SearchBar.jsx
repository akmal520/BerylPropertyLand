import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dataList = [
    { id: 1, city: 'New York', propertyType: 'Apartment', price: 100000 },
    { id: 2, city: 'Los Angeles', propertyType: 'House', price: 750000 },
    { id: 3, city: 'Chicago', propertyType: 'Apartment', price: 1200000 },
];

const SearchBar = () => {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        // Konversi harga range ke nilai numerik
        const [minPrice, maxPrice] = priceRange
            ? priceRange
                  .split('-')
                  .map((price) => parseInt(price.replace(/\D/g, '')))
            : [0, Infinity];

        // Filter data berdasarkan input pengguna
        const filteredData = dataList.filter(
            (item) =>
                (location === '' || item.city === location) &&
                (propertyType === '' || item.propertyType === propertyType) &&
                item.price >= minPrice &&
                item.price <= maxPrice
        );

        // Simpan hasil pencarian ke localStorage
        localStorage.setItem('filteredData', JSON.stringify(filteredData));

        // Navigasi ke halaman /property dengan data yang difilter
        navigate('/property', { state: { filteredData } });
    };

    return (
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg py-4 px-8 space-y-4 md:space-y-0 md:space-x-4">
            {/* Location Field */}
            <div className="flex flex-col items-start space-x-2 lg:border-r px-4 w-full md:w-auto">
                <label className="text-gray-500 font-semibold ml-3">
                    Location
                </label>
                <select
                    className="w-full md:w-auto bg-transparent text-gray-400 outline-none focus:text-gray-900"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value="">Select Your City</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                </select>
            </div>

            {/* Property Type Field */}
            <div className="flex flex-col items-start space-x-2 lg:border-r px-4 w-full md:w-auto">
                <label className="text-gray-500 font-semibold ml-3">
                    Property Type
                </label>
                <select
                    className="w-full md:w-auto bg-transparent text-gray-400 outline-none focus:text-gray-900"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                >
                    <option value="">Choose Property Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                </select>
            </div>

            {/* Price Range Field */}
            <div className="flex flex-col items-start space-x-2 px-4 w-full md:w-auto">
                <label className="text-gray-500 font-semibold ml-3">
                    Price Range
                </label>
                <select
                    className="w-full md:w-auto bg-transparent text-gray-400 outline-none focus:text-gray-900"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                >
                    <option value="">Choose Price Range</option>
                    <option value="$100,000 - $500,000">
                        $100,000 - $500,000
                    </option>
                    <option value="$500,000 - $1,000,000">
                        $500,000 - $1,000,000
                    </option>
                    <option value="$1,000,000 - $1,500,000">
                        $1,000,000 - $1,500,000
                    </option>
                </select>
            </div>

            {/* Search Button */}
            <button
                onClick={handleSearch}
                className="ml-auto md:ml-0 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none w-full md:w-auto flex justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5a7 7 0 00-7 7 7 7 0 007 7 7 7 0 007-7 7 7 0 00-7-7zM19 19l-2-2"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const dataList = [
//     {
//         id: 1,
//         city: 'New York',
//         propertyType: 'Apartment',
//         priceRange: '$100 - $500',
//     },
//     {
//         id: 2,
//         city: 'Los Angeles',
//         propertyType: 'House',
//         priceRange: '$500 - $1000',
//     },
//     {
//         id: 3,
//         city: 'Chicago',
//         propertyType: 'Apartment',
//         priceRange: '$1000 - $1500',
//     },
// ];

// const SearchBar = () => {
//     const [location, setLocation] = useState('');
//     const [propertyType, setPropertyType] = useState('');
//     const [priceRange, setPriceRange] = useState('');
//     const navigate = useNavigate();

//     const handleSearch = () => {
//         // Filter data based on user input
//         const filteredData = dataList.filter(
//             (item) =>
//                 (location === '' || item.city === location) &&
//                 (propertyType === '' || item.propertyType === propertyType) &&
//                 (priceRange === '' || item.priceRange === priceRange)
//         );

//         // Navigate to /property page with filtered data
//         navigate('/property', { state: { filteredData } });
//     };

//     return (
//         <div className="flex bg-white/70 backdrop-blur-xl shadow-md rounded-lg p-4">
//             {/* Location Field */}
//             <div className="flex flex-col items-start space-x-2 border-r pr-4">
//                 <label className="text-[#110229] font-semibold ml-3">
//                     Location
//                 </label>
//                 <select
//                     className="bg-transparent text-[#8F90A6] outline-none focus:text-gray-900"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                 >
//                     <option value="">Select Your City</option>
//                     <option value="New York">New York</option>
//                     <option value="Los Angeles">Los Angeles</option>
//                     <option value="Chicago">Chicago</option>
//                 </select>
//             </div>

//             {/* Property Type Field */}
//             <div className="flex flex-col items-start space-x-2 border-r px-4">
//                 <label className="text-[#110229] font-semibold ml-3">
//                     Property Type
//                 </label>
//                 <select
//                     className="bg-transparent text-[#8F90A6] outline-none focus:text-gray-900"
//                     value={propertyType}
//                     onChange={(e) => setPropertyType(e.target.value)}
//                 >
//                     <option value="">Choose Property Type</option>
//                     <option value="Apartment">Apartment</option>
//                     <option value="House">House</option>
//                 </select>
//             </div>

//             {/* Price Range Field */}
//             <div className="flex flex-col items-start space-x-2 px-4">
//                 <label className="text-[#110229] font-semibold ml-3">
//                     Price Range
//                 </label>
//                 <select
//                     className="bg-transparent text-[#8F90A6] outline-none focus:text-gray-900"
//                     value={priceRange}
//                     onChange={(e) => setPriceRange(e.target.value)}
//                 >
//                     <option value="">Choose Price Range</option>
//                     <option value="$100 - $500">$100 - $500</option>
//                     <option value="$500 - $1000">$500 - $1000</option>
//                     <option value="$1000 - $1500">$1000 - $1500</option>
//                 </select>
//             </div>

//             {/* Search Button */}
//             <button
//                 onClick={handleSearch}
//                 className="ml-8 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
//             >
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                 >
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M11 5a7 7 0 00-7 7 7 7 0 007 7 7 7 0 007-7 7 7 0 00-7-7zM19 19l-2-2"
//                     />
//                 </svg>
//             </button>
//         </div>
//     );
// };

// export default SearchBar;
