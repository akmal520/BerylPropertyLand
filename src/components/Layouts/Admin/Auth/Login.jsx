import Logo from '../../../../assets/Logo-1.png';
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase/client';
import { ChevronsLeft } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [session, setSession] = React.useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(error.message);
            setEmail('');
            setPassword('');
            setError(error.message);
        } else {
            // Dapatkan session setelah login
            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession();
            if (sessionError) {
                toast.error(sessionError.message);
            } else {
                toast.success('Login Berhasil');
                setSession(session); // Simpan session jika perlu
                navigate('/admin'); // Arahkan ke dashboard
            }
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-32  mr-2" src={Logo} alt="logo" />
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 md:space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className=" flex items-center justify-between">
                                <Link
                                    to="/"
                                    className="flex items-center text-sm font-medium text-sub_head hover:text-blue-600"
                                >
                                    <ChevronsLeft className="w-4 h-4 mr-1" />
                                    back to home
                                </Link>

                                <Button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Sign in
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster richColors />
        </section>
    );
};

export default Login;
