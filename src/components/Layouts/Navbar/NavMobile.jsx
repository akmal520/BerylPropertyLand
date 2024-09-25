import { dataNavigation } from '@/data/datas';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const NavMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    // disable body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);
    return (
        <nav className="relative z-20">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer text-black hover:text-yellow-700"
            >
                <Bars3Icon className="w-8 h-8" />
            </div>

            <div
                className={`${
                    isOpen ? 'right-0' : '-right-full'
                } h-full w-[70%] bg-white fixed top-0 transition-all duration-300 shadow-md`}
            ></div>

            <ul
                className={`${
                    isOpen ? 'right-0' : '-right-full'
                } fixed top-0 bottom-0 w-[70%] flex flex-col justify-center items-center transition-all duration-300`}
            >
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer absolute top-6 right-6 text-black hover:text-yellow-700"
                >
                    <XMarkIcon className="w-8 h-8" />
                </div>

                {dataNavigation.map((item, index) => (
                    <li
                        key={index}
                        className="mb-8 text-black hover:text-yellow-700 transition-all duration-100 text-center"
                    >
                        <Link
                            to={item.path}
                            className="text-xl cursor-pointer capitalize transition-all duration-100"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
                <div className="flex space-x-4">
                    <Link
                        to="#instagram"
                        className="hover:text-yellow-700 transition-all duration-300"
                    >
                        <FaInstagram className="w-6 h-6" />
                    </Link>

                    <Link
                        to="#twitter"
                        className="hover:text-yellow-700 transition-all duration-300"
                    >
                        <FaTwitter className="w-6 h-6" />
                    </Link>

                    <Link
                        to="#facebook"
                        className="hover:text-yellow-700 transition-all duration-300"
                    >
                        <FaFacebook className="w-6 h-6" />
                    </Link>
                </div>
            </ul>
        </nav>
    );
};

export default NavMobile;
