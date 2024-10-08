import Logo1 from '../../../assets/Logo-1-removebg-preview.png';
import React from 'react';

const TentangKami = () => {
    return (
        <section className="container mx-auto py-8">
            <div className="flex flex-col justify-center gap-4">
                <div className="flex justify-center mb-4 border-b-2 pb-8">
                    <img src={Logo1} alt="Logo" className="w-28 md:w-36" />
                </div>
                <h1 className="text-center text-head font-extrabold text-2xl">
                    Beryl Property Land
                </h1>
                <div>
                    <h2 className="text-justify ">
                        PT. Beryl Property Land adalah perusahaan digital
                        marketing properti yang berdedikasi untuk membantu
                        penjual dan pembeli properti mencapai tujuan mereka
                        melalui strategi pemasaran berbasis digital. Kami
                        memanfaatkan teknologi terkini untuk menjangkau audiens
                        yang tepat, mempercepat proses jual beli properti, dan
                        memberikan hasil terbaik bagi klien kami.
                    </h2>
                </div>
                <div>
                    <h2 className="text-justify ">
                        Dengan tim profesional yang berpengalaman dalam bidang
                        properti dan pemasaran digital, kami siap mendukung
                        kebutuhan pemasaran properti Anda, baik untuk hunian,
                        komersial, maupun investasi.
                    </h2>
                </div>
            </div>
            {/* <div className='flex justify-center mt-6'> */}
            {/* <button className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
                    Hubungi Kami
                </button> */}
            {/* </div> */}
        </section>
    );
};

export default TentangKami;
