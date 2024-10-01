import Logo1 from '../../../assets/Logo-1-removebg-preview.png';
import { dataNavigation } from '@/data/datas';
import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerNav = [
        { name: 'cari properti', path: '/property' },
        { name: 'syarat & ketentuan', path: '/terms' },
        { name: 'Kebijakan Privasi', path: '/privacy' },
        { name: 'FAQ', path: '/faq' },
    ];

    return (
        <footer className="bg-gray-200 mt-20">
            <div className="container mx-auto">
                <div className="flex justify-between  text-head text-base font-medium py-14">
                    <div className="logo">
                        <img src={Logo1} alt="logo" className="w-40" />
                    </div>

                    <div>
                        <ul className="space-y-4">
                            {dataNavigation.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        className="relative capitalize before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-current before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <ul className="space-y-4">
                            {footerNav.map((item, index) => (
                                <li key={index} className="capitalize">
                                    <Link
                                        to={item.path}
                                        className="relative capitalize before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-current before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-1/4">
                        <ul className="space-y-4">
                            <li>
                                <Link to="#maps" className="flex">
                                    <MapPin className="w-10 h-10 -mt-1" />
                                    <p className="ml-3 italic">
                                        Bintara Jaya, Kec. Bekasi Bar., Kota
                                        Bks, Jawa Barat 17136
                                    </p>
                                </Link>
                            </li>

                            <li>
                                <Link to="#wa" className="flex">
                                    <Phone className="w-6 h-6 " />
                                    <p className="ml-3 italic">
                                        (021) 123-456-789
                                    </p>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="mailto:berylpropertyland@gmail"
                                    className="flex"
                                >
                                    <Mail className="w-6 h-6 " />
                                    <p className="ml-3 italic">
                                        berylpropertyland@gmail.com
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-center border-t border-gray-400 py-6">
                    <p className="text-center text-sm italic text-head">
                        ©{new Date().getFullYear()} Beryl Property Land. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
