import avaMale from '@/assets/male.jpg';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/utils/supabase/client';
import { BathIcon, BedSingleIcon, HouseIcon, LandPlotIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { FiPhone } from 'react-icons/fi';
import { TfiFaceSad } from 'react-icons/tfi';
import { Link, useLocation } from 'react-router-dom';

const PropertyCard = (props) => {
    const { dataProperties, children } = props;
    const location = useLocation();
    const [filteredData, setFilteredData] = useState([]);

    return (
        <section className="container mx-auto">
            <div className="py-6">
                <h1 className="text-2xl md:text-3xl font-semibold mb-2 select-none text-head">
                    Property Results
                </h1>

                <span
                    className={`${
                        dataProperties.length > 0 ? '' : 'text-slate-500'
                    } capitalize select-none`}
                >
                    {dataProperties.length} properties found
                </span>

                <Separator className="mb-6 mt-2 bg-sub_head" />

                {children}
            </div>
        </section>
    );
};

const PropertyCardList = (props) => {
    const { dataProperties } = props;
    const [imageProperties, setImageProperties] = useState([]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    useEffect(() => {
        const fetchImageProperties = async () => {
            let { data, error } = await supabase
                .from('property_images')
                .select('image_url, property_id, properties (id)');

            if (data) {
                const uniqueImages = [];
                const seenPropertyIds = new Set();
                data.forEach((image) => {
                    if (!seenPropertyIds.has(image.properties.id)) {
                        uniqueImages.push(image);
                        seenPropertyIds.add(image.properties.id);
                    }
                });
                setImageProperties(uniqueImages);
            } else {
                console.error(error);
            }
        };

        fetchImageProperties();
    }, []);

    // ambil url image dari imageProperties berdasarkan id property
    const getImageUrl = (propertyId) => {
        const image = imageProperties.find(
            (image) => image.properties.id === propertyId
        );
        return image ? image.image_url : null;
    };

    return (
        <>
            {dataProperties.length > 0 ? (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-6">
                    {dataProperties.map((item) => (
                        <Card
                            className="max-w-[350px] md:max-w-[350px] hover:scale-105 hover:shadow-lg transition-all duration-300 overflow-hidden border-gray-400 group"
                            key={item.id}
                        >
                            <Link to={`/property/detail/${item.uuid}`}>
                                <CardHeader className="p-2">
                                    <img
                                        src={getImageUrl(item.id)}
                                        alt="property"
                                        className="rounded-lg aspect-[5/3] object-cover object-center"
                                    />
                                </CardHeader>
                                <CardContent className="p-2 flex flex-col">
                                    <h3 className="capitalize text-head text-2xl md:text-xl font-semibold">
                                        {item.city} - {item.property_type}
                                    </h3>

                                    <div className="flex flex-col flex-grow gap-4">
                                        <p className="text-base md:text-sm font-medium text-sub_head truncate">
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

                                        <p className="text-3xl md:text-2xl text-head font-semibold py-2">
                                            {formatCurrency(item.price)}
                                        </p>
                                    </div>
                                </CardContent>
                            </Link>
                            <CardFooter className="p-2 mt-auto">
                                <div className="flex justify-center items-center w-full gap-4">
                                    <img
                                        src={avaMale}
                                        alt="developer"
                                        className="rounded-full border border-primary w-16 h-16 "
                                    />

                                    <div className="flex flex-col w-[500px] select-none">
                                        <h4 className="capitalize text-head text-base md:text-sm font-medium">
                                            {item.developer}
                                        </h4>
                                        <Separator className="h-0.5 bg-sub_head rounded-full" />
                                        <h5 className="capitalize text-sub_head text-sm md:text-sm font-medium">
                                            {item.jabatan}
                                        </h5>
                                    </div>

                                    <div className="flex items-center w-full gap-2">
                                        <Link
                                            target="_blank"
                                            to={`https://wa.me/${item.number_phone}`}
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
                                            to={`tel:${item.number_phone}`}
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
                <p className="text-3xl font-medium text-sub_head flex gap-2 justify-center select-none">
                    No properties found <TfiFaceSad className="w-8 h-8" />
                </p>
            )}
        </>
    );
};

PropertyCard.PropertyCardList = PropertyCardList;

export default PropertyCard;
