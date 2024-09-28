import propertyList1 from '../../../assets/propertyList1.jpg';
import propertyList2 from '../../../assets/propertyList2.jpg';
import propertyList3 from '../../../assets/propertyList3.jpg';
import Details from './Details';
import { dataListProperty } from '@/data/datas';
import { formatCurrency, getLatestProperty } from '@/hooks/CustomHook';
import { BathIcon, BedSingleIcon, HouseIcon, LandPlotIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PropertyType = () => {
    const latestProperty = getLatestProperty(dataListProperty);

    useEffect(() => {
        localStorage.setItem('filteredData', JSON.stringify(latestProperty));
    }, [latestProperty]);

    // const properties = [
    //     {
    //         id: 1,
    //         city: 'Jakarta',
    //         title: 'Apartemen di Jakarta',
    //         price: 'Rp 1.500.000.000',
    //         image: propertyList1,
    //     },
    //     {
    //         id: 2,
    //         city: 'Bandung',
    //         title: 'Villa di Bandung',
    //         price: 'Rp 2.000.000.000',
    //         image: propertyList2,
    //     },
    //     {
    //         id: 3,
    //         city: 'Bali',
    //         title: 'Rumah di Bali',
    //         price: 'Rp 3.500.000.000',
    //         image: propertyList3,
    //     },
    // ];

    return (
        <section className="container mx-auto py-5">
            <h2 className="text-3xl md:text-2xl font-bold text-head text-center md:text-left py-2 capitalize">
                Cari properti ideal di kota impian Anda
            </h2>
            <div className="flex flex-col items-center md:justify-between md:flex-row gap-8 md:gap-6 mt-4">
                {latestProperty.map((property) => (
                    <Link
                        to={`/property/detail/${property.uuid}`}
                        key={property.id}
                    >
                        <div
                            key={property.id}
                            className="border rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 w-[320px] md:w-[250px]"
                        >
                            <img
                                src={property.imgProperty}
                                alt={property.city}
                                className="aspect-[4/3] object-cover"
                            />
                            <div className="p-2 flex flex-col gap-4">
                                <h3 className="font-semibold text-2xl md:text-lg capitalize text-head">
                                    {property.propertyType} - {property.city}
                                </h3>
                                <p className="text-sub_head capitalize text-lg md:text-sm -mt-4">
                                    {property.address}
                                </p>
                                <div className="flex items-center gap-4 text-sub_head">
                                    <span className="flex items-center text-base md:text-sm">
                                        <LandPlotIcon className="w-6 h-6 md:w-5 md:h-5 inline mr-0.5" />
                                        {property.lt}m<sup>2</sup>
                                    </span>
                                    <span className="flex items-center text-base md:text-sm">
                                        <HouseIcon className="w-6 h-6 md:w-5 md:h-5 inline mr-0.5" />
                                        {property.lb}m<sup>2</sup>
                                    </span>
                                    <span className="flex items-center text-base md:text-sm">
                                        <BedSingleIcon className="w-6 h-6 md:w-5 md:h-5 inline mr-0.5" />
                                        {property.bedroom}
                                    </span>
                                    <span className="flex items-center text-base md:text-sm">
                                        <BathIcon className="w-6 h-6 md:w-5 md:h-5 inline mr-0.5" />
                                        {property.bathroom}
                                    </span>
                                </div>
                                <p className="text-green-600 font-bold text-2xl md:text-lg">
                                    {formatCurrency(property.price)}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default PropertyType;
