"use server"

import { db } from "@/db"
import getSession from "@/lib/getSession"
import { CreateHubSchema, hubFormSchema, hubLinkSchema, CreateHubLinkSchema } from "@/lib/validate"

export async function createHub(data: CreateHubSchema) {
    const  session = await getSession();

    if (!session.user) throw new Error("Unauthorized")

    const hubData = hubFormSchema.parse(data);
    const newHub = await db.hub.create({
        data: {
            ...hubData,
            userId: session.user?.id
        }
    });

    return newHub;
}

export async function createHubLink({ hubId, data }: { hubId: string, data: CreateHubLinkSchema}) {
    const  session = await getSession();
    if (!session.user) throw new Error("Unauthorized")

    
    const hub = await db.hub.findUnique({
        where: {
            username: hubId
        },
        select: {
            id: true,
            userId: true
        }
    });

    if (!hub) throw new Error('Hub was not found');
    if (session?.user?.id !== hub.userId) throw new Error('Unauthorized')

    const linkData = hubLinkSchema.parse(data);
    const newLink = await db.hubContent.create({
        data: {
            link: linkData.url,
            title: linkData.title,
            adult: linkData.adult,
            hubId: hub.id
        }
    });

    return newLink;
}
