import { type NextPage } from 'next';
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { IoIosExit } from 'react-icons/Io';

import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import DottedBackground from '../ui/DottedBackground';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const { data: sessionData } = useSession();

    return (
        <>
            <Head>
                <title>LinkHub - A Home For Your Links</title>
                <meta name="description" content="LinkHub - A home for your links" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DottedBackground>
                <div className="relative z-30 flex h-full flex-col">
                    <div className="pt-12">
                        <h1 className="bg-gradient-to-r from-red-500 to-purple-400 bg-clip-text text-center text-7xl font-black uppercase tracking-wide text-transparent">
                            LinkHub
                        </h1>
                        <h3 className="mt-[0.25rem] text-center text-2xl font-bold capitalize tracking-wide text-white">A home for your links</h3>
                    </div>
                    <div className="flex-1 px-12 text-center">
                        {!sessionData && <GetStarted />}
                        {sessionData && <WelcomeBack username={sessionData?.user?.name} />}
                    </div>
                    <div className="flex h-16 items-center justify-center text-center text-white ">
                        <a target="_blank" href="https://kiranhart.com" rel="noreferrer">
                            Created By{' '}
                            <strong>
                                <span>Kiran Hart</span>
                            </strong>
                        </a>
                    </div>
                </div>
            </DottedBackground>
        </>
    );
};

const GetStarted = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div>
                <h2 className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-center text-2xl font-black uppercase tracking-wide text-transparent">
                    Let&apos;s Get Started!
                </h2>
                <h4 className="text-center text-2xl font-black uppercase tracking-wide text-white">First, Pick a sign-in option</h4>
            </div>
            <div className="flex gap-4">
                <button onClick={() => void signIn('google')} className="mt-4 flex items-center gap-3 rounded-md bg-slate-900 p-2 px-3 font-semibold text-white">
                    <FcGoogle className="h-8 w-8" />
                    Google
                </button>
                <button onClick={() => void signIn('discord')} className="mt-4 flex items-center gap-3 rounded-md bg-slate-900 p-2 px-3 font-semibold text-white">
                    <FaDiscord className="h-8 w-8" />
                    Discord
                </button>
            </div>
        </div>
    );
};

const WelcomeBack = ({ username }) => {
    const router = useRouter();

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div>
                <h2 className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-center text-2xl font-black uppercase tracking-wide text-transparent">
                    Welcome Back, {username}
                </h2>
                <h4 className="text-center text-2xl font-black uppercase tracking-wide text-white">Let&apos;s go to your dashboard</h4>
            </div>
            <div className="flex gap-4">
                <Link href="/dashboard">
                    <button className="mt-4 flex items-center gap-3 rounded-md bg-slate-900 p-2 px-3 font-semibold text-white transition-colors duration-200 hover:bg-slate-800">
                        <MdDashboard className="h-8 w-8" />
                        View Dashboard
                    </button>
                </Link>
                <button
                    onClick={() => void signOut()}
                    className="mt-4 flex items-center gap-3 rounded-md bg-slate-900 p-2 px-3 font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
                >
                    <IoIosExit className="h-8 w-8" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
