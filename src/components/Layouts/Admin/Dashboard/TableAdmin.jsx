import AddProperty from '../User/AddProperty';
import Sidebar, { SidebarItem } from './Sidebar';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    LayoutDashboard,
    Home,
    StickyNote,
    Layers,
    Flag,
    Calendar,
    LifeBuoy,
    Settings,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const invoices = [
    {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV002',
        paymentStatus: 'Pending',
        totalAmount: '$150.00',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV003',
        paymentStatus: 'Unpaid',
        totalAmount: '$350.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV004',
        paymentStatus: 'Paid',
        totalAmount: '$450.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV005',
        paymentStatus: 'Paid',
        totalAmount: '$550.00',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV006',
        paymentStatus: 'Pending',
        totalAmount: '$200.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
];

const TableAdmin = () => {
    return (
        <div>
            <div className="flex">
                <Sidebar>
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
                            <TableCaption>
                                A list of your recent invoices.
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        Invoice
                                    </TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead>Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="overflow-y-scroll w-full">
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.invoice}>
                                        <TableCell className="font-medium">
                                            {invoice.invoice}
                                        </TableCell>
                                        <TableCell>
                                            {invoice.paymentStatus}
                                        </TableCell>
                                        <TableCell>
                                            {invoice.paymentMethod}
                                        </TableCell>
                                        <TableCell>
                                            {invoice.totalAmount}
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
