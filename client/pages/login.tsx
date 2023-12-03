
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
    const history = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Call API endpoint for login
        // Example: fetch('/login', { method: 'POST', body: { email, password } })
        // Handle login logic here

        // Redirect to /home after successful authentication
        history.push('/home');
    };

    useEffect(() => {
        // Check if user is already authenticated
        // Example: const isAuthenticated = checkAuthentication(); // Implement your own logic
        const isAuthenticated = document.cookie.includes('authenticated=true');

        if (isAuthenticated) {
            history.push('/home');
        }
    }, [history]);


    return (
        <div className="w-full h-full">
            <Navigation />
            <div className="flex flex-col items-center justify-center min-h-[500px]">
                <h1 className="text-2xl font-bold mb-4">Designer Login</h1>
                <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-stone-900/50 backdrop-blur-sm">
                    <div className="mb-4">
                        <label className="block  text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow caret-stone-900 border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block  text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow caret-stone-900 border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            id="login_request"
                        >
                            Login In
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800"
                            href="/reset-password"
                        >
                            Reset Password
                        </a>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
