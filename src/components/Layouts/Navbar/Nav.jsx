import { dataNavigation } from '@/data/datas';
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul className="flex space-x-8 uppercase tracking-wide text-base">
                {dataNavigation.map((item, index) => (
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
