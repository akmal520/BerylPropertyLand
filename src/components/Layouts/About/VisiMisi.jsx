import { Dot } from 'lucide-react';
import React from 'react';

const VisiMisi = () => {
    return (
        <section className="bg-gray-100">
            <div className="container mx-auto py-10">
                <div className="text-center mb-8">
                    <h2 className="font-bold text-start text-3xl md:text-4xl mb-4">
                        Visi
                    </h2>
                    <p className="text-base text-justify md:text-start ">
                        Menjadi perusahaan digital marketing properti terdepan
                        yang memberikan solusi inovatif dan terpercaya dalam
                        membantu masyarakat menemukan dan memasarkan properti
                        dengan cara yang efisien, modern, dan berbasis
                        teknologi.
                    </p>
                </div>
                <div className="">
                    <h2 className="font-bold text-start text-3xl md:text-4xl mb-4">
                        Misi
                    </h2>
                    <table>
                        <tbody className="align-top">
                            <tr>
                                <td>
                                    <Dot className="w-9 h-9 -mt-1.5" />
                                </td>
                                <td className="text-base text-justify md:text-start">
                                    Menyediakan layanan pemasaran properti yang
                                    profesional dan berbasis data untuk
                                    memastikan kepuasan pelanggan.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Dot className="w-9 h-9 -mt-1.5" />
                                </td>
                                <td className="text-base text-justify md:text-start">
                                    Menggunakan platform digital dan teknologi
                                    terkini untuk menjangkau pasar yang lebih
                                    luas dan efektif.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Dot className="w-9 h-9 -mt-1.5" />
                                </td>
                                <td className="text-base text-justify md:text-start">
                                    Menjalin hubungan yang kuat dan transparan
                                    dengan klien, mengedepankan integritas dan
                                    kejujuran.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Dot className="w-9 h-9 -mt-1.5" />
                                </td>
                                <td className="text-base text-justify md:text-start">
                                    Memahami kebutuhan dan preferensi klien
                                    untuk memberikan solusi properti yang
                                    sesuai.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <ul className="list-disc list-inside text-base text-justify md:text-start">
                        <li>
                            Menyediakan layanan pemasaran properti yang
                            profesional dan berbasis data untuk memastikan
                            kepuasan pelanggan.
                        </li>
                        <li>
                            Menggunakan platform digital dan teknologi terkini
                            untuk menjangkau pasar yang lebih luas dan efektif.
                        </li>
                        <li>
                            Menjalin hubungan yang kuat dan transparan dengan
                            klien, mengedepankan integritas dan kejujuran.
                        </li>
                        <li>
                            Memahami kebutuhan dan preferensi klien untuk
                            memberikan solusi properti yang sesuai.
                        </li>
                    </ul> */}
                </div>
            </div>
        </section>
    );
};

export default VisiMisi;
