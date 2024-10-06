import Navbar from '../Navbar/Navbar';
import ImageCarousel from '@/components/Fragments/ImageCarousel';
import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailLayout = () => {
    const { id: uuid } = useParams();
    const [property, setProperty] = useState([]);
    // const [id, setId] = useState(null);
    const [imageProperties, setImageProperties] = useState([]);

    useEffect(() => {
        const fetchProperty = async () => {
            let { data, error } = await supabase
                .from('properties')
                .select()
                .eq('uuid', uuid);
            if (data) {
                setProperty(data);

                let { data: images, error: errorImages } = await supabase
                    .from('property_images')
                    .select('image_url')
                    .eq('property_id', data[0].id);
                if (images) {
                    setImageProperties(images);
                }
            } else {
                console.error(error);
            }
        };
        fetchProperty();
    }, []);

    // const propertyId = property[0].id;
    // console.log(id);

    return (
        <div>
            {property === null ? (
                <div>property not found</div>
            ) : (
                <div>
                    <Navbar />
                    <ImageCarousel images={imageProperties} />
                </div>
            )}
        </div>
    );
};

export default DetailLayout;
