import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const MengapaMemilihKami = () => {
    return (
        <section className="container mx-auto py-8 bg-gray-400">
            <h2 className="text-center text-2xl font-bold mb-4">Mengapa Memilih Kami?</h2>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-center">Jaringan Luas</AccordionTrigger>
                    <AccordionContent>
                    Kami memiliki akses ke berbagai pilihan properti, mulai dari rumah, apartemen, hingga properti komersial di lokasi strategis.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-center">Pendekatan Digital Terdepan</AccordionTrigger>
                    <AccordionContent>
                    Menggunakan teknologi digital terkini, kami memasarkan properti Anda kepada audiens yang tepat, menjangkau lebih banyak calon pembeli.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-center">Pelayanan Profesional</AccordionTrigger>
                    <AccordionContent>
                    Kami berkomitmen memberikan pelayanan terbaik, dari tahap pencarian hingga transaksi selesai.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-center">Transparan & Terpercaya</AccordionTrigger>
                    <AccordionContent>
                    Kepercayaan Anda adalah prioritas kami. Semua proses dilakukan dengan transparan dan jujur.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
};

export default MengapaMemilihKami;
