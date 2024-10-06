import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { GiModernCity } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';

const PropertyKota = () => {
    const location = useLocation();
    const [cities, setCities] = useState([]);
    // const [location, setLocation] = useState('');

    useEffect(() => {
        const getCity = async () => {
            let { data: cities, error } = await supabase
                .from('properties')
                .select('city, price');
            if (cities) {
                setCities(cities);
            }
        };

        getCity();
    }, []);

    const navigate = useNavigate();
    const uniqueCities = [...new Set(cities.map((item) => item.city))];

    const sliceData =
        uniqueCities.length % 2 !== 0
            ? uniqueCities.slice(0, -1)
            : uniqueCities;

    const handelClickCity = (city) => {
        const queryParams = new URLSearchParams({
            city: city,
            // property_type: selectPropertyType ,
            // minPrice: minPrice ,
            // maxPrice: maxPrice ,
            // bedrooms: selectBedRooms ,
            // bathrooms: selectBathRooms ,
        }).toString();
        navigate(`/property?${queryParams}`);
    };

    const getAveragePriceByCity = (cityKey) => {
        // Filter data berdasarkan kota
        const cityData = cities.filter(
            (item) => item.city.toLowerCase() === cityKey.toLowerCase()
        );

        // Jika kota tidak ditemukan
        if (cityData.length === 0) {
            return `Kota ${cityKey} tidak ditemukan.`;
        }

        // Hitung total dan rata-rata harga
        const totalPrice = cityData.reduce(
            (sum, item) => sum + parseInt(item.price, 10),
            0
        );
        const averagePrice = totalPrice / cityData.length;

        // Fungsi untuk memformat harga
        const formatPrice = (price) => {
            if (price >= 1000000000) {
                return `Rp ${(price / 1000000000).toFixed(0)} M`; // Billion
            } else if (price >= 1000000) {
                return `Rp ${(price / 1000000).toFixed(0)} JT`; // Million
            } else if (price >= 1000) {
                return `Rp ${(price / 1000).toFixed(0)} K`; // Thousand
            } else {
                return `Rp ${price}`; // Smaller than a million
            }
        };

        // Kembalikan rata-rata harga yang sudah diformat
        return `${formatPrice(averagePrice)}`;
    };

    return (
        <section className="container mx-auto py-5">
            <h2 className="text-3xl md:text-2xl text-center md:text-left text-head capitalize font-bold py-4 ">
                Cari properti favoritmu
            </h2>

            <div
                // className="flex flex-wrap md:flex-row justify-center md:justify-evenly items-center gap-4 mt-4"
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 place-items-center"
            >
                {uniqueCities.map((city, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center w-[150px] min-h-[175px] md:w-[350px] gap-4 justify-between border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-300"
                        onClick={() => handelClickCity(city)}
                    >
                        <GiModernCity className="text-sub_head text-4xl md:text-6xl" />
                        <div className="flex flex-col text-center md:text-right">
                            <h3 className="text-base md:text-2xl text-head capitalize font-semibold">
                                {city}
                            </h3>
                            <h5 className="text-sub_head text-sm md:text-base">
                                Rata-rata
                            </h5>
                            <h5 className="text-sub_head text-sm md:text-base">
                                {getAveragePriceByCity(city)}
                            </h5>
                        </div>
                    </div>
                ))}
            </div>

            {/* {uniqueCities.map((city) => (
                    <div>
                        <p className="text-md font-poppins">{city}</p>
                    </div>
                ))} */}
        </section>
    );
};

export default PropertyKota;
