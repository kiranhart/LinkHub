"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import getSession from "@/lib/getSession"

export async function deleteHub({ username }: { username: string }) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const hub = await db.hub.findUnique({
        where: {
            username
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


export async function updateHubDisplayName({ username, newDisplayName }: {  username: string, newDisplayName: string}) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const hub = await db.hub.findUnique({
        where: {
            username
        }
    })

    if (!hub) throw new Error("Hub not found");
    if (hub.userId !== session.user?.id) throw new Error("Unauthorized");

    const updatedHub = await db.hub.update({
        data: {
            name: newDisplayName
        },
        where: {
            username
        }
    })


    return updatedHub;
}


export async function updateHubUsername({ username, newUsername }: {  username: string, newUsername: string}) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const hub = await db.hub.findUnique({
        where: {
            username
        }
    })

    if (!hub) throw new Error("Hub not found");
    if (hub.userId !== session.user?.id) throw new Error("Unauthorized");

    const updatedHub = await db.hub.update({
        data: {
            username: newUsername
        },
        where: {
            username
        }
    })

    if (!updatedHub)
        throw new Error("Hub username is taken")


    return updatedHub;
}