import AddProperty from './AddProperty';
import { useAuthSession } from '@/hooks/CustomHook';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPropertyLayout = () => {
    const { session, loading } = useAuthSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !session) {
            navigate('/beryl/login');
        }
    }, [session, loading, navigate]);
    return (
        <>
            {loading ? (
                <div className="w-full h-screen flex justify-center items-center">
                    <LoaderCircle className="w-24 h-24 animate-spin" />
                </div>
            ) : (
                <div>
                    <AddProperty />
                </div>
            )}
        </>
    );
};

export default AddPropertyLayout;
