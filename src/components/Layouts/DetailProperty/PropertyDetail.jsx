import { formatCurrency } from '@/hooks/CustomHook';
import React from 'react';

const PropertyDetail = (props) => {
    const { property } = props;
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-8 mt-4 md:px-28">
                <div className="bg-white rounded-3xl p-4 md:p-6">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-3xl font-bold text-head capitalize">
                            {property.title}
                        </h1>
                        <h2 className="text-base font-bold mb-4 text-sub_head capitalize">
                            {property.developer}
                        </h2>
                        <h3 className="text-2xl text-green-600 font-semibold">
                            {formatCurrency(property.price)}
                        </h3>
                    </div>

                    <div className="mt-4 border-t-2 border-b-2 py-2">
                        <h4 className="text-sub_head text-xl font-bold capitalize pb-2">
                            detail
                        </h4>
                        <table className="">
                            <tbody className="">
                                <tr className="h-8">
                                    <td className="text-sub_head text-base font-normal capitalize align-top w-36">
                                        alamat
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top w-4">
                                        :
                                    </td>
                                    <td className="text-sub_head text-base font-normal whitespace-normal break-words align-top">
                                        {property.address}
                                    </td>
                                </tr>
                                <tr className="h-8">
                                    <td className="text-sub_head text-base font-normal capitalize  align-top">
                                        lokasi
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        :
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        {property.city}
                                    </td>
                                </tr>
                                <tr className="h-8">
                                    <td className="text-sub_head text-base font-normal capitalize  align-top">
                                        tipe
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        :
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        {property.property_type}
                                    </td>
                                </tr>
                                <tr className="h-8">
                                    <td className="text-sub_head text-base font-normal capitalize  align-top">
                                        luas bangunan
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        :
                                    </td>
                                    <td className="text-sub_head text-base font-normal align-top">
                                        {property.lb} m<sup>2</sup>
                                    </td>
                                </tr>
                                <tr className="h-8">
                                    <td className="text-sub_head text-base font-normal capitalize  align-top">
                                        luas tanah
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        :
                                    </td>
                                    <td className="text-sub_head text-base font-normal align-top">
                                        {property.lt} m<sup>2</sup>
                                    </td>
                                </tr>
                                <tr className="h-8">
                                    <td className="text-sub_head text-base font-normal capitalize  align-top">
                                        kamar tidur
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        :
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        {property.bedroom}
                                    </td>
                                </tr>
                                <tr className="h-8">
                                    <td className="text-sub_head text-base font-normal capitalize  align-top">
                                        kamar mandi
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        :
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        {property.bathroom}
                                    </td>
                                </tr>
                                <tr className="h-8">
                                    <td className="text-sub_head text-base font-normal capitalize  align-top">
                                        air
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        :
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        {property.air ? property.air : '-'}
                                    </td>
                                </tr>
                                <tr className="h-8">
                                    <td className="text-sub_head text-base font-normal capitalize  align-top">
                                        listrik
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        :
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        {property.listrik
                                            ? `${property.listrik} watt`
                                            : '-'}
                                    </td>
                                </tr>
                                <tr className="h-8">
                                    <td className="text-sub_head text-base font-normal capitalize  align-top">
                                        car port
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        :
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize align-top">
                                        {property.car_port}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* <table >
                            <tbody>
                                <tr>
                                    <td className="text-sub_head text-base font-normal capitalize md:pr-10">
                                        alamat
                                    </td>
                                    <td className="text-sub_head md:text-base font-normal">
                                        : {property.address}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-sub_head text-base font-normal capitalize md:pr-10">
                                        lokasi
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize">
                                        : {property.city}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-sub_head text-base font-normal capitalize md:pr-10">
                                        tipe
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize">
                                        : {property.property_type}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-sub_head text-base font-normal capitalize md:pr-10">
                                        luas bangunan
                                    </td>
                                    <td className="text-sub_head text-base font-normal ">
                                        : {property.lb} m<sup>2</sup>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-sub_head text-base font-normal capitalize md:pr-10">
                                        luas tanah
                                    </td>
                                    <td className="text-sub_head text-base font-normal ">
                                        : {property.lt} m<sup>2</sup>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-sub_head text-base font-normal capitalize md:pr-10">
                                        kamar tidur
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize">
                                        : {property.bedroom}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-sub_head text-base font-normal capitalize md:pr-10">
                                        kamar mandi
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize">
                                        : {property.bathroom}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-sub_head text-base font-normal capitalize md:pr-10">
                                        air
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize">
                                        : {property.air ? property.air : '-'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-sub_head text-base font-normal capitalize md:pr-10">
                                        listrik
                                    </td>
                                    <td className="text-sub_head text-base font-normal capitalize">
                                        :{' '}
                                        {property.listrik
                                            ? property.listrik + 'watt'
                                            : '-'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-sub_head text-base font-normal capitalize md:pr-10">
                                        car port
                                    </td>
                                    <td className="text-sub_head text-base font-normal ">
                                        : {property.car_port}
                                    </td>
                                </tr>
                            </tbody>
                        </table> */}
                    </div>

                    <div className="mt-4 border-b-2 py-2">
                        <h4 className="text-sub_head text-xl font-bold capitalize pb-2">
                            deskripsi
                        </h4>
                        <p className="text-sub_head text-base font-normal text-justify">
                            {property.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
