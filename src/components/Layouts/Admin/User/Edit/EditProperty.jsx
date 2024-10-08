import Sidebar, { SidebarItem } from '../../Dashboard/Sidebar';
import EditUploadFile from '../_components/EditUploadFile';
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
import { v4 as uuid } from 'uuid';

const EditProperty = (props) => {
    const { dataEditProperty } = props;
    const [userEmail, setUserEmail] = useState(null);
    const [newImages, setNewImages] = useState([]);

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
        try {
            const { data: updateData, error: updateError } = await supabase
                .from('properties')
                .update(values)
                .eq('uuid', params_uuid)
                .select();
            if (updateError) {
                toast.error(updateError.message);
            }

            const propertyId = updateData[0].id;

            // upload images
            const imageUploadPromises = newImages.map(async (image, index) => {
                const file = image;
                const d = new Date();
                const fileName = uuid().toString();
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

            const {
                data: propertyImageUpdateData,
                error: propertyImageUpdateError,
            } = await supabase
                .from('property_images')
                .insert(imageUploadResults)
                .select();

            if (propertyImageUpdateError) {
                toast.error(propertyImageUpdateError.message);
                return;
            }

            toast.success('Property Updated');
            setTimeout(() => {
                navigate('/admin');
            }, 2500);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }

        // const { data, error } = await supabase
        //     .from('properties')
        //     .update(values)
        //     .eq('uuid', params_uuid)
        //     .select();
        // if (data) {
        //     toast.success('Property Updated');
        //     setTimeout(() => {
        //         navigate('/admin');
        //     }, 1000);
        // } else {
        //     toast.error(error.message);
        // }
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
                                                    htmlFor="number_phone"
                                                    className="text-lg"
                                                >
                                                    Nomor Telepon
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="number_phone"
                                                    id="number_phone"
                                                    placeholder="62123456789"
                                                    className="focus:!ring-1"
                                                    onChange={handleChange}
                                                    maxLength="13"
                                                    defaultValue={
                                                        dataEditProperty?.number_phone
                                                    }
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="listrik"
                                                    className="text-lg"
                                                >
                                                    Listrik
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="listrik"
                                                    id="listrik"
                                                    placeholder="ex: 2200"
                                                    className="focus:!ring-1"
                                                    onChange={handleChange}
                                                    maxLength="13"
                                                    defaultValue={
                                                        dataEditProperty?.listrik
                                                    }
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="car_port"
                                                    className="text-lg"
                                                >
                                                    Garasi
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="car_port"
                                                    id="car_port"
                                                    placeholder="ex: 2"
                                                    className="focus:!ring-1"
                                                    onChange={handleChange}
                                                    maxLength="13"
                                                    defaultValue={
                                                        dataEditProperty?.car_port
                                                    }
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="air"
                                                    className="text-lg"
                                                >
                                                    Air
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="air"
                                                    id="air"
                                                    placeholder="ex: Jetpump"
                                                    className="focus:!ring-1"
                                                    onChange={handleChange}
                                                    defaultValue={
                                                        dataEditProperty?.air
                                                    }
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="sertifikat"
                                                    className="text-lg"
                                                >
                                                    Sertifikat
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="sertifikat"
                                                    id="sertifikat"
                                                    placeholder="ex: SHM"
                                                    className="focus:!ring-1"
                                                    onChange={handleChange}
                                                    maxLength="13"
                                                    defaultValue={
                                                        dataEditProperty?.sertifikat
                                                    }
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label
                                                    htmlFor="lantai"
                                                    className="text-lg"
                                                >
                                                    Lantai
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="lantai"
                                                    id="lantai"
                                                    placeholder="ex: 2"
                                                    className="focus:!ring-1"
                                                    onChange={handleChange}
                                                    maxLength="13"
                                                    defaultValue={
                                                        dataEditProperty?.lantai
                                                    }
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
                                        </div>

                                        <div>
                                            <EditUploadFile
                                                setNewImages={(e) =>
                                                    setNewImages(e)
                                                }
                                                propertyId={
                                                    dataEditProperty?.id
                                                }
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
