import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import React from 'react';

const MengapaMemilihKami = () => {
    const why_us = [
        {
            id: 1,
            title: 'Jaringan Luas',
            description:
                'Kami memiliki akses ke berbagai pilihan properti, mulai dari rumah, apartemen, hingga properti komersial di lokasi strategis.',
        },
        {
            id: 2,
            title: 'Pendekatan Digital Terdepan',
            description:
                'Menggunakan teknologi digital terkini, kami memasarkan properti Anda kepada audiens yang tepat, menjangkau lebih banyak calon pembeli.',
        },
        {
            id: 3,
            title: 'Pelayanan Profesional',
            description:
                'Kami berkomitmen memberikan pelayanan terbaik, dari tahap pencarian hingga transaksi selesai.',
        },
        {
            id: 4,
            title: 'Transparan & Terpercaya',
            description:
                'Kepercayaan Anda adalah prioritas kami. Semua proses dilakukan dengan transparan dan jujur.',
        },
    ];
    return (
        <section className="container mx-auto py-8 mt-8">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
                Mengapa Memilih Kami?
            </h2>
            <Accordion type="single" className="w-10/12 mx-auto" collapsible>
                {why_us.map((item) => (
                    <AccordionItem value={item.id} key={item.id}>
                        <AccordionTrigger className="text-center text-xl text-head">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-lg text-sub_head">
                            {item.description}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
};

export default MengapaMemilihKami;
