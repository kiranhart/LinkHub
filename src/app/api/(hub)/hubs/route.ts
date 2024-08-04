import { db } from "@/db";
import getSession from "@/lib/getSession";

export async function GET() {
    try {
        const session = await getSession();

        if (!session || !session.user) {
            return Response.json({ error: 'Unauthorized'}, { status: 401 })
        }
        
        const hubs = await db.hub.findMany({
            where: {
                userId: session.user?.id
            },
            orderBy: {createdAt: "asc"}
        });

        return Response.json(hubs);

    } catch(error) {
        console.error(error);
        return Response.json({ error: "Internal server error"}, { status: 500})
    }
}