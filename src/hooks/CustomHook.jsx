import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const formatPrice = (number) => {
    if (number >= 1e9) {
        return `Rp ${(number / 1e9).toFixed(1)} M`; // Format miliar
    } else if (number >= 1e6) {
        return `Rp ${(number / 1e6).toFixed(1)} JT`; // Format juta
    } else if (number >= 1e3) {
        return `Rp ${(number / 1e3).toFixed(1)} K`; // Format ribu
    }
    return `Rp. ${number}`; // Jika kurang dari 1.000
};

export const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

export const getLatestProperty = (data) => {
    return data
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        .slice(0, 4);
};

// Sesuaikan dengan lokasi file supabaseClient.js

export const useAuthSession = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mendapatkan session saat komponen pertama kali mount
        // supabase.auth.getSession().then(({ data: { session } }) => {
        //     setSession(session);
        // });

        const fetchSession = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                toast.error(error.message);
            } else {
                setSession(session);
            }

            setLoading(false);
        };

        fetchSession();

        // Mendengarkan perubahan status autentikasi
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        // Membersihkan subscription saat komponen unmount
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { session, loading };
};
