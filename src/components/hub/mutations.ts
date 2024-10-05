import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteHub, updateHubBio, updateHubContentOrder, updateHubDisplayName, updateHubUsername, deleteContent, updateHubContentStyle, updateHubBackgroundType } from './actions';
import { usePathname, useRouter } from 'next/navigation';
import { Hub } from '@prisma/client';

export function useDeleteHubMutation() {
    const queryClient = useQueryClient();

    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: deleteHub,
        onSuccess: (deletedHub) => {
            const queryFilter: QueryFilters = { queryKey: ['dashboard']}
            queryClient.invalidateQueries(queryFilter)
            toast.success("Successfully deleted Hub")
            
            // redirect if in hub editor
            if (pathname.includes(`/u/hub/${deletedHub.username}`))
                router.push('/u')
        },
        onError(error) {
            console.log(error);
            toast.error('Failed to delete Hub. Please try again')
        }
    })

    return mutation;
}

export function useDeleteHubContentMutation() {
    const queryClient = useQueryClient();

    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: deleteContent,
        onSuccess: (deletedContent) => {
            const queryFilter: QueryFilters = { queryKey: ['hub', 'hub-content']}
            queryClient.invalidateQueries(queryFilter)
            toast.success("Successfully deleted content")
        },
        onError(error) {
            console.log(error);
            toast.error('Failed to delete content. Please try again')
        }
    })

    return mutation;
}

export function useUpdateHubDisplayName() {
    const queryClient = useQueryClient();

    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: updateHubDisplayName,
        onSuccess: (updatedHub) => {
            const queryFilter: QueryFilters = { queryKey: ['hub-edit', 'hub-data']}
            queryClient.invalidateQueries(queryFilter)
            toast.success("Successfully changed display name")      
        },
        onError(error) {
            console.log(error);
            toast.error('Failed to update display name. Please try again')
        }
    })

    return mutation;
}

// updateHubBackgroundType
export function useUpdateHubContentStyle() {
    const queryClient = useQueryClient();

    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: updateHubContentStyle,
        onSuccess: (updatedHub) => {
            const queryFilter: QueryFilters = { queryKey: ['hub', 'hub-data']}
            queryClient.invalidateQueries(queryFilter)
            toast.success("Successfully changed content style")      
        },
        onError(error) {
            console.log(error);
            toast.error('Failed to update style. Please try again')
        }
    })

    return mutation;
}


export function useUpdateHubBackgroundType() {
    const queryClient = useQueryClient();

    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: updateHubBackgroundType,
        onSuccess: (updatedHub) => {
            const queryFilter: QueryFilters = { queryKey: ['hub', 'hub-data']}
            queryClient.invalidateQueries(queryFilter);
            toast.success("Successfully changed background style")      
        },
        onError(error) {
            console.log(error);
            toast.error('Failed to update background. Please try again')
        }
    })

    return mutation;
}

export function useUpdateHubBio() {
    const queryClient = useQueryClient();

    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: updateHubBio,
        onSuccess: (updatedHub) => {
            const queryFilter: QueryFilters = { queryKey: ['hub-edit', 'hub-data']}
            queryClient.invalidateQueries(queryFilter)
            toast.success("Successfully changed description")      
        },
        onError(error) {
            console.log(error);
            toast.error('Failed to update description. Please try again')
        }
    })

    return mutation;
}

export function useUpdateHubUsername() {
    const queryClient = useQueryClient();

    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: updateHubUsername,
        onSuccess: (updatedHub) => {
            const queryFilter: QueryFilters = { queryKey: ['hub-edit', 'hub-data']}
            queryClient.invalidateQueries(queryFilter)
            router.push(`/u/hub/${updatedHub.username}/settings#username`)
            toast.success("Successfully changed hub username")      
        },
        onError(error) {
            toast.error('Hub username taken, try another name.')
        }
    })

    return mutation;
}

export function useUpdateHubContentOrder() {
    const queryClient = useQueryClient();

    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: updateHubContentOrder,
        onSuccess: (updatedHub) => {
            const queryFilter: QueryFilters = { queryKey: ['hub-edit', 'hub-data']}
            queryClient.invalidateQueries(queryFilter)
        },
        onError(error) {
            toast.error('something went wrong while updating link order.')
        }
    })

    return mutation;
}