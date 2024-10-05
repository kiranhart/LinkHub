"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import getSession from "@/lib/getSession"
import { ContentStyle, BackgroundStyle } from "@/types/types";
import { Prisma } from "@prisma/client";

export async function deleteHub({ username }: { username: string }) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const hub = await db.hub.findUnique({
        where: {
            username: username.toLowerCase()
        }
    })

    if (!hub) throw new Error("Hub not found");
    if (hub.userId !== session.user?.id) throw new Error("Unauthorized");
   
    const deletedHub = await db.hub.delete({
        where: {
            username
        },
    });

    return deletedHub;
}


export async function deleteContent({ contentId }: { contentId: string}) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const content = await db.hubContent.findUnique({
        where: {
            id: contentId
        }
    })

    if (!content) throw new Error("Hub content not found");
    if (content.userId !== session.user?.id) throw new Error("Unauthorized");
   
    const deletedContent = await db.hubContent.delete({
        where: {
            id: contentId
        },
    });

    return deletedContent;
}

export async function updateHubDisplayName({ username, newDisplayName }: {  username: string, newDisplayName: string}) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const hub = await db.hub.findUnique({
        where: {
            username: username.toLowerCase()
        }
    })

    if (!hub) throw new Error("Hub not found");
    if (hub.userId !== session.user?.id) throw new Error("Unauthorized");

    const updatedHub = await db.hub.update({
        data: {
            name: newDisplayName
        },
        where: {
            username: username.toLowerCase()
        }
    })


    return updatedHub;
}

export async function updateHubBio({ username, bio }: {  username: string, bio: string}) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const hub = await db.hub.findUnique({
        where: {
            username: username.toLowerCase()
        }
    })

    if (!hub) throw new Error("Hub not found");
    if (hub.userId !== session.user?.id) throw new Error("Unauthorized");

    const updatedHub = await db.hub.update({
        data: {
            description: bio
        },
        where: {
            username: username.toLowerCase()
        }
    })


    return updatedHub;
}

export async function updateHubUsername({ username, newUsername }: {  username: string, newUsername: string}) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const hub = await db.hub.findUnique({
        where: {
            username: username.toLowerCase()
        }
    })

    if (!hub) throw new Error("Hub not found");
    if (hub.userId !== session.user?.id) throw new Error("Unauthorized");

    try {
        const updatedHub = await db.hub.update({
            data: {
                username: newUsername.toLowerCase()
            },
            where: {
                username: username.toLowerCase()
            }
        })

        return updatedHub;
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                console.error("Tried to rename hub username to existing username")
                return;
            }
        }
        throw error
    }

}

export async function updateHubContentOrder({ username, newOrder }: {  username: string, newOrder: string}) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const hub = await db.hub.findUnique({
        where: {
            username: username.toLowerCase()
        }
    })

    if (!hub) throw new Error("Hub not found");
    if (hub.userId !== session.user?.id) throw new Error("Unauthorized");

    const updatedHub = await db.hub.update({
        data: {
            contentOrder: newOrder
        },
        where: {
            username: username.toLowerCase()
        }
    })


    return updatedHub;
}

export async function updateHubContentStyle({ username, contentStyle }: {  username: string, contentStyle: ContentStyle}) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const hub = await db.hub.findUnique({
        where: {
            username: username.toLowerCase()
        }
    })

    if (!hub) throw new Error("Hub not found");
    if (hub.userId !== session.user?.id) throw new Error("Unauthorized");

    const updatedHub = await db.hub.update({
        data: {
            buttonType: contentStyle
        },
        where: {
            username: username.toLowerCase()
        }
    })


    return updatedHub;
}

export async function updateHubBackgroundType({ username, bgType }: {  username: string, bgType: BackgroundStyle}) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const hub = await db.hub.findUnique({
        where: {
            username: username.toLowerCase()
        }
    })

    if (!hub) throw new Error("Hub not found");
    if (hub.userId !== session.user?.id) throw new Error("Unauthorized");

    const updatedHub = await db.hub.update({
        data: {
            backgroundType: bgType
        },
        where: {
            username: username.toLowerCase()
        }
    })


    return updatedHub;
}

export async function canUserAccessHub({ username } : { username: string}) {
    const session = await getSession();
    if (!session.user) return false
    
    const hub = await db.hub.findUnique({
        where: {
            username: username.toLowerCase()
        }
    })

    if (!hub) return false
    return hub.userId === session.user?.id
}