import { formatPrice } from '@/hooks/CustomHook';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ContactDeveloper = ({ data }) => {
    const [angsuranList, setAngsuranList] = useState([]);
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const dp = (20 / 100) * data.price;
        const jumlahKredit = data.price - dp;
        const bungaPerBulan = 5 / 100 / 12;

        const hitungAngsuran = () => {
            const bulan = 20 * 12;
            const x = Math.pow(1 + bungaPerBulan, bulan);
            const angsuran = (jumlahKredit * bungaPerBulan * x) / (x - 1);

            return angsuran;
        };

        const jangkaList = [5, 10, 15, 20, 25, 30];
        const hasilAngsuran = jangkaList.map((tahun) => ({
            tahun,
            angsuran: hitungAngsuran(tahun).toFixed(2),
        }));

        setAngsuranList(hasilAngsuran);
    }, [data]);

    useEffect(() => {
        // jika sudah sampai bawah
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight
            ) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getAngsuranByTahun = (tahun) => {
        if (angsuranList && angsuranList.length > 0) {
            const angsuran = angsuranList.find((item) => item.tahun === tahun);
            return angsuran.angsuran;
        }
    };

    return (
        <section
            className={`w-full bg-white py-6 bottom-0 left-0 transition-all duration-300 ${
                sticky
                    ? 'relative'
                    : 'sticky shadow-[0_0_25px_0_rgba(0,0,0,0.3)] rounded-t-3xl'
            }`}
        >
            <div className="px-4 md:px-16 mx-auto">
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className=" flex-row justify-between items-center gap-32 hidden md:flex">
                        <div className="">
                            <h1 className="text-xl text-head font-semibold capitalize">
                                {data.title}
                            </h1>
                            <p className="text-sub_head text-sm mt-2 flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {data.address}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                                <MdVerified className="text-green-600 mr-1" />
                                <p className="text-sub_head text-base capitalize">
                                    cicilan mulai dari
                                </p>
                            </div>
                            <p className="text-green-600 text-2xl font-bold">
                                {formatPrice(getAngsuranByTahun(20))}
                                <span className="text-sm text-sub_head font-medium ml-0.5">
                                    /bulan
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between md:justify-center items-center gap-3 md:gap-4 ">
                        <div className="md:text-right ">
                            <h3 className="text-sub_head text-xs md:text-sm font-medium capitalize">
                                hubungi kami sekarang
                            </h3>
                            <h3 className="text-sub_head text-xs md:text-sm font-medium capitalize">
                                dapatkan penawaran yang menarik!
                            </h3>
                        </div>
                        <div>
                            <Link to={`https://wa.me/${data.number_phone}`}>
                                <button className="bg-green-600 text-white rounded-xl px-4 py-3 text-sm md:text-lg flex items-center gap-2 capitalize hover:bg-green-700 transition-all duration-300">
                                    <FaWhatsapp className="w-4 h-4 md:w-6 md:h-6" />
                                    WhatsApp
                                    <span className="hidden md:inline">
                                        {' '}
                                        now
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactDeveloper;
