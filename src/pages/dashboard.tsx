import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { type NextPage } from 'next';
import { getServerAuthSession } from '../server/common/get-server-auth-session';
import DashboardLayout from '../layouts/DashboardLayout';
import { trpc } from '../utils/trpc';
import NewShortLinkForm from '../components/NewShortLinkForm';

const AdminPage: NextPage = () => {
    const { data: links, refetch } = trpc.shortLinks.allLinks.useQuery(
        {
            keywords: '',
        },
        {
            queryKey: 'shortLinksFetch',
        }
    );

    const { mutate: deleteShortLink } = trpc.shortLinks.deleteLink.useMutation({
        onSuccess: () =>
            refetch({
                queryKey: 'shortLinksFetch',
            }),
    });

    if (!links) {
        return (
            <div className="mt-8 flex flex-col items-center justify-center">
                <p className="mb-2">Loading your links...</p>
            </div>
        );
    }

    return (
        <DashboardLayout>
            <main className="flex flex-col">
                <div className="w-full">
                    {/* <input type="text" className="w-full rounded-md border-[2px] border-gray-500/25 px-4 py-2 font-satoshi font-bold text-gray-500/75 focus:outline-none" /> */}
                    <NewShortLinkForm />
                </div>
                <div className="mt-4 grid">
                    {links && (
                        <div className="mt-5 grid grid-cols-1 gap-5 truncate sm:grid-cols-2 lg:grid-cols-3">
                            {links?.map((link) => (
                                <div key={link.slug} className="rounded-md bg-white px-5 pt-4 pb-2 shadow-md">
                                    <h3 className="font-inter text-lg font-black tracking-wide text-gray-700">https://linkhub.ca/s/{`${link?.slug}`}</h3>
                                    <div className="truncate">
                                        <p className="text-clip font-inter text-gray-400">{link.url}</p>
                                    </div>
                                    <div className="mt-2 rounded-md bg-sky-100 py-2 px-4 font-medium text-sky-600">ℹ️ {link?.description}</div>
                                    <div className="border-black/15 mt-2 flex justify-between gap-4 border-t-[2px] py-2">
                                        <button className="rounded-md border-[2px] border-gray-500/25 px-4 py-[4px] font-bold text-gray-500">Copy</button>
                                        <div className="flex gap-4">
                                            <button className="rounded-md border-[2px] border-sky-500/50 px-4 py-2 font-bold text-sky-400">Edit</button>
                                            <button
                                                onClick={() => {
                                                    deleteShortLink({
                                                        linkId: link.id,
                                                    });
                                                }}
                                                className="rounded-md border-[2px] border-red-500/50 px-4 py-2 font-bold text-red-400"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};

export default AdminPage;
