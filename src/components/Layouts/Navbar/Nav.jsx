import React from 'react';
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

const Nav = () => {
    return (
        <nav>
            <ul className="flex space-x-8 uppercase tracking-wide text-base">
                {navigation.map((item, index) => (
                    <li
                        key={index}
                        className="text-yellow-600 hover:text-yellow-700 cursor-pointer"
                    >
                        <Link
                            to={item.path}
                            className="font-medium transition-all duration-300"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
