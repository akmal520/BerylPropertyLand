import Logo1 from '../../../assets/Logo-1-removebg-preview.png';
import React from 'react';
import {
    FaInstagram,
    FaTwitter,
    FaFacebook,
    FaLinkedin,
    FaWhatsapp,
    FaEnvelope,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HubungiKami = () => {
    return (
        <section className="mx-auto container">
            <div className="flex justify-center mb-4">
                <img src={Logo1} alt="Logo" className="w-28 md:w-36 mt-10" />
            </div>
            <h2 className="text-center justify-between">
                Apakah Anda ingin menjual, membeli, atau mencari informasi lebih
                lanjut mengenai properti? Kami siap membantu Anda dengan solusi
                terbaik. Hubungi kami melalui:
            </h2>
            <div className="p-10">
                {/* <div className="border-b-4 mb-5 w-1/5" /> */}
                <h2 className="text-start font-normal mb-2">Media Sosial</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 justify-center mb-4 gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-flow-4 gap-4">
                        <Link
                            to="#instagram"
                            aria-label="Instagram"
                            className="flex items-center space-x-2 font-bold"
                        >
                            <FaInstagram className="text-2xl" />
                            <span>Instagram</span>
                        </Link>
                        <Link
                            to="#twitter"
                            aria-label="Twitter"
                            className="flex items-center space-x-2 font-bold"
                        >
                            <FaTwitter className="text-2xl" />
                            <span>Twitter</span>
                        </Link>
                        <Link
                            to="#facebook"
                            aria-label="Facebook"
                            className="flex items-center space-x-2 font-bold"
                        >
                            <FaFacebook className="text-2xl" />
                            <span>Facebook</span>
                        </Link>
                        <Link
                            to="#linkedln"
                            aria-label="Linkedin"
                            className="flex items-center space-x-2 font-bold"
                        >
                            <FaLinkedin className="text-2xl" />
                            <span>Linkedin</span>
                        </Link>
                        {/* <div className="border-b-4 mt-5 w-1/5" /> */}
                    </div>
                    <div>
                        <h2 className="text-start font-bold text-2xl">
                            Beryl Property Land
                        </h2>
                        <p className="text-start mt-4">
                            Alamat Kantor: [Alamat Lengkap Kantor Anda]
                        </p>

                        <div className="flex flex-col gap-4 mt-1">
                            <Link
                                to="#whatsApp"
                                aria-label="WhatsApp"
                                className="flex items-center space-x-2"
                            >
                                <FaWhatsapp className="text-2xl" />
                                <span>[Masukan Nomor Anda]</span>
                            </Link>
                            <Link
                                to="mailto:berylpropertyland.gmail.com"
                                aria-label="Email"
                                className="flex items-center space-x-2"
                            >
                                <FaEnvelope className="text-2xl" />
                                <span>[Masukan Email Anda]</span>
                            </Link>
                        </div>
                        <p className="text-start mt-4">
                            Jam Operasional: Senin - Jumat, 09.00 - 17.00 WIB
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HubungiKami;
