import { dataListProperty } from '@/data/datas';
import React from 'react';
import { useParams } from 'react-router-dom';

const DetailLayout = () => {
    const { id } = useParams();

    const data = dataListProperty.find((data) => data.id == id);
    return (
        <div>
            <div>
                DETAIL PROPERTY {id} {data.city}
            </div>
        </div>
    );
};

export default DetailLayout;
