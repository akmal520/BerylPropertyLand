import React, { useEffect, useState } from 'react';
// import { getLatestLayanan } from '@/hooks/CustomHook';
import { dataLayanan } from '@/data/datas';
import { Card } from '@/components/ui/card';

const LayananKami = () => {
    const latestLayanan = dataLayanan;
    const [fade, setFade] = useState(false); // State for fade-in effect

    useEffect(() => {
        localStorage.setItem('filteredData', JSON.stringify(latestLayanan));
        setFade(true);
    }, [latestLayanan]);

    return (
        <section className="container mx-auto py-8 bg-gray-400"> 
            <h1 className="text-4xl font-bold text-center py-4 text-gray-800">Layanan Kami</h1>

            <div className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6 transition-opacity duration-500 ${fade ? 'fade-in' : 'opacity-0'}`}>
                {latestLayanan.map((layanan) => (
                    <Card key={layanan.id} className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                        <h2 className="text-xl font-semibold text-gray-700">{layanan.title}</h2>
                        <p className="text-gray-600 mt-2">{layanan.description}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default LayananKami;
