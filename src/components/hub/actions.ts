"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import getSession from "@/lib/getSession"
import { Hub } from "@prisma/client"
import { z } from "zod"

export async function getHub({ username }: { username: string}) {
    const session = await auth();
    if (!session) return { error: 'Not authorized' }

    try {
        const data = await db.hub.findFirst({
            where: {
                userId: {
                    equals: session?.user?.id
                },
                username: {
                    equals: username
                }
            },
            include: {
                content: true
            }
        });
        return { data }

    } catch (error) {
        return {
            error: error
        }
    }
}

export async function deleteHub({ username }: { username: String }) {
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
