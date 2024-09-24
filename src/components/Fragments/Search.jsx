import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

const dataList = [
    { id: 1, city: 'New York', propertyType: 'Apartment', price: 100000 },
    { id: 2, city: 'Los Angeles', propertyType: 'House', price: 750000 },
    { id: 3, city: 'Chicago', propertyType: 'Apartment', price: 1200000 },
];

const Search = () => {
    const [activeTab, setActiveTab] = useState('Rent');

    return (
        <div className="flex flex-col justify-center items-center py-6">
            {/* Tabs for Rent, Buy, Sell */}
            <div className="bg-white shadow-lg rounded-full px-6 py-3 mb-6 flex space-x-8">
                <button
                    className={`${
                        activeTab === 'Rent'
                            ? 'text-black font-semibold'
                            : 'text-gray-400'
                    } focus:outline-none`}
                    onClick={() => setActiveTab('Rent')}
                >
                    Rent
                </button>
                <button
                    className={`${
                        activeTab === 'Buy'
                            ? 'text-black font-semibold'
                            : 'text-gray-400'
                    } focus:outline-none`}
                    onClick={() => setActiveTab('Buy')}
                >
                    Buy
                </button>
                <button
                    className={`${
                        activeTab === 'Sell'
                            ? 'text-black font-semibold'
                            : 'text-gray-400'
                    } focus:outline-none`}
                    onClick={() => setActiveTab('Sell')}
                >
                    Sell
                </button>
            </div>

            {/* Search Form */}
            <div className="bg-white shadow-lg rounded-full p-4 flex items-center space-x-6 w-full max-w-5xl">
                {/* Location */}
                <div className="flex flex-col">
                    <label className="text-gray-600 font-semibold">
                        Location
                    </label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Select Your City"
                            className="border-none focus:ring-0 bg-transparent text-gray-800 placeholder-gray-500"
                        />
                        <i className="fas fa-map-marker-alt text-gray-500"></i>{' '}
                        {/* Icon */}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-10 border-l border-gray-300"></div>

                {/* Property Type */}
                <div className="flex flex-col">
                    <label className="text-gray-600 font-semibold">
                        Property Type
                    </label>
                    <select className="border-none focus:ring-0 bg-transparent text-gray-800 placeholder-gray-500">
                        <option>Choose Property Type</option>
                        <option>Apartment</option>
                        <option>House</option>
                        <option>Villa</option>
                    </select>
                </div>

                {/* Divider */}
                <div className="h-10 border-l border-gray-300"></div>

                {/* Price Range */}
                <div className="flex flex-col">
                    <label className="text-gray-600 font-semibold">
                        Price Range
                    </label>
                    <select className="border-none focus:ring-0 bg-transparent text-gray-800 placeholder-gray-500">
                        <option>Choose Price Range</option>
                        <option>$0 - $500</option>
                        <option>$500 - $1000</option>
                        <option>$1000 - $2000</option>
                    </select>
                </div>

                {/* Search Button */}
                <div className="ml-auto">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );
    // const [openPopover, setOpenPopover] = React.useState(false);
    // const [city, setCity] = React.useState('');
    // return (
    //     <Tabs defaultValue="sewa" className="w-full">
    //         <TabsList className="flex justify-start items-center">
    //             <TabsTrigger className="" value="sewa">
    //                 Sewa
    //             </TabsTrigger>
    //             <TabsTrigger className="" value="jual">
    //                 Jual
    //             </TabsTrigger>
    //         </TabsList>

    //         <TabsContent value="sewa">
    //             <Card className="flex flex-row">
    //                 <CardHeader>
    //                     <CardTitle className="text-lg">Location</CardTitle>
    //                     <Popover
    //                         open={openPopover}
    //                         onOpenChange={setOpenPopover}
    //                     >
    //                         <PopoverTrigger asChild>
    //                             <Button
    //                                 variant="outline"
    //                                 role="combobox"
    //                                 aria-expanded={openPopover}
    //                                 className="w-[200px] justify-between"
    //                             >
    //                                 {city
    //                                     ? dataList.find(
    //                                           (lokasi) => lokasi.city === city
    //                                       )?.city
    //                                     : 'Select Location'}
    //                             </Button>
    //                         </PopoverTrigger>
    //                         <PopoverContent className="w-[200px] p-0">
    //                             <Command>
    //                                 <CommandInput placeholder="Search..." />
    //                                 <CommandList>
    //                                     <CommandEmpty>
    //                                         No results found.
    //                                     </CommandEmpty>
    //                                     <CommandGroup>
    //                                         {dataList.map((lokasi) => (
    //                                             <CommandItem
    //                                                 key={lokasi.id}
    //                                                 onSelect={(value) => {
    //                                                     setCity(value);
    //                                                     setOpenPopover(false);
    //                                                 }}
    //                                             >
    //                                                 {lokasi.city}
    //                                             </CommandItem>
    //                                         ))}
    //                                     </CommandGroup>
    //                                 </CommandList>
    //                             </Command>
    //                         </PopoverContent>
    //                     </Popover>
    //                 </CardHeader>

    //                 <CardHeader>
    //                     <CardTitle className="text-lg">Location</CardTitle>
    //                     <Popover
    //                         open={openPopover}
    //                         onOpenChange={setOpenPopover}
    //                     >
    //                         <PopoverTrigger asChild>
    //                             <Button
    //                                 variant="outline"
    //                                 role="combobox"
    //                                 aria-expanded={openPopover}
    //                                 className="w-[200px] justify-between"
    //                             >
    //                                 {city
    //                                     ? dataList.find(
    //                                           (lokasi) => lokasi.city === city
    //                                       )?.city
    //                                     : 'Select Location'}
    //                             </Button>
    //                         </PopoverTrigger>
    //                         <PopoverContent className="w-[200px] p-0">
    //                             <Command>
    //                                 <CommandInput placeholder="Search..." />
    //                                 <CommandList>
    //                                     <CommandEmpty>
    //                                         No results found.
    //                                     </CommandEmpty>
    //                                     <CommandGroup>
    //                                         {dataList.map((lokasi) => (
    //                                             <CommandItem
    //                                                 key={lokasi.id}
    //                                                 onSelect={(value) => {
    //                                                     setCity(value);
    //                                                     setOpenPopover(false);
    //                                                 }}
    //                                             >
    //                                                 {lokasi.city}
    //                                             </CommandItem>
    //                                         ))}
    //                                     </CommandGroup>
    //                                 </CommandList>
    //                             </Command>
    //                         </PopoverContent>
    //                     </Popover>
    //                 </CardHeader>
    //             </Card>
    //         </TabsContent>
    //     </Tabs>
    // );
};

export default Search;
