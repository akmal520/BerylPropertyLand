import Sidebar, { SidebarItem } from '../../Dashboard/Sidebar';
import FileUpload from '../_components/FileUpload';
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
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const AddProperty = () => {
    const [userEmail, setUserEmail] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
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
        try {
            const { data: propertyData, error: propertyError } = await supabase
                .from('properties')
                .insert(values)
                .select();

            if (propertyError) {
                toast.error(propertyError.message);
            }

            const propertyId = propertyData[0].id;

            // upload images
            const imageUploadPromises = images.map(async (image, index) => {
                const file = image;
                const d = new Date();
                const fileName = Date.now() + '-' + d.getTime().toString();
                const fileExt = file.name.split('.').pop();
                const { data: imageData, error: imageError } =
                    await supabase.storage
                        .from('property_images')
                        .upload(`${fileName}`, file, {
                            cacheControl: '3600',
                            contentType: `image/${fileExt}`,
                            upsert: false,
                        });

                if (imageError) {
                    toast.error(imageError.message);
                    return;
                }

                return {
                    property_id: propertyId,
                    image_url:
                        import.meta.env.VITE_APP_SUPABASE_IMAGE_URL + fileName,
                };
            });

            const imageUploadResults = await Promise.all(imageUploadPromises);

            const { error: imageDataError } = await supabase
                .from('property_images')
                .insert(imageUploadResults)
                .select();

            if (imageDataError) {
                toast.error(imageDataError.message);
                return;
            }

            toast.success('Property Added');
            setLoading(false);
            setTimeout(() => {
                navigate('/admin');
            }, 2500);
        } catch (error) {
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
                            property_type: '',
                            sell_type: '',
                            status: '',
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
                                                    onChange={handleChange}
                                                    maxLength="13"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <FileUpload
                                                setImages={(e) => setImages(e)}
                                            />
                                        </div>

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
                                                {!loading
                                                    ? 'Loading...'
                                                    : 'Simpan'}
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

export default AddProperty;
