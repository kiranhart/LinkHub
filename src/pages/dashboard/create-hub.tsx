import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { api } from '../../utils/api';

const CreateHub: NextPage = () => {
    const createHub = api.hub.createHub.useMutation();

    
    return (
        <>
            <Head>
                <title>LinkHub - Create New Hub</title>
            </Head>
            <div className={`flex h-screen flex-col items-center justify-center bg-gray-200`}>
                <h1 className="text-4xl font-black text-black">New Hub</h1>
                <div className="mt-4">
                    <div className="flex flex-col">
                        <label htmlFor="hubid" className="text-lg font-bold">
                            Hub ID
                        </label>
                        <input name="hubid" className="border-2 border-black py-2 px-4 outline-none" type="text" placeholder="Hub Id" />
                    </div>

                    <div className="mt-4 flex flex-col">
                        <label htmlFor="hubname" className="text-lg font-bold">
                            Hub Name
                        </label>
                        <input name="hubname" className="border-2 border-black py-2 px-4 outline-none" type="text" placeholder="Hub Name" />
                    </div>

                    <div className="mt-4 flex flex-col">
                        <label htmlFor="hubdesc" className="text-lg font-bold">
                            Hub Description
                        </label>
                        <textarea name="hubdesc" className="border-2 border-black py-2 px-4 outline-none" type="text" placeholder="Hub Description" />
                    </div>

                    {/* <div className="mt-4 flex flex-row items-center justify-between gap-4">
                        <label htmlFor="hubadult" className="text-lg font-bold">
                            Adult Content
                        </label>
                        <input name="hubadult" className="border-2 border-black py-2 px-4 outline-none" type="checkbox" />
                    </div>

                    <div className="mt-4 flex flex-row items-center justify-between gap-4">
                        <label htmlFor="hubpublic" className="text-lg font-bold">
                            Public
                        </label>
                        <input name="hubadult" className="border-2 border-black py-2 px-4 outline-none" type="checkbox" />
                    </div> */}

                    <div className="mt-4 flex flex-col">
                        <button name="hubdesc" className="border-2 border-black bg-green-800 py-2 px-4 font-semibold tracking-wide text-white outline-none" type="text">
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateHub;
