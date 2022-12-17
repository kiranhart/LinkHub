import { type NextPage } from 'next';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>LinkHub</title>
                <meta name="description" content="A home for all your links" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="relative h-full text-center">
                <div className="absolute -top-48 -left-72 z-0 aspect-square h-72 rounded-full bg-red-400 opacity-25 blur-2xl"></div>
                <div className="absolute top-24 -right-24 z-0 aspect-square h-72 rounded-full bg-indigo-400 opacity-25 blur-2xl"></div>
                <div className="absolute -bottom-72  left-72 z-0 aspect-square h-72 rounded-full bg-green-200 opacity-25 blur-2xl"></div>

                <h1 className="mt-12 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-center text-6xl font-black uppercase text-transparent md:text-8xl lg:text-9xl">
                    A home for
                    <br />
                    all
                    <br />
                    your links
                </h1>

                <h4 className="mt-12 font-inter text-xl font-semibold leading-7 tracking-wider">
                    LinkHub is an easy to use solution to share all of your links. <br className="hidden md:block" /> It&apos;s free to get started, so what are you waiting for.
                </h4>

                <button
                    onClick={() => (session?.user ? router.push('/dashboard') : signIn())}
                    className="my-12 rounded-md border-[2px] border-gray-500/25  py-4 px-4 font-inter font-bold transition-all duration-500 hover:bg-gray-600 hover:text-gray-100"
                >{`${session?.user ? 'Go To Dashboard' : 'Get Started!'}`}</button>
            </div>
        </>
    );
};

export default Home;
