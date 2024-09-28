import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    dataListProperty,
    dataRooms,
    dataRangesPrice as ranges,
} from '@/data/datas';
import { Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PropertySearch = () => {
    // const [searchBar, setSearchBar] = useState('');
    // const [selectPriceRange, setSelectPriceRange] = useState('');
    const [selectPropertyType, setSelectPropertyType] = useState('');
    const [selectLocation, setSelectLocation] = useState('');
    // const [selectRooms, setSelectRooms] = useState({
    //     bedroom: null,
    //     bathroom: null,
    // });
    const [selectBedRooms, setSelectBedRooms] = useState(null);
    const [selectBathRooms, setSelectBathRooms] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();

    // ambil data local storage dataFilter lalu masukin ke state selectLocation

    const dataFilter = JSON.parse(localStorage.getItem('dataFilter')) || [];
    useEffect(() => {
        if (dataFilter.length > 0) {
            const {
                location = '',
                propertyType = '',
                priceRange = '',
            } = dataFilter[0];

            setSelectLocation(location);
            setSelectPropertyType(propertyType);

            if (priceRange) {
                const [minPrice, maxPrice] = priceRange
                    .split('-')
                    .map((price) => parseInt(price.replace(/\D/g, ''), 10));

                setMinPrice(minPrice ? minPrice.toString() : '');
                setMaxPrice(maxPrice.toString());
            }
        }
    }, []);

    useEffect(() => {
        const newFilteredData = dataListProperty.filter((data) => {
            // const searchMatch =
            //     searchBar === '' ||
            //     data.includes(searchBar.toLocaleLowerCase());

            const locationMatch =
                selectLocation === '' ||
                data.city === selectLocation ||
                data.city.includes(selectLocation);

            const propertyTypeMatch =
                selectPropertyType === '' ||
                data.propertyType === selectPropertyType;

            const bedRoomsMatch =
                selectBedRooms === null ||
                (selectBedRooms === 5
                    ? data.bedroom >= 5
                    : data.bedroom === selectBedRooms);

            const bathRoomsMatch =
                selectBathRooms === null ||
                (selectBathRooms === 5
                    ? data.bathroom >= 5
                    : data.bathroom === selectBathRooms);

            const minPriceMatch =
                minPrice === '' || data.price >= parseCurrency(minPrice);

            const maxPriceMatch =
                maxPrice === '' || data.price <= parseCurrency(maxPrice);

            const priceMatch = minPriceMatch && maxPriceMatch;
            return (
                propertyTypeMatch &&
                bathRoomsMatch &&
                bedRoomsMatch &&
                priceMatch &&
                locationMatch
            );
        });

        setFilteredData(newFilteredData);
    }, [
        selectPropertyType,
        selectBedRooms,
        selectBathRooms,
        minPrice,
        maxPrice,
        selectLocation,
    ]);

    useEffect(() => {
        localStorage.setItem('filteredData', JSON.stringify(filteredData));
        navigate('/property', { state: { filteredData } });
    }, [filteredData]);

    const formatCurrency = (value) => {
        if (!value) return '';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const parseCurrency = (str) => {
        return str.replace(/\D/g, '');
    };

    const handleInputSearchBar = (e) => {
        const searcTerm = e.target.value.toLocaleLowerCase();
        if (searcTerm.length > 0) {
            setSelectLocation(searcTerm);

            // buat set localStorage dataFilter value location jadi kosong
            dataFilter[0].location = '';
            localStorage.setItem('dataFilter', JSON.stringify(dataFilter));
        } else {
            setSelectLocation('');
        }
    };

    const handleRangeClick = (range) => {
        if (minPrice === range.min && maxPrice === range.max) {
            setMinPrice('');
            setMaxPrice('');
            return;
        }
        setMinPrice(range.min ? range.min : '');
        setMaxPrice(range.max ? range.max : '');
    };

    const handleMinChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const uniquePropertyTypes = [
        ...new Set(dataListProperty.map((item) => item.propertyType)),
    ];
    const handlePropertyTypeChange = (type) => {
        if (selectPropertyType === type) {
            setSelectPropertyType('');
            return;
        }
        setSelectPropertyType(type);
    };

    // const handleRoomsChange = (key, value) => {
    //     console.log(key, value);
    //     if (selectRooms[key] === value) {
    //         setSelectRooms((prev) => ({ ...prev, [key]: null }));
    //         return;
    //     }
    //     setSelectRooms((prev) => ({ ...prev, [key]: value }));
    // };

    const handleBedRoomsChange = (value) => {
        if (selectBedRooms === value) {
            setSelectBedRooms(null);
            return;
        }
        setSelectBedRooms(value);
    };

    const handleBathRoomsChange = (value) => {
        if (selectBathRooms === value) {
            setSelectBathRooms(null);
            return;
        }
        setSelectBathRooms(value);
    };

    const handleClearFilter = () => {
        setSelectPropertyType('');
        // setSelectRooms({ bedroom: null, bathroom: null });
        setSelectBedRooms(null);
        setSelectBathRooms(null);
        setMinPrice('');
        setMaxPrice('');
    };

    return (
        <section className="mt-10 w-full md:h-auto py-10 bg-gray-200">
            <div className="flex flex-col justify-center items-center gap-6">
                <h1 className="text-3xl drop-shadow-lg md:text-4xl font-semibold capitalize text-head text-center w-2/3 md:w-1/3">
                    Find <span className="text-green-500">your</span> dream{' '}
                    <span className="text-green-500">property</span>
                </h1>
                <div className="flex justify-center items-center gap-2">
                    <div className="relative md:w-[450px]">
                        <Input
                            type="text"
                            placeholder="Search city . . ."
                            className="w-full h-12 focus-visible:!ring-0 focus-visible:!ring-offset-0 focus:!border-0"
                            onChange={handleInputSearchBar}
                        />

                        <Button
                            variant="default"
                            size="icon"
                            className="absolute bg-transparent w-12 h-12 rounded-full top-0 right-0 text-gray-400 hover:bg-transparent hover:text-gray-600"
                        >
                            <Search size={26} />
                        </Button>
                    </div>
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="py-[1.45rem] flex gap-2"
                                >
                                    <span>Filter</span>
                                    <Filter size={20} />
                                </Button>
                            </DialogTrigger>
                            <DialogContent
                                className="max-w-[400px] max-h-[500px] md:max-w-[600px]"
                                onOpenAutoFocus={(e) => e.preventDefault()}
                            >
                                <DialogHeader className="">
                                    <DialogTitle className="capitalize text-xl">
                                        filter
                                    </DialogTitle>
                                    <Separator />
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <div className="overflow-y-auto">
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-base font-medium  capitalize">
                                            property prices
                                        </h3>

                                        <div className="flex gap-4">
                                            <div className="w-full relative">
                                                <Label
                                                    htmlFor="min"
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                >
                                                    Rp.
                                                </Label>
                                                <Input
                                                    id="min"
                                                    type="number"
                                                    placeholder="Minimum"
                                                    className="w-full h-12 focus-visible:!ring-0 focus-visible:!ring-offset-0 pl-12"
                                                    value={minPrice}
                                                    onChange={handleMinChange}
                                                />
                                            </div>
                                            <div className="w-full relative">
                                                <Label
                                                    htmlFor="max"
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                >
                                                    Rp.
                                                </Label>
                                                <Input
                                                    id="max"
                                                    type="number"
                                                    placeholder="Maximum"
                                                    className="w-full h-12 focus-visible:!ring-0 focus-visible:!ring-offset-0 pl-12"
                                                    value={maxPrice}
                                                    onChange={handleMaxChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4">
                                            {ranges.map((range) => (
                                                <Button
                                                    key={range.label}
                                                    onClick={() =>
                                                        handleRangeClick(range)
                                                    }
                                                    variant="outline"
                                                    className={`${
                                                        minPrice ===
                                                            range.min &&
                                                        maxPrice === range.max
                                                            ? 'border-green-600 bg-green-400/50'
                                                            : ''
                                                    } flex gap-2`}
                                                >
                                                    {range.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-base font-medium  capitalize">
                                            property type
                                        </h3>
                                        <div className="flex flex-wrap gap-4">
                                            {uniquePropertyTypes.map(
                                                (type, index) => (
                                                    <Button
                                                        key={index}
                                                        onClick={() =>
                                                            handlePropertyTypeChange(
                                                                type
                                                            )
                                                        }
                                                        variant="outline"
                                                        className={`${
                                                            selectPropertyType ===
                                                            type
                                                                ? 'border-green-600 bg-green-400/50'
                                                                : ''
                                                        } flex gap-2 capitalize`}
                                                    >
                                                        {type}
                                                    </Button>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-base font-medium  capitalize">
                                            bedroom
                                        </h3>
                                        <div className="flex flex-wrap gap-4">
                                            {dataRooms.map((item, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={() =>
                                                        handleBedRoomsChange(
                                                            item.value
                                                        )
                                                    }
                                                    variant="outline"
                                                    className={`${
                                                        selectBedRooms ===
                                                        item.value
                                                            ? 'border-green-600 bg-green-400/50'
                                                            : ''
                                                    } flex gap-2`}
                                                >
                                                    {item.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-base font-medium  capitalize">
                                            bathroom
                                        </h3>
                                        <div className="flex flex-wrap gap-4">
                                            {dataRooms.map((item, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={() =>
                                                        handleBathRoomsChange(
                                                            item.value
                                                        )
                                                    }
                                                    variant="outline"
                                                    className={`${
                                                        selectBathRooms ===
                                                        item.value
                                                            ? 'border-green-600 bg-green-400/50'
                                                            : ''
                                                    } flex gap-2`}
                                                >
                                                    {item.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter className="border-t pt-4 flex flex-row gap-4">
                                    <Button
                                        variant="outline"
                                        className=""
                                        onClick={() => handleClearFilter()}
                                    >
                                        Clear
                                    </Button>
                                    <DialogClose asChild>
                                        <Button variant="default" className="">
                                            Apply
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertySearch;
