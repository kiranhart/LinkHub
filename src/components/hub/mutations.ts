import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteHub } from './actions';
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