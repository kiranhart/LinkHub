import { api } from '../../utils/api';
import Link from 'next/link';
import type { NextPage } from 'next';

const Dashboard: NextPage = () => {
    const userHubs = api.hub.getHubs.useQuery();

    return (
        <div className={`flex h-screen items-center justify-center bg-gray-200`}>
            {userHubs?.data?.length === 0 && (
                <>
                    <div className="rounded-md bg-white p-12 shadow-md">
                        <h2 className="text-xl font-black">No Hubs</h2>
                        <div className="text-3xl">Let&apos;s create your first hub</div>
                        <button className="mt-2 rounded-md bg-black px-8 py-3 font-bold tracking-wide text-white">
                            <Link href="/dashboard/create-hub">Create Hub</Link>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
