import Apartment from '../../../assets/apartment.jpg';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BathIcon, BedSingleIcon, HouseIcon, LandPlotIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { FiPhone } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const PropertyCard = () => {
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

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <section className="container mx-auto">
            <div className="py-6">
                <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                    Property Results
                </h1>

                <span>{filteredData.length} properties found</span>

                <Separator className="mb-6 mt-2" />

                {filteredData.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-6 md:gap-6">
                        {filteredData.map((item) => (
                            <Card
                                className="max-w-[350px] md:max-w-[350px] hover:scale-105 hover:shadow-lg transition-all duration-300 overflow-hidden"
                                key={item.id}
                            >
                                <CardHeader className="p-2">
                                    <img
                                        src={Apartment}
                                        alt="Apart"
                                        className="rounded-lg"
                                    />
                                </CardHeader>
                                <CardContent className="p-2 flex flex-col">
                                    <h3 className="capitalize text-head text-2xl md:text-xl font-semibold">
                                        {item.city} - {item.propertyType}
                                    </h3>

                                    <div className="flex flex-col gap-4">
                                        <p className="text-base md:text-sm font-medium text-sub_head">
                                            {item.address}
                                        </p>

                                        <div className="flex items-center gap-4 ">
                                            <span className="flex items-center text-base md:text-sm">
                                                <LandPlotIcon className="w-6 h-6 md:w-5 md:h-5 inline mr-0.5" />
                                                {item.lt}m<sup>2</sup>
                                            </span>
                                            <span className="flex items-center text-base md:text-sm">
                                                <HouseIcon className="w-6 h-6 md:w-5 md:h-5 inline mr-0.5" />
                                                {item.lb}m<sup>2</sup>
                                            </span>
                                            <span className="flex items-center text-base md:text-sm">
                                                <BedSingleIcon className="w-6 h-6 md:w-5 md:h-5 inline mr-0.5" />
                                                {item.bedroom}
                                            </span>
                                            <span className="flex items-center text-base md:text-sm">
                                                <BathIcon className="w-6 h-6 md:w-5 md:h-5 inline mr-0.5" />
                                                {item.bathroom}
                                            </span>
                                        </div>

                                        <p className="text-3xl md:text-2xl text-head font-semibold">
                                            {formatCurrency(item.price)}
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-2 mb-4">
                                    <div className="flex justify-center items-center w-full gap-4">
                                        <img
                                            src={item.img}
                                            alt="developer"
                                            className="rounded-full border border-primary w-16 h-16 "
                                        />

                                        <div className="flex flex-col  w-[500px]">
                                            <h4 className="capitalize text-head text-lg md:text-base font-medium">
                                                {item.developer}
                                            </h4>
                                            <Separator className="h-0.5 bg-sub_head rounded-full" />
                                            <h5 className="capitalize text-sub_head text-sm md:text-sm font-medium">
                                                {item.bachelor_degree}
                                            </h5>
                                        </div>

                                        <div className="flex items-center w-full gap-2">
                                            <Link
                                                target="_blank"
                                                to={`https://wa.me/${item.number}`}
                                            >
                                                <div className="p-2 border-2 border-primary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-green-700 hover:text-white hover:border-green-700">
                                                    {/* <FaWhatsapp className="w-5 h-5 inline mr-0.5" /> */}
                                                    <FaWhatsapp className="w-5 h-5" />
                                                    {/* <span className="text-xs">
                                                        WhatsApp
                                                    </span> */}
                                                </div>
                                            </Link>

                                            <Link
                                                target="_blank"
                                                to={`https://wa.me/${item.number}`}
                                            >
                                                <div className="p-2 border-2 border-primary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-800 hover:text-white hover:border-blue-800">
                                                    {/* <FiPhone className="w-5 h-5 inline mr-1.5" /> */}
                                                    <FiPhone className="w-5 h-5" />
                                                    {/* <span className="text-xs">
                                                        Phone
                                                    </span> */}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p>No properties found</p>
                )}
            </div>

            {/* <h1 className="text-2xl font-semibold mb-4">Property Results</h1> */}
            {/* {filteredData.length > 0 ? (
                <ul className="space-y-2">
                    {filteredData.map((item) => (
                        <li
                            key={item.id}
                            className="border p-4 rounded-lg shadow-sm"
                        >
                            <p>City: {item.city}</p>
                            <p>Property Type: {item.propertyType}</p>
                            <p>Sell Type: {item.sellType}</p>
                            <p>Bedroom: {item.bedroom}</p>
                            <p>Bathroom: {item.bathroom}</p>
                            <p>
                                LT: {item.lt} m<sup>2</sup>
                            </p>
                            <p>
                                LB: {item.lb} m<sup>2</sup>
                            </p>
                            <p>Price: ${item.price.toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No properties found</p>
            )} */}
        </section>
    );
};

export default PropertyCard;
