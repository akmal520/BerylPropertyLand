import EditProperty from './EditProperty';
import { useAuthSession } from '@/hooks/CustomHook';
import { supabase } from '@/utils/supabase/client';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const EditPropertyLayout = () => {
    const [editDataProperty, setEditDataProperty] = React.useState({});
    const [error, setError] = React.useState(true);
    const { session, loading } = useAuthSession();
    const params_uuid = useParams().uuid;
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !session) {
            navigate('/beryl/login');
        }
    }, [session, loading, navigate]);

    // check if uuid is in database
    const checkUUID = async () => {
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('uuid', params_uuid);
        if (error) {
            toast.error(error.message);
            setTimeout(() => {
                navigate('/admin');
            }, 3000);
        } else {
            setEditDataProperty(data[0]);
            setError(false);
        }
    };

    useEffect(() => {
        checkUUID();
    }, [params_uuid]);

    return (
        <>
            <Toaster richColors />
            {loading || error ? (
                <div className="w-full h-screen flex justify-center items-center">
                    <LoaderCircle className="w-24 h-24 animate-spin" />
                </div>
            ) : (
                <div>
                    <EditProperty dataEditProperty={editDataProperty} />
                </div>
            )}
        </>
    );
};

export default EditPropertyLayout;
