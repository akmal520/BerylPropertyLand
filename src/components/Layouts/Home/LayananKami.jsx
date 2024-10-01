import { Card } from '@/components/ui/card';
// import { getLatestLayanan } from '@/hooks/CustomHook';
import { dataLayanan } from '@/data/datas';
import React, { useEffect, useState } from 'react';

const LayananKami = () => {
    const latestLayanan = dataLayanan;
    // const [fade, setFade] = useState(false); // State for fade-in effect

    // useEffect(() => {
    //     localStorage.setItem('filteredData', JSON.stringify(latestLayanan));
    //     setFade(true);
    // }, [latestLayanan]);

    return (
        <section className="container mx-auto py-8 bg-gray-400"> 
            <h1 className="text-4xl font-bold text-center py-4 text-gray-800">Layanan Kami</h1>

                <div
                    className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6 transition-opacity duration-500 mt-8`}
                >
                    {latestLayanan.map((layanan) => (
                        <Card
                            key={layanan.id}
                            className="p-6 border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
                        >
                            <h2 className="text-xl font-semibold text-head">
                                {layanan.title}
                            </h2>
                            <p className="text-sub_head mt-2">
                                {layanan.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LayananKami;
