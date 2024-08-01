"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { hubFormSchema } from "@/lib/validate"
import { Hub } from "@prisma/client"
import { z } from "zod"

export async function createHub({ hub } : Hub) {
    const session = await auth();
    if (!session) return { error: 'Not authorized' }

    try {
        const data = await db.hub.create({
            data: JSON.stringify(hub)
        });

        return { data }

    } catch (error) {
        return {
            error: error
        }
    }
}

export async function getHubs() {
    const session = await auth();
    if (!session) return { error: 'Not authorized' }

    try {
        const data = await db.hub.findMany({
            where: {
                userId: {
                    equals: session?.user?.id
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