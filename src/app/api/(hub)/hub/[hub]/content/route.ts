import { db } from "@/db";
import getSession from "@/lib/getSession";
import { HubContent } from "@prisma/client";

export async function GET(
    request: Request,
    { params }: { params: { hub: string } }
) {
    try {
        const session = await getSession();

        if (!session || !session.user) {
            return Response.json({ error: 'Unauthorized'}, { status: 401 })
        }
        
        const hubUsername = params.hub.toLowerCase();

        const hub = await db.hub.findUnique({
            where: {
                username: hubUsername
            }, 
            select: {
                userId: true,
                content: true,
                contentOrder: true
            }
        })
    
        if (!hub) return Response.json({ error: 'Hub not found'}, { status: 404 })
        if (hub.userId !== session.user?.id) return Response.json({ error: 'Unauthorized'}, { status: 401 })

        return Response.json({
            content: hub.contentOrder == null ? hub.content : orderObjectsByString(hub.content, hub.contentOrder),
            contentOrder: hub.contentOrder
        });

    } catch(error) {
        console.error(error);
        return Response.json({ error: "Internal server error"}, { status: 500})
    }
}

function orderObjectsByString(arr: HubContent[], orderString: string): HubContent[] {
    // Split the order string into an array of IDs
    const orderArray = orderString.split('|');
    
    // Create a map to store the index of each ID
    const orderMap = new Map<string, number>();
    orderArray.forEach((id, index) => {
        orderMap.set(id, index);
    });

    // Sort the array based on the indices in the orderMap
    return arr.sort((a, b) => {
        const indexA = orderMap.get(a.id);
        const indexB = orderMap.get(b.id);
        if (indexA === undefined || indexB === undefined) {
            return 0; // If the ID is not found in the orderString, keep the original order
        }
        return indexA - indexB;
    });
}