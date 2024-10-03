import Sidebar, { SidebarItem } from './Sidebar';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatPrice } from '@/hooks/CustomHook';
import { supabase } from '@/utils/supabase/client';
import { Home, LayoutDashboard, SquarePen, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const TableAdmin = () => {
    const [userEmail, setUserEmail] = useState(null);
    const [dataProperty, setDataProperty] = useState([]);
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

    const getDataProperty = async () => {
        let { data: properties, error } = await supabase
            .from('properties')
            .select(
                'developer,title,property_type,city,price,status,sell_type,uuid'
            );

        if (properties) {
            setDataProperty(properties);
        }
    };

    useEffect(() => {
        getDataProperty();
    }, []);

    /**
     * Handle delete a property
     * @param {string} uuid of the property
     */
    const onDeleteHandler = async (uuid) => {
        try {
            // cari data by uuid dan ambil id di properties
            const { data: idProperty, error: errorProperty } = await supabase
                .from('properties')
                .select('id')
                .eq('uuid', uuid);

            if (errorProperty) {
                toast.error(errorProperty.message);
            }

            // ambil data image by id
            const { data: dataImage, error: errorImage } = await supabase
                .from('property_images')
                .select('image_url')
                .eq('property_id', idProperty[0].id);

            if (dataImage.length > 0) {
                const deleteImage = dataImage.map(async (image) => {
                    const fileName = image.image_url.split('/').pop();

                    // delete image from storage
                    const { error: errorDelete } = await supabase.storage
                        .from('property_images')
                        .remove([fileName]);

                    if (errorDelete) {
                        toast.error(errorDelete.message);
                    }
                });

                await Promise.all(deleteImage);
            } else {
                toast.error(errorImage.message);
            }

            // delete property_images table
            const { error: errorDeletePropertyImages } = await supabase
                .from('property_images')
                .delete()
                .eq('property_id', idProperty[0].id);

            if (errorDeletePropertyImages) {
                toast.error(errorDeletePropertyImages.message);
            }

            // delete property
            const { error: errorDeleteProperties } = await supabase
                .from('properties')
                .delete()
                .eq('uuid', uuid);

            if (errorDeleteProperties) {
                toast.error(errorDeleteProperties.message);
            }

            toast.success('Property Deleted');
            getDataProperty();
        } catch (error) {
            toast.error(error.message);
        }
        // const { error } = await supabase
        //     .from('properties')
        //     .delete()
        //     .eq('uuid', uuid);

        // if (error) {
        //     toast.error(error.message);
        // } else {
        //     toast.success('Property Deleted');
        //     getDataProperty();
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
                            active={true}
                        />
                    </Link>
                    <Link to="/">
                        <SidebarItem icon={<Home size={20} />} text="Home" />
                    </Link>
                </Sidebar>

                <div className="w-full max-h-screen overflow-y-scroll">
                    <div className="container mx-auto py-8 flex justify-between items-center sticky top-0 z-10 bg-white border-b">
                        <h1 className="md:text-3xl font-semibold">
                            List Data Property
                        </h1>
                        <Link to="/admin/add-property">
                            <button
                                type="button"
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
                            >
                                Add Property
                            </button>
                        </Link>
                    </div>
                    <div className="container mx-auto py-8 flex justify-between items-center">
                        <Table className="min-w-full ">
                            {/* <TableCaption>
                                A list of your recent invoices.
                            </TableCaption> */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Developer</TableHead>
                                    <TableHead>Judul</TableHead>
                                    <TableHead>Tipe Properti</TableHead>
                                    <TableHead>Kota</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tipe Jual</TableHead>
                                    <TableHead>Harga</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="overflow-y-scroll w-full">
                                {dataProperty.map((data, index) => (
                                    <TableRow
                                        key={index}
                                        className="capitalize"
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{data.developer}</TableCell>
                                        <TableCell className="truncate w-2">
                                            {data.title}
                                        </TableCell>
                                        <TableCell>
                                            {data.property_type}
                                        </TableCell>
                                        <TableCell>{data.city}</TableCell>
                                        <TableCell>{data.status}</TableCell>
                                        <TableCell>{data.sell_type}</TableCell>
                                        <TableCell>
                                            {formatPrice(data.price)}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline">
                                                        action
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    {/* <DropdownMenuLabel>
                                                        My Account
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator /> */}
                                                    <Link
                                                        to={`/admin/edit-property/${data.uuid}`}
                                                    >
                                                        <DropdownMenuItem>
                                                            <div className="flex gap-2 items-center">
                                                                <SquarePen className="h-4 w-4" />
                                                                Edit
                                                            </div>
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuSeparator />
                                                    <Dialog>
                                                        <DialogTrigger className="w-full">
                                                            <DropdownMenuItem
                                                                onSelect={(e) =>
                                                                    e.preventDefault()
                                                                }
                                                            >
                                                                <div className="flex gap-2 items-center text-red-500">
                                                                    <Trash2 className="h-4 w-4" />
                                                                    Delete
                                                                </div>
                                                            </DropdownMenuItem>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    Delete
                                                                    Property
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    <div className="flex flex-col gap-6 items-center py-10">
                                                                        <div className="text-center text-xl font-semibold text-head">
                                                                            Apakah
                                                                            anda
                                                                            yakin
                                                                            ingin
                                                                            menghapus
                                                                            data
                                                                            ini?
                                                                        </div>
                                                                        <div className="flex gap-4 items-center justify-center">
                                                                            <DialogClose
                                                                                asChild
                                                                            >
                                                                                <Button
                                                                                    variant="outline"
                                                                                    className="border-head text-head"
                                                                                >
                                                                                    Batal
                                                                                </Button>
                                                                            </DialogClose>
                                                                            <DialogClose
                                                                                asChild
                                                                            >
                                                                                <Button
                                                                                    onClick={() =>
                                                                                        onDeleteHandler(
                                                                                            data.uuid
                                                                                        )
                                                                                    }
                                                                                    variant="destructive"
                                                                                >
                                                                                    Hapus
                                                                                </Button>
                                                                            </DialogClose>
                                                                        </div>
                                                                    </div>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            {/* <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell>$2,500.00</TableCell>
                                </TableRow>
                            </TableFooter> */}
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableAdmin;
