import TableAdmin from './TableAdmin';
import { useAuthSession } from '@/hooks/CustomHook';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const DashboardLayout = () => {
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
                    <TableAdmin />
                    <Toaster richColors />
                </div>
            )}
        </>
    );
};

export default DashboardLayout;
