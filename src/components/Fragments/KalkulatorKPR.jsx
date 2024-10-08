import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const KalkulatorKPR = ({ initialHargaProperti }) => {
    const id = useParams().id;
    const [hargaProperti, setHargaProperti] = useState(
        initialHargaProperti || 0
    );
    const [dpPercentage, setDpPercentage] = useState(20); // Default DP 20%
    const [bunga, setBunga] = useState(5); // Default bunga 5%
    const [jangkaWaktu, setJangkaWaktu] = useState(20); // Default jangka waktu 20 tahun
    const [angsuranList, setAngsuranList] = useState([]);

    // Fungsi untuk memformat angka menjadi format rupiah
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(angka);
    };

    // Fungsi untuk menghapus format titik dan simbol, sehingga hanya angka yang disimpan
    const removeNonNumeric = (string) => {
        return string.replace(/[^0-9]/g, '');
    };

    // Update harga properti saat props berubah
    useEffect(() => {
        setHargaProperti(initialHargaProperti);

        calculateKPR();
    }, [
        initialHargaProperti,
        id,
        dpPercentage,
        bunga,
        jangkaWaktu,
        hargaProperti,
    ]);

    const handleHargaPropertiChange = (e) => {
        const value = removeNonNumeric(e.target.value); // Menghilangkan titik atau simbol lainnya
        setHargaProperti(value); // Simpan nilai sebagai angka tanpa format
        calculateKPR();
    };

    const calculateKPR = () => {
        const dp = (dpPercentage / 100) * hargaProperti;
        const jumlahKredit = hargaProperti - dp;
        const bungaPerBulan = bunga / 100 / 12;

        const hitungAngsuran = (tahun) => {
            const bulan = tahun * 12;
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
    };

    const handleDpChange = (e) => {
        setDpPercentage(e.target.value);
        calculateKPR();
    };

    return (
        <section className="container mx-auto py-20 w-full flex flex-col md:flex-row md:justify-between">
            <div className="max-w-lg mx-auto  p-5 bg-white shadow-md rounded md:max-w-xl lg:max-w-2xl border">
                <h1 className="text-2xl font-bold mb-5 text-center">
                    Simulasi Cicilan KPR
                </h1>
                <p className="text-gray-600 text-center mb-5">
                    Gunakan kalkulator ini untuk menghitung estimasi biaya KPR
                    dari harga hunian
                </p>
                {/* <form onSubmit={calculateKPR}> */}
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Harga Properti (Rp)
                    </label>
                    <input
                        type="text"
                        value={formatRupiah(hargaProperti)}
                        onChange={handleHargaPropertiChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        placeholder="Masukkan harga properti"
                        required
                    />
                </div>
                <div className="md:flex md:space-x-4 mb-4">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <label className="block text-gray-700">
                            Down Payment (DP)
                        </label>
                        <input
                            type="text"
                            value={formatRupiah(
                                (dpPercentage / 100) * hargaProperti
                            )}
                            className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-100"
                            disabled
                        />
                    </div>
                    <div className="md:w-1/2">
                        <label className="block text-gray-700">DP (%)</label>
                        <input
                            type="number"
                            value={dpPercentage}
                            onChange={handleDpChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="DP dalam %"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Jumlah Kredit</label>
                    <input
                        type="text"
                        value={formatRupiah(
                            hargaProperti - (dpPercentage / 100) * hargaProperti
                        )}
                        className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-100"
                        disabled
                    />
                </div>
                <div className="md:flex md:space-x-4 mb-4">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <label className="block text-gray-700">
                            Jangka Waktu
                        </label>
                        <input
                            type="number"
                            value={jangkaWaktu}
                            onChange={(e) => setJangkaWaktu(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Tahun"
                            required
                        />
                    </div>
                    <div className="md:w-1/2">
                        <label className="block text-gray-700">Bunga (%)</label>
                        <input
                            type="number"
                            value={bunga}
                            onChange={(e) => setBunga(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Bunga"
                            required
                        />
                    </div>
                </div>
                <button
                    // type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded mt-3"
                    onClick={calculateKPR}
                >
                    Hitung KPR
                </button>
                {/* </form> */}
            </div>

            <div className="md:w-2/6 max-w-lg mt-5 md:mt-0 p-5 bg-white shadow-md rounded md:max-w-xl lg:max-w-xl border">
                {angsuranList.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-4">Angsuran KPR</h2>
                        <ul className="flex flex-col">
                            {angsuranList.map((item, index) => (
                                <li
                                    key={index}
                                    className={`p-2 flex justify-between ${
                                        jangkaWaktu == item.tahun
                                            ? 'bg-blue-100'
                                            : ''
                                    }`}
                                >
                                    <div>{item.tahun} tahun</div>
                                    <strong>
                                        {formatRupiah(parseInt(item.angsuran))}
                                        /bln
                                    </strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};

export default KalkulatorKPR;
