import Logo1 from '../../../assets/Logo-1-removebg-preview.png';
import { Separator } from '@/components/ui/separator';
import { dataNavigation } from '@/data/datas';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerNav = [
        { name: 'cari properti', path: '/property' },
        { name: 'syarat & ketentuan', path: '/terms' },
        { name: 'Kebijakan Privasi', path: '/privacy' },
        { name: 'FAQ', path: '/faq' },
    ];

    return (
        <footer id="footer" className="bg-gray-200 mt-20">
            <div className="container mx-auto">
                <div className="flex flex-col justify-center items-center md:items-start gap-12 md:flex-row md:gap-0 md:justify-between  text-head text-base font-medium py-14">
                    <div className="logo flex justify-center md:block ">
                        <img src={Logo1} alt="logo" className="w-40" />
                    </div>

                    <div className="flex justify-center items-center gap-6 md:gap-20 md:justify-between">
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
                    </div>

                    <div className="md:w-1/4 border-t border-gray-300 py-6 md:py-0 md:border-0 ">
                        <ul className="space-y-6 md:space-y-4">
                            <li>
                                <Link
                                    to="#maps"
                                    className="flex flex-col items-center text-center gap-2 md:items-start md:text-left md:gap-0 md:flex-row"
                                >
                                    <MapPin className="w-6 h-6 md:w-11 md:h-11  -mt-1" />
                                    <p className="ml-3 italic">
                                        Bintara Jaya, Kec. Bekasi Bar., Kota
                                        Bks, Jawa Barat 17136
                                    </p>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="#wa"
                                    className="flex flex-col items-center text-center gap-2 md:items-start md:text-left md:gap-0 md:flex-row"
                                >
                                    <Phone className="w-6 h-6 " />
                                    <p className="ml-3 italic">
                                        (021) 123-456-789
                                    </p>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="mailto:berylpropertyland@gmail"
                                    className="flex flex-col items-center text-center gap-2 md:items-start md:text-left md:gap-0 md:flex-row"
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
