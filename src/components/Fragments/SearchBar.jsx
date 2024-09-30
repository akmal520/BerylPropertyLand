import { dataRangesPrice as ranges } from '@/data/datas';
import { ListProperty } from '@/data/listPropeti';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [priceRange, setPriceRange] = useState('');
    // const [status, setStatus] = useState('');
    // const [sellType, setSellType] = useState('');
    const navigate = useNavigate();

    // console.log(priceRange);

    // filter kota  yang sama
    const uniqueCities = [...new Set(ListProperty.map((item) => item.city))];

    // filter tipe properti yang sama
    const uniquePropertyTypes = [
        ...new Set(ListProperty.map((item) => item.propertyType)),
    ];

    const handleSearch = () => {
        // Konversi harga range ke nilai numerik
        const [minPrice, maxPrice] = priceRange
            ? priceRange
                  .split('-')
                  .map((price) => parseInt(price.replace(/\D/g, '')))
            : [0, Infinity];

        // Filter data berdasarkan input pengguna
        const filteredData = ListProperty.filter(
            (item) =>
                (location === '' || item.city === location) &&
                (propertyType === '' || item.propertyType === propertyType) &&
                // (sellType === '' || item.sellType === sellType) &&
                item.price >= minPrice &&
                item.price <= maxPrice
        );

        // Simpan hasil pencarian ke localStorage
        localStorage.setItem('filteredData', JSON.stringify(filteredData));

        localStorage.setItem(
            'dataFilter',
            JSON.stringify([
                {
                    location,
                    propertyType,
                    priceRange,
                },
            ])
        );

        // Navigasi ke halaman /property dengan data yang difilter
        navigate('/property', { state: { filteredData } });
    };

    return (
        <div>
            {/* <div className="hidden md:flex md:flex-row gap-4 -mb-1">
                <button
                    className={`${
                        sellType === ''
                            ? 'bg-white text-gray-600 font-semibold'
                            : 'text-gray-500'
                    } text-base px-6 pt-2 pb-3 rounded-sm`}
                    onClick={() => setSellType('')}
                >
                    All
                </button>
                <button
                    className={`${
                        sellType.toLowerCase() === 'buy'
                            ? 'bg-white text-gray-600 font-semibold'
                            : 'text-gray-500'
                    } text-base px-6 pt-2 pb-3 rounded-sm`}
                    onClick={() => setSellType('Buy')}
                >
                    Buy
                </button>
                <button
                    className={`${
                        sellType.toLowerCase() === 'rent'
                            ? 'bg-white text-gray-600 font-semibold'
                            : 'text-gray-500'
                    } text-base px-6 pt-2 pb-3 rounded-sm`}
                    onClick={() => setSellType('Rent')}
                >
                    Rent
                </button>
            </div> */}
            <div className="flex flex-col md:flex-row bg-white/75 backdrop-blur-lg shadow-md rounded-lg py-4 px-8 space-y-4 md:space-y-0 md:space-x-4">
                {/* Location Field */}
                <div className="flex flex-col items-start space-x-2 lg:border-r px-4 w-full md:w-auto">
                    <label className="text-gray-600 font-semibold ml-3">
                        Location
                    </label>
                    <select
                        className="w-full md:w-auto bg-transparent text-gray-500 outline-none focus:text-gray-900 capitalize"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        <option value="" disabled>
                            Select Your City
                        </option>
                        {uniqueCities.map((item, index) => (
                            <option
                                key={index}
                                value={item}
                                className="capitalize"
                            >
                                {item}
                            </option>
                        ))}
                        {/* <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Chicago">Chicago</option> */}
                    </select>
                </div>

                {/* Property Type Field */}
                <div className="flex flex-col items-start space-x-2 lg:border-r px-4 w-full md:w-auto">
                    <label className="text-gray-600 font-semibold ml-3">
                        Property Type
                    </label>
                    <select
                        className="w-full md:w-auto bg-transparent text-gray-500 outline-none focus:text-gray-900 capitalize"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                    >
                        <option value="">Choose Property Type</option>
                        {uniquePropertyTypes.map((item, index) => (
                            <option
                                key={index}
                                value={item}
                                className="capitalize"
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range Field */}
                <div className="flex flex-col items-start space-x-2 px-4 w-full md:w-auto">
                    <label className="text-gray-600 font-semibold ml-3">
                        Price Range
                    </label>
                    <select
                        className="w-full md:w-auto bg-transparent text-gray-500 outline-none focus:text-gray-900"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                    >
                        <option value="">Choose Price Range</option>
                        {ranges.map((range, index) => (
                            <option
                                key={index}
                                value={`${range.min} - ${range.max}`}
                                className="capitalize"
                            >
                                {range.label}
                            </option>
                        ))}
                        {/* <option value="0 - Rp1,000,000,000">
                            {'< '} Rp 1 M
                        </option>
                        <option value="$500,000 - $1,000,000">
                            $500,000 - $1,000,000
                        </option>
                        <option value="$1,000,000 - $1,500,000">
                            $1,000,000 - $1,500,000
                        </option> */}
                    </select>
                </div>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="ml-auto md:ml-0 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none w-full md:w-auto flex justify-center"
                >
                    <span className="mr-2 block md:hidden">Search</span>
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
        </div>
    );
};

export default SearchBar;
