import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import React from 'react';

const FAQ = () => {
    const Faq = [
        {
            id: 1,
            title: 'Daerah mana saja yang sudah di-cover oleh Salva Property?',
            description:
                'Kota Jakarta, Bandung',
        },
        {
            id: 2,
            title: 'Jenis Perumahan apa saja yang dipersiapkan?',
            description:
                'Rumah, Apartemen',
        },
        {
            id: 3,
            title: 'Sistem pembelian apa sajakah yang di layani?',
            description:
                'Cash, Kredit',
        },
        {
            id: 4,
            title: 'Luas tanah dan bangunan yang dipersiapkan?',
            description:
                '[]',
        },
        {
            id: 5,
            title: 'Status Sertifikat Bagaimana?',
            description:
                '[]',
        },
        {
            id: 6,
            title: 'Fasilitas apa saja yang ada pada perumahan Salva?',
            description:
                '[]',
        },
        {
            id: 7,
            title: 'Berapa lama waktu pengajuan?',
            description:
                '[]',
        },
    ];

    return (
        <section className="container w-full mx-auto py-8 mt-8">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
                FAQ (Frequently Asked Questions)
            </h2>
            <Accordion type="single" className="w-10/12 mx-auto" collapsible>
                {Faq.map((item) => (
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

export default FAQ;
