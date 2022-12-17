import { generateSlug as generateWordSlug } from 'random-word-slugs';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { CreateShortLinkInput } from '../schema/short-link-schema';
import { trpc } from '../utils/trpc';

const NewShortLinkForm: React.FC = () => {
    const {
        handleSubmit,
        register,
        setValue,
        setError,
        formState: { errors },
    } = useForm<CreateShortLinkInput>();

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const { mutate, error } = trpc.shortLinks.createLink.useMutation({
        onSuccess: () => {
            router.push('/dashboard');
            setLoading(false);
        },
    });

    const generateSlug = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const slug = generateWordSlug();
        setValue('slug', slug);
    };

    const processSubmit = (values: CreateShortLinkInput) => {
        if (values.slug === values.url) {
            return;
        }

        setLoading(true);
        mutate(values);
    };

    return (
        <form onSubmit={handleSubmit(processSubmit)} className="">
            <h2 className="mb-4 text-4xl font-black text-gray-500">New Short Link</h2>
            <div className="flex flex-col gap-2">
                <input
                    id="url"
                    className="rounded-md border-2  border-gray-500/25 py-2 px-4 focus:outline-none"
                    type="text"
                    placeholder="Enter URL"
                    {...register('url', {
                        required: {
                            value: true,
                            message: 'Please enter a URL.',
                        },
                        pattern: {
                            value: /^https?:\/\//i,
                            message: 'Please enter a valid URL.',
                        },
                    })}
                />
                <input
                    id="description"
                    className="rounded-md border-2  border-gray-500/25 py-2 px-4 focus:outline-none"
                    type="text"
                    placeholder="Enter Description"
                    {...register('description')}
                />
                <div className="flex justify-between gap-2">
                    <div className="flex gap-2">
                        <div>
                            <input
                                id="slug"
                                className="rounded-md border-2 border-gray-500/25 py-2 px-4 focus:outline-none"
                                type="text"
                                placeholder="Enter Slug"
                                {...register('slug', {
                                    required: {
                                        value: true,
                                        message: 'Please enter a slug or generate one',
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_-]+$/i,
                                        message: 'Please enter a valid slug',
                                    },
                                })}
                            />
                            <p className="font-bold tracking-wide text-red-500">{error && 'Slug already in use'}</p>
                        </div>
                        <button onClick={generateSlug} className="rounded-md bg-gray-500 py-2 px-4 font-satoshi font-bold text-gray-200">
                            Randomize
                        </button>
                    </div>
                    <button type="submit" isLoading={loading} loadingText="Creating your link..." className="rounded-md bg-gray-500 py-2 px-4 font-satoshi font-bold text-gray-200">
                        Create Link
                    </button>
                </div>
            </div>
        </form>
    );
};

export default NewShortLinkForm;
