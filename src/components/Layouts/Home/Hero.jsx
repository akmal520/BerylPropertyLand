import SearchBar from '../../Fragments/SearchBar';
import Search from '@/components/Fragments/Search';
import React from 'react';

const Hero = () => {
    return (
        <section
            id="home"
            className="h-screen w-full px-4 bg-hero bg-cover bg-center overflow-hidden relative lg:rounded-[50px] rounded-3xl container mx-auto shadow-sm"
        >
            {/* <div className="absolute w-full h-full bg-black opacity-50"></div> */}
            <div className="flex flex-col justify-center items-center text-center lg:px-20 lg:text-left lg:items-start h-full lg:gap-4 gap-6">
                <h1 className="lg:w-[490px] lg:h-[146px] text-head select-none text-4xl font-semibold drop-shadow-sm lg:leading-normal lg:text-5xl">
                    Easy way to find a perfect property
                </h1>

                <h3 className="lg:mt-4 lg:w-[470px] lg:h-[72px] select-none text-sub_head lg:leading-relaxed text-lg lg:text-xl">
                    We provide a complete service for the sale, purchase or
                    rental of real estate.
                </h3>

                <div className="mt-11">
                    <SearchBar />
                </div>
            </div>
        </section>
    );
};

export default Hero;
