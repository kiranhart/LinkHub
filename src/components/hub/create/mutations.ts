import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createHub, createHubHeader, createHubLink } from '@/components/hub/create/actions';

export function useCreateHubMutation() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createHub,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['dashboard', 'hub-list']})
        },
        onError(error) {
            console.log(error);
            toast.error('That hub username is taken')
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

export function useCreateHubHeaderMutation() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createHubHeader,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['hub', 'hub-content']})
        },
        onError(error) {
            console.log(error);
            toast.error('Failed to create header. Please try again')
        }
    })

    return mutation;
}


