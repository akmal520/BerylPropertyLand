import Sidebar, { SidebarItem } from '../../Dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/utils/supabase/client';
import { Formik } from 'formik';
import { Home, LayoutDashboard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const EditProperty = (props) => {
    const { dataEditProperty } = props;
    const [userEmail, setUserEmail] = useState(null);

    const navigate = useNavigate();
    const params_uuid = useParams().uuid;

    const getUSer = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            setUserEmail(user.email);
        }
    };

    useEffect(() => {
        getUSer();
    }, []);

    const onSubmitHandler = async (values) => {
        // const { data, error } = await supabase
        //     .from('properties')
        //     .insert(values)
        //     .select();

        const { data, error } = await supabase
            .from('properties')
            .update(values)
            .eq('uuid', params_uuid)
            .select();

        if (data) {
            toast.success('Property Updated');
            setTimeout(() => {
                navigate('/admin');
            }, 1000);
        } else {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <Toaster richColors />
            <div className="flex">
                <Sidebar supabase={supabase} user={userEmail}>
                    <Link to="/admin">
                        <SidebarItem
                            icon={<LayoutDashboard size={20} />}
                            text="Dashboard"
                        />
                    </Link>
                    <Link to="/">
                        <SidebarItem icon={<Home size={20} />} text="Home" />
                    </Link>
                </Sidebar>

                <div className="w-full max-h-screen overflow-y-auto">
                    <div className="container mx-auto py-4 md:py-6 flex justify-between items-center sticky top-0 z-10 bg-white">
                        <h1 className="text-2xl font-bold py-4 text-gray-800 md:text-3xl">
                            Add Property
                        </h1>
                    </div>

                    <Formik
                        initialValues={{
                            property_type:
                                dataEditProperty?.property_type || '',
                            sell_type: dataEditProperty?.sell_type || '',
                            status: dataEditProperty?.status || '',
                        }}
                        onSubmit={(values) => {
                            onSubmitHandler(values);
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <div className="w-full container mx-auto py-8">
                                <form
                                    onSubmit={handleSubmit}
                                    className="w-3/3 mx-auto border-2 rounded-lg p-6 "
                                >
                                    <div className="w-full flex flex-wrap md:flex-col gap-4 md:gap-10">
                                        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-10">
                                            <div className="w-full">
                                                <Label
                                                    htmlFor="title"
                                                    className="text-lg"
                                                >
                                                    Judul
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    placeholder="Rumah Cantik 2 Lantai di Bintara"
                                                    className="focus:!ring-1"
                                                    defaultValue={
                                                        dataEditProperty?.title
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="city"
                                                    className="text-lg"
                                                >
                                                    Kota
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    placeholder="Jakarta"
                                                    className="focus:!ring-1"
                                                    defaultValue={
                                                        dataEditProperty?.city
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="price"
                                                    className="text-lg"
                                                >
                                                    Harga
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    placeholder="1000000000"
                                                    className="focus:!ring-1"
                                                    defaultValue={
                                                        dataEditProperty?.price
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <Label
                                                    htmlFor="developer"
                                                    className="text-lg"
                                                >
                                                    Developer
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="developer"
                                                    id="developer"
                                                    placeholder="Jhon"
                                                    className="focus:!ring-1"
                                                    defaultValue={
                                                        dataEditProperty?.developer
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-10">
                                            <div className="w-full">
                                                <Label
                                                    htmlFor="lt"
                                                    className="text-lg"
                                                >
                                                    Luas Tanah
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="lt"
                                                    id="lt"
                                                    placeholder="359"
                                                    className="focus:!ring-1"
                                                    defaultValue={
                                                        dataEditProperty?.lt
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="lb"
                                                    className="text-lg"
                                                >
                                                    Luas Bangunan
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="lb"
                                                    id="lb"
                                                    placeholder="236"
                                                    className="focus:!ring-1"
                                                    defaultValue={
                                                        dataEditProperty?.lb
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="bedroom"
                                                    className="text-lg"
                                                >
                                                    Kamar Tidur
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="bedroom"
                                                    id="bedroom"
                                                    placeholder="3"
                                                    min="1"
                                                    max="5"
                                                    className="focus:!ring-1"
                                                    defaultValue={
                                                        dataEditProperty?.bedroom
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="bathroom"
                                                    className="text-lg"
                                                >
                                                    Kamar Mandi
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="bathroom"
                                                    id="bathroom"
                                                    placeholder="2"
                                                    min="1"
                                                    max="5"
                                                    className="focus:!ring-1"
                                                    defaultValue={
                                                        dataEditProperty?.bathroom
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-10">
                                            <div className="w-full">
                                                <Label
                                                    htmlFor="property_type"
                                                    className="text-lg"
                                                >
                                                    Tipe Properti
                                                </Label>
                                                <Select
                                                    id="property_type"
                                                    name="property_type"
                                                    defaultValue={
                                                        dataEditProperty?.property_type
                                                    }
                                                    onValueChange={(e) =>
                                                        (values.property_type =
                                                            e)
                                                    }
                                                >
                                                    <SelectTrigger className="">
                                                        <SelectValue placeholder="Tipe Properti" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="rumah">
                                                            Rumah
                                                        </SelectItem>
                                                        <SelectItem value="apartment">
                                                            Apartment
                                                        </SelectItem>
                                                        <SelectItem value="tanah">
                                                            Tanah
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="sell_type"
                                                    className="text-lg"
                                                >
                                                    Tipe Jual
                                                </Label>
                                                <Select
                                                    id="sell_type"
                                                    name="sell_type"
                                                    value={
                                                        dataEditProperty?.sell_type
                                                    }
                                                    onValueChange={(e) =>
                                                        (values.sell_type = e)
                                                    }
                                                >
                                                    <SelectTrigger className="">
                                                        <SelectValue placeholder="Tipe Jual" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="sell">
                                                            Jual
                                                        </SelectItem>
                                                        <SelectItem value="rent">
                                                            sewa
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="status"
                                                    className="text-lg"
                                                >
                                                    Status
                                                </Label>
                                                <Select
                                                    id="status"
                                                    name="status"
                                                    defaultValue={
                                                        dataEditProperty?.status
                                                    }
                                                    onValueChange={(e) =>
                                                        (values.status = e)
                                                    }
                                                >
                                                    <SelectTrigger className="">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="available">
                                                            Ada
                                                        </SelectItem>
                                                        <SelectItem value="sold">
                                                            Terjual
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="jabatan"
                                                    className="text-lg"
                                                >
                                                    Jabatan
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="jabatan"
                                                    id="jabatan"
                                                    placeholder="Marketing Associate"
                                                    className="focus:!ring-1"
                                                    defaultValue={
                                                        dataEditProperty?.jabatan
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-10">
                                            <div className="w-full">
                                                <Label
                                                    htmlFor="description"
                                                    className="text-lg"
                                                >
                                                    Deskripsi
                                                </Label>
                                                <Textarea
                                                    placeholder="Tulis deskripsi properti..."
                                                    id="description"
                                                    name="description"
                                                    defaultValue={
                                                        dataEditProperty?.description
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="address"
                                                    className="text-lg"
                                                >
                                                    Alamat
                                                </Label>
                                                <Textarea
                                                    placeholder="Jl. Radio 1 No 21, Kebayoran Baru, Jakarta Selatan"
                                                    id="address"
                                                    name="address"
                                                    defaultValue={
                                                        dataEditProperty?.address
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="number_phone"
                                                    className="text-lg"
                                                >
                                                    Nomor Telepon
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="number_phone"
                                                    id="number_phone"
                                                    placeholder="+62123456789"
                                                    className="focus:!ring-1"
                                                    defaultValue={
                                                        dataEditProperty?.number_phone
                                                    }
                                                    onChange={handleChange}
                                                    maxLength="13"
                                                />
                                            </div>
                                        </div>

                                        {/* <div className="flex items-center justify-center w-full">
                                    <label
                                        for="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">
                                                    Click to upload
                                                </span>{' '}
                                                or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX.
                                                800x400px)
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            multiple
                                        />
                                    </label>
                                </div> */}
                                        <div className="w-full flex justify-end gap-4 mt-4">
                                            <Link to="/admin">
                                                <Button
                                                    variant="outline"
                                                    className="w-24 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                                >
                                                    Batal
                                                </Button>
                                            </Link>
                                            <Button
                                                type="submit"
                                                variant="outline"
                                                className="w-24 bg-green-500 text-white hover:bg-green-600 hover:text-white"
                                            >
                                                Simpan
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditProperty;
