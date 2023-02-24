import { type NextPage } from 'next';
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord } from 'react-icons/fa';
import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import { api } from '../utils/api';

const Home: NextPage = () => {
    const { data: sessionData } = useSession();

    return (
        <>
            <Head>
                <title>LinkHub - A Home For Your Links</title>
                <meta name="description" content="LinkHub - A home for your links" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex h-screen flex-col bg-black bg-dotted-spacing-[40px] bg-dotted-[#2c1c2c]">
                <div className="pt-12">
                    <h1 className="bg-gradient-to-r from-red-500 to-purple-400 bg-clip-text text-center text-7xl font-black uppercase tracking-wide text-transparent">LinkHub</h1>
                    <h3 className="mt-[0.25rem] text-center text-2xl font-bold capitalize tracking-wide text-white">A home for your links</h3>
                </div>
                <div className="flex-1 px-12 text-center">
                    <div className="flex h-full flex-col items-center justify-center">
                        <div>
                            <h2 className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-center text-2xl font-black uppercase tracking-wide text-transparent">
                                Let&apos;s Get Started!
                            </h2>
                            <h4 className="text-center text-2xl font-black uppercase tracking-wide text-white">Firstly, Enter a username</h4>
                        </div>
                        <input
                            className="mt-6 w-full rounded-md border-[2px] border-purple-400 bg-slate-900 py-4 px-4 text-center text-xl font-semibold text-white outline-none focus:outline-none"
                            type="text"
                        />
                        <div>
                            <h3 className="text-md mt-4 font-bold text-white">Sign Up / Login With</h3>
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
                </div>
                <div className="flex h-16 items-center justify-center text-center text-white ">
                    <a target="_blank" href="https://kiranhart.com" rel="noreferrer">
                        Created By{' '}
                        <strong>
                            <span>Kiran Hart</span>
                        </strong>
                    </a>
                </div>

                {/* {sessionData && (
                    <>
                        <br />
                        <button className="inline-block w-auto bg-black py-2 px-3 text-white">
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </button>
                    </>
                )}

                {!sessionData && (
                    <>
                        <br />
                        <button onClick={() => void signIn()} className="inline-block w-auto bg-black py-2 px-3 text-white">
                            Sign In
                        </button>
                    </>
                )} */}
            </main>
        </>
    );
};

export default Home;
