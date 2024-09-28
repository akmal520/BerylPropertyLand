import { dataListProperty } from '@/data/datas';
import React, { useState } from 'react';
import { GiModernCity } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const PropertyKota = () => {
    // const [location, setLocation] = useState('');
    const navigate = useNavigate();
    const uniqueCities = [
        ...new Set(dataListProperty.map((item) => item.city)),
    ];

    const sliceData =
        uniqueCities.length % 2 !== 0
            ? uniqueCities.slice(0, -1)
            : uniqueCities;

    const handelClickCity = (city) => {
        localStorage.setItem(
            'dataFilter',
            JSON.stringify([
                {
                    location: city,
                    propertyType: '',
                    priceRange: '',
                },
            ])
        );

        navigate('/property', {
            state: {
                filteredData: dataListProperty.filter(
                    (item) => item.city === city
                ),
            },
        });
    };

    const formatCurrency = (number) => {
        if (number >= 1e9) {
            return `Rp ${(number / 1e9).toFixed(1)} M`; // Format miliar
        } else if (number >= 1e6) {
            return `Rp ${(number / 1e6).toFixed(1)} JT`; // Format juta
        } else if (number >= 1e3) {
            return `Rp ${(number / 1e3).toFixed(1)} K`; // Format ribu
        }
        return `Rp. ${number}`; // Jika kurang dari 1.000
    };

    const getFormattedAveragePricePerCity = (data) => {
        const cityPriceData = {};

        // Kelompokkan data berdasarkan kota dan hitung total harga serta jumlah properti
        data.forEach((property) => {
            const { city, price } = property;

            if (!cityPriceData[city]) {
                cityPriceData[city] = { totalPrice: 0, count: 0 };
            }

            cityPriceData[city].totalPrice += price;
            cityPriceData[city].count += 1;
        });

        // Hitung rata-rata dan format hasilnya
        const averagePricePerCity = {};
        for (const city in cityPriceData) {
            const { totalPrice, count } = cityPriceData[city];
            const averagePrice = totalPrice / count;
            averagePricePerCity[city] = formatCurrency(averagePrice);
        }

        return averagePricePerCity;
    };

    const formattedAveragePricePerCity =
        getFormattedAveragePricePerCity(dataListProperty);

    return (
        <section className="container mx-auto py-5">
            <h2 className="text-3xl md:text-2xl text-center md:text-left text-head capitalize font-bold py-4 ">
                Cari properti favoritmu
            </h2>

            <div className="flex flex-wrap md:flex-row justify-center md:justify-evenly items-center gap-4 mt-4">
                {sliceData.map((city, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center w-[150px] h-[150px] md:w-[500px] gap-4 justify-between border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-300"
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
                                {formattedAveragePricePerCity[city]}
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
