import React, { useState } from 'react';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BergabungDenganKami = () => {
    const [activeContent, setActiveContent] = useState('marketing'); 

    const handleClick = (content) => {
        setActiveContent(content);
    };

    return (
        <section className='container mx-auto p-4'>
            <div className='bg-gray-200 p-6 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold mb-10 text-center '>Bergabung Dengan Kami</h2>
                <div className='flex justify-center space-x-4 mb-4'>
                    <button 
                        onClick={() => handleClick('member')} 
                        className='bg-gray-300 text-center font-bold p-2 rounded-lg'
                    >
                        Sebagai Member Broker
                    </button>
                    <button 
                        onClick={() => handleClick('marketing')} 
                        className='bg-gray-300 text-center font-bold p-2 rounded-lg'
                    >
                        Sebagai Marketing Associate
                    </button>
                </div>
                {activeContent === 'member' && (
                    <div>
                        <ul>
                        Beryl Property Land membuka peluang bagi perongan dan perusahaan untuk bergabung sebagai Member Broker adalah pemilik kantor atau professional yang membuka kantor dan menekuni bisnis pemasaran properti di tanah air. Dilengkapi dengan perangkat operasional, Member Broker diarahkan untuk mampu menjadi usahawan yang mandiri dalam mengelola dan mengembangkan bisnis jasa pemasaran properti seperti Jual, Beli dan Sewa. "Blueprint for Success", sebuah program training khas Beryl Property Land yang melatih Member Broker tentang bagaimana menjalankan usahanya dengan sukses. Materi yang diberikan dalam pelatihan ini adalah dasar - dasar yang diperlukan untuk memulai bisnis pemasaran properti antara lain Perencanaan Budget, Analisa Pasar, Mengelola Keuangan, Mengarahkan dan Motivasi Marketing Associates. Produk dan Servis Beryl Property Land merupakan fasilitas pendukung di luar pelatihan yang didapatkan Member Broker dalam mempercepat dan merpermudah proses jual, beli, dan sewa properti. Member Broker harus dapat merekrut para professional dengan jiwa Enterpreneur yang dikenal dengan sebutan Marketing Associate yang berperan sebagai ujung tombak pemasaran menghadapi para penjual dan pembeli. Marketing Associate merupakan asset profesional Member Broker.
                        </ul>
                    </div>
                )}
                {activeContent === 'marketing' && (
                    <div>
                        <ul>
                        Beryl Prperty Land mempersiapkan dan mendukung semua Marketing Associate hingga siap secara independen untuk beroperasi di lapangan. "Sales System Training" yang diberikan oleh ERA Indonesia mengupayakan pengembangan potensi profesional Marketing Associate. Training ini meliputi cara dan teknik-teknik yang rinci dalam melakukan proses jual-beli properti serta tindakan lanjutan-nya. Seluruh produk dan servis Beryl Property Land memberikan peluang bagi para Marketing Associate dalam meperlancar pekerjaan sebagai agen properti. Beryl Property Land membuka peluang bagi Marketing Asociate untuk meraih tingkat penghasilan yang tidak terbatas.
                        </ul>
                    </div>
                )}
                <div className='mt-4'>
                    <h2 className='text-xl font-bold text-center mt-10'>Kontak Penghubung</h2>
                    <div className='flex justify-center space-x-4 mt-2'>
                        <Link
                            to="#whatsapp"
                            aria-label="Whatsapp"
                            className="flex items-center space-x-2 font-bold text-green-600"
                        >
                            <FaWhatsapp className="text-2xl" />
                            <span>WhatsApp</span>
                        </Link>
                        <Link
                            to="#telpon"
                            aria-label="Telpon"
                            className="flex items-center space-x-2 font-bold text-blue-600"
                        >
                            <FaPhone className="text-2xl" />
                            <span>Telepon</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BergabungDenganKami;
