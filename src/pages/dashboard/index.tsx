import { useRouter } from 'next/router';

const Dashboard: React.FC = () => {
    const router = useRouter();

    return (
        <div className="h-screen w-full bg-slate-50">
            <div className="flex h-32 flex-col justify-center bg-blue-400 px-12">
                <h1 className="text-8xl font-black uppercase tracking-widest text-white">
                    LinkHub - <span className="font-bold">Dashboard</span>
                </h1>
            </div>
            <div className="h-12 flex-col justify-center bg-blue-500 px-12">
                <ul className="inline-block h-full bg-blue-600 hover:bg-blue-700">
                    <li className="flex h-full justify-center text-center">
                        <button className="px-4 font-semibold text-white">New Hub</button>
                    </li>
                </ul>
            </div>
            {/* Hub listing */}
            <div className="p-12">
                <h1 className="text-2xl font-bold">Hubs</h1>
                <hr />
                <form action="" className="mt-4 flex flex-col text-left">
                    <label htmlFor="hubname">Hub Name</label>
                    <input ame="hubname" type="text" className="border-2 border-black py-2 px-4 outline-none" />

                    <label htmlFor="hubdesc">Hub Description</label>
                    <input ame="hubdesc" type="text" className="border-2 border-black py-2 px-4 outline-none" />

                    <div>
                        <input ame="hubpublic" type="checkbox" className="mr-2 inline-block border-2 border-black py-2 px-4 outline-none" />
                        <label htmlFor="hubpublic">Public?</label>
                    </div>

                    <div>
                        <input ame="hubadult" type="checkbox" className="mr-2 inline-block border-2 border-black py-2 px-4 outline-none" />
                        <label htmlFor="hubadult">Adult Content?</label>
                    </div>

                    <div className="inline-block">
                        <button type="submit" className=" bg-green-500 py-2 px-3 text-white">
                            Create
                        </button>
                    </div>
                </form>
            </div>

            {/* No HUBS */}
        </div>
    );
};

export default Dashboard;

// background: white;
// background-image: radial-gradient(black 1px, transparent 0);
// background-size: 40px 40px;
// background-position: -19px -19px;
