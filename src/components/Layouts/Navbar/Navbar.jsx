import Nav from './Nav';
import NavMobile from './NavMobile';
import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <header className="flex items-center top-0 w-full h-18 bg-white/50 text-[#110229] z-10 transition-all duration-300 ">
            <div className="container p-8 mx-auto h-full flex items-center justify-between">
                <Link to="/">
                    <span className="font-bold lg:text-xl">
                        Beryl Porperty Land
                    </span>
                </Link>

                <div className="hidden lg:block">
                    <Nav />
                </div>

                <div className="lg:hidden">
                    <NavMobile />
                </div>

                <div className="hidden lg:block">
                    <div className="flex space-x-4">
                        <Link to="#instagram">
                            <FaInstagram className="w-6 h-6" />
                        </Link>

                        <Link to="#twitter">
                            <FaTwitter className="w-6 h-6" />
                        </Link>

                        <Link to="#facebook">
                            <FaFacebook className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
