import Navbar from '../Navbar/Navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailLayout = () => {
    const [filteredData, setFilteredData] = useState([]);
    const { id } = useParams();

    const data = filteredData.find((data) => data.uuid == id);

    useEffect(() => {
        // Cek apakah data ada di location.state
        if (location.state && location.state.filteredData) {
            setFilteredData(location.state.filteredData);
        } else {
            // Ambil data dari localStorage jika tidak ada di state
            const storedData = localStorage.getItem('filteredData');
            if (storedData) {
                setFilteredData(JSON.parse(storedData));
            }
        }
    }, [location.state]);

    return (
        <div>
            {!data ? (
                <div>data not found</div>
            ) : (
                <div>
                    <Navbar />
                    <div>
                        DETAIL PROPERTY {data.id} {data.city}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailLayout;
