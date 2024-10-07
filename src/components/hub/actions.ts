"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import getSession from "@/lib/getSession"
import { ContentStyle, BackgroundStyle, BackgroundDirection } from "@/types/types";
import { Prisma } from "@prisma/client";
import ky from 'ky';
import { env } from "process";

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

export async function updateHubColorSettings({ 
    username, 
    backgroundColor,
    backgroundDirection,
    buttonColor,
    buttonTextColor,
    buttonShadowColor,
    textColor
 }: {  
    username: string, 
    backgroundColor: string,
    backgroundDirection: BackgroundDirection,
    buttonColor: string,
    buttonTextColor: string,
    buttonShadowColor: string,
    textColor: string
}) {
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
            backgroundColor,
            backgroundDirection,
            buttonColor,
            buttonTextColor,
            buttonShadowColor,
            textColor
        },
        where: {
            username: username.toLowerCase()
        }
    })


    return updatedHub;
}


export async function updateHubPicture({ 
    username, 
    picture
 }: {  
    username: string, 
    picture: string
}) {
    const session = await getSession();
    if (!session.user) throw new Error("Unauthorized");
    
    const hub = await db.hub.findUnique({
        where: {
            username: username.toLowerCase()
        }
    })

    if (!hub) throw new Error("Hub not found");
    if (hub.userId !== session.user?.id) throw new Error("Unauthorized");
    
    const auth = `Client-ID ${process.env.IMGUR_CLIENT_ID}`;
    const URL = 'https://api.imgur.com/3/image';

    let updated = null;
    
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                Authorization: auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: picture.split(',')[1],  // Remove the "data:image/png;base64," part
                type: 'base64'
            })
        });
    
        const result = await response.json();

        if (!response.ok) {
            console.log('Error:', result);
            throw new Error(result.data.error || `HTTP error! status: ${response.status}`);
        }
    
        console.log('Success:', result);

        updated = await db.hub.update({
            where: { username: username.toLowerCase() },
            data: { 
                picture: result.data.link,
                pictureDeleteHash: result.data.deletehash
            }
        });

        // if (updated && hub.pictureDeleteHash !== undefined) {
        //     const delResponse = await fetch(`https://api.imgur.com/3/image/${hub.pictureDeleteHash}`, {
        //         method: 'POST',
        //         headers: {
        //             Authorization: auth,
        //             'Content-Type': 'application/json'
        //         },
        //     })

        //     if (delResponse.ok) {
        //         console.log('Deleted old image')
        //     }
        // }
    
    } catch (error) {
        console.error('Error in updateHubPicture:', error);
        throw error;
    }
  
    return updated;
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