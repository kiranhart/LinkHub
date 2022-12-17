import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between bg-black bg-opacity-60 py-4 px-12 font-inter font-black backdrop-blur-xl">
            <h2 className="bg-gradient-to-r from-rose-400 to-fuchsia-500 bg-clip-text text-center text-2xl font-black uppercase tracking-wider text-transparent">
                <Link href="/">LinkHub</Link>
            </h2>
            <div className="flex flex-row-reverse items-center gap-8">
                {session?.user && <img src={session?.user?.image} alt="Profile Image" className="w-12 rounded-full" />}
                <ul className="flex items-center gap-4 font-satoshi font-semibold text-gray-500">
                    {session?.user ? (
                        <>
                            <li className="rounded-md border-[2px] border-gray-500/25 px-4 py-[4px]">
                                <Link href="/dashboard">Dashboard</Link>
                            </li>
                            <li className="rounded-md border-[2px] border-gray-500/25 px-4 py-[4px] transition-all duration-500 hover:bg-gray-600 hover:text-gray-100">
                                <button onClick={() => signOut()}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="rounded-md  bg-pink-700 px-4 py-[4px] font-inter font-bold text-rose-100 transition-all duration-500">
                                <button onClick={() => signIn()}>Sign In</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Header;
