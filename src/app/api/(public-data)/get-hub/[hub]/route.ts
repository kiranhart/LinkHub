import { db } from "@/db";
import { organizeHubContentOrder, removeKeys } from "@/lib/utils";

export async function GET(
    request: Request,
    { params }: { params: { hub: string } }
) {
    try {
        const hubUsername = params.hub.toLowerCase();
        var hub = await db.hub.findUnique({
            where: {
                username: hubUsername
            },
            include: {
                content: {
                    where: {
                        active: true
                    },
                    select: {
                        id: true,
                        type: true,
                        title: true,
                        link: true,
                        adult: true
                    }
                }
            }
        })
    
        if (!hub) return Response.json({ error: 'Hub not found'}, { status: 404 });
        if (!hub.public) return Response.json({error: "Hub is not open to public"}, {status: 401})

        const keysToRemove = ['userId', 'updatedAt', 'createdAt'] as const;
        hub = removeKeys(hub, keysToRemove)

        // organize the content-order 
        const content = hub?.contentOrder == null ? hub.content : organizeHubContentOrder(hub.content, hub.contentOrder)
        hub['content'] = content;

        return Response.json(hub);

    } catch(error) {
        console.error(error);
        return Response.json({ error: "Internal server error"}, { status: 500})
    }
}