import Footer from '../Footer';
import PropertyType from '../Home/PropertyType';
import Navbar from '../Navbar/Navbar';
import ContactDeveloper from './ContactDeveloper';
import PropertyDetail from './PropertyDetail';
import ImageCarousel from '@/components/Fragments/ImageCarousel';
import KalkulatorKPR from '@/components/Fragments/KalkulatorKPR';
import { supabase } from '@/utils/supabase/client';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const DetailLayout = () => {
    const { id: uuid } = useParams();
    const [property, setProperty] = useState([]);
    // const [id, setId] = useState(null);
    const [imageProperties, setImageProperties] = useState([]);
    const [isPropertyExist, setIsPropertyExist] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const fetchProperty = async () => {
            let { data, error } = await supabase
                .from('properties')
                .select()
                .eq('uuid', uuid);
            if (data) {
                setProperty(data[0]);
                setIsPropertyExist(true);

                let { data: images, error: errorImages } = await supabase
                    .from('property_images')
                    .select('image_url')
                    .eq('property_id', data[0].id);
                if (images) {
                    setImageProperties(images);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            } else {
                setIsPropertyExist(false);
                setLoading(false);
                console.error(error);
            }
        };
        fetchProperty();
    }, [uuid]);

    // const propertyId = property[0].id;
    // console.log(id);

    return (
        <div>
            {loading ? (
                <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
                    <LoaderCircle className="w-24 h-24 animate-spin" />
                    <p className="text-xl">Loading . . .</p>
                </div>
            ) : (
                <div>
                    {!isPropertyExist ? (
                        <div>property not found</div>
                    ) : (
                        <div className="relative">
                            <Navbar />
                            <ImageCarousel images={imageProperties} />
                            <PropertyDetail property={property} />
                            <KalkulatorKPR
                                initialHargaProperti={property.price}
                            />
                            <PropertyType />
                            <div className="mx-auto mt-6 text-center">
                                <Link
                                    className="border border-green-600 px-4 py-2 rounded-lg text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200"
                                    to="/property"
                                >
                                    Lihat semua properti
                                </Link>
                            </div>
                            <Footer />
                            <ContactDeveloper data={property} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DetailLayout;
