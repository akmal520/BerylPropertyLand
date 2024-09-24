import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navigation = [
    {
        name: 'beranda',
        path: '/',
    },
    {
        name: 'bergabung dengan kami',
        path: '/join',
    },
    {
        name: 'tentang kami',
        path: '/about',
    },
    {
        name: 'hubungi kami',
        path: '/contact-us',
    },
];

const NavMobile = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="relative z-20">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer text-black"
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
                    className="cursor-pointer absolute top-6 right-6 text-black hover:text-green-600"
                >
                    <XMarkIcon className="w-8 h-8" />
                </div>

                {navigation.map((item, index) => (
                    <li
                        key={index}
                        className="mb-8 text-black hover:text-green-600 transition-all duration-100 text-center"
                    >
                        <Link
                            to={item.path}
                            className="text-xl cursor-pointer capitalize transition-all duration-100"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavMobile;
