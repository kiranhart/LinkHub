import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createHub, createHubLink } from '@/components/hub/create/actions';

export function useCreateHubMutation() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createHub,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['dashboard', 'hub-list']})
        },
        onError(error) {
            console.log(error);
            toast.error('Failed to create Hub. Please try again')
        }
    })

    return mutation;
}

export function useCreateHubLinkMutation() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createHubLink,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['hub', 'hub-content']})
        },
        onError(error) {
            console.log(error);
            toast.error('Failed to create link. Please try again')
        }
    })

    return mutation;
}



