import Logo1 from '../../../assets/Logo-1-removebg-preview.png';
import Nav from './Nav';
import NavMobile from './NavMobile';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const [navFixed, setNavFixed] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            return window.scrollY > 50 ? setNavFixed(true) : setNavFixed(false);
        });
    }, []);

    return (
        <header
            className={`flex items-center top-0 w-full h-20 md:h-24 z-10 transition-all duration-300 rounded-b-3xl sticky ${
                navFixed ? 'bg-white shadow-md' : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto flex items-center justify-between px-4 md:px-[4rem]">
                <Link to="/">
                    <img src={Logo1} alt="logo" className="w-28 md:w-36" />
                    {/* <span className="font-bold lg:text-xl">
                        Beryl Porperty Land
                    </span> */}
                </Link>

                <div className="hidden lg:block">
                    <Nav />
                </div>

                <div className="lg:hidden">
                    <NavMobile />
                </div>

                <div className="hidden lg:block">
                    <div className="flex space-x-4">
                        <Link
                            to="#instagram"
                            className="text-yellow-600 hover:text-yellow-700 transition-all duration-300"
                        >
                            <FaInstagram className="w-6 h-6" />
                        </Link>

                        <Link
                            to="#twitter"
                            className="text-yellow-600 hover:text-yellow-700 transition-all duration-300"
                        >
                            <FaTwitter className="w-6 h-6" />
                        </Link>

                        <Link
                            to="#facebook"
                            className="text-yellow-600 hover:text-yellow-700 transition-all duration-300"
                        >
                            <FaFacebook className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
