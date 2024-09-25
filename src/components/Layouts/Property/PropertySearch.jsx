import { Button } from '@/components/ui/button';
import {
    Dialog,
    // DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogClose } from '@radix-ui/react-dialog';
import { Filter, Search } from 'lucide-react';

const PropertySearch = () => {
    return (
        <section className="mt-10 w-full md:h-auto py-10 bg-gray-200">
            <div className="flex flex-col justify-center items-center gap-6">
                <h1 className="text-3xl md:text-4xl font-semibold capitalize text-head text-center w-2/3 md:w-1/3">
                    Find <span className="text-green-500">your</span> dream{' '}
                    <span className="text-green-500">property</span>
                </h1>
                <div className="flex justify-center items-center gap-2">
                    <div className="relative md:w-[450px]">
                        <Input
                            type="text"
                            placeholder="Search Property . . ."
                            className="w-full h-12 focus-visible:!ring-0 focus-visible:!ring-offset-0 focus:!border-0"
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
                            <DialogContent className="max-w-[400px] md:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle className="capitalize text-xl">
                                        filter
                                    </DialogTitle>
                                    {/* <DialogDescription>
                                        Make changes to your profile here. Click
                                        save when you're done.
                                    </DialogDescription> */}
                                </DialogHeader>
                                <div className="">
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
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Button
                                                variant="outline"
                                                className=" flex gap-2"
                                            >
                                                <span>{'<'} Rp. 1 M</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                {/* <DialogClose className="w-28 flex justify-end border border-red-300">
                                    <Button type="submit">Save changes</Button>
                                </DialogClose> */}

                                <DialogFooter>
                                    <Button variant="outline" className="">
                                        Clear
                                    </Button>
                                    <DialogClose>
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
