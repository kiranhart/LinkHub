import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteHub, updateHubDisplayName, updateHubUsername } from './actions';
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

export function useUpdateHubUsername() {
    const queryClient = useQueryClient();

    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: updateHubUsername,
        onSuccess: (updatedHub) => {
            const queryFilter: QueryFilters = { queryKey: ['hub-edit', 'hub-data']}
            queryClient.invalidateQueries(queryFilter)
            router.push(`/u/hub/${updatedHub.username}/settings`)
            toast.success("Successfully changed hub username")      
        },
        onError(error) {
            toast.error('Hub username taken, try another name.')
        }
    })

    return mutation;
}