"use server"

import { db } from "@/db"
import getSession from "@/lib/getSession"
import { CreateHubSchema, hubFormSchema, hubLinkSchema, CreateHubLinkSchema, CreateHubHeaderSchema, hubHeaderSchema } from "@/lib/validate"

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
            username: hubId.toLowerCase()
        },
        select: {
            id: true,
            userId: true,
            contentOrder: true
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
            hubId: hub.id,
            userId: session?.user?.id
        }
    });

    const newContentOrder = hub.contentOrder + '|' + newLink.id;
    await db.hub.update({
        where: {
            username: hubId.toLowerCase()
        },
        data: {
            contentOrder: newContentOrder
        }
    })

    return newLink;
}


export async function createHubHeader({ hubId, data }: { hubId: string, data: CreateHubHeaderSchema}) {
    const  session = await getSession();
    if (!session.user) throw new Error("Unauthorized")

    
    const hub = await db.hub.findUnique({
        where: {
            username: hubId.toLowerCase()
        },
        select: {
            id: true,
            userId: true,
            contentOrder: true
        }
    });

    if (!hub) throw new Error('Hub was not found');
    if (session?.user?.id !== hub.userId) throw new Error('Unauthorized')

    const headerData = hubHeaderSchema.parse(data);
    const newHeader = await db.hubContent.create({
        data: {
            title: headerData.title,
            type: 'header',
            hubId: hub.id,
            userId: session?.user?.id
        }
    });

    const newContentOrder = hub.contentOrder + '|' + newHeader.id;
     await db.hub.update({
        where: {
            username: hubId.toLowerCase()
        },
        data: {
            contentOrder: newContentOrder
        }
    })

    return newHeader;
}
