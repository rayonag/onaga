import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return new NextResponse("Hello, this is the LINE API route", {
        status: 200,
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { eventData } = body;

        if (!eventData) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 200 });
        }

        const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

        if (!channelAccessToken) {
            return NextResponse.json({ message: "Missing channel access token" }, { status: 500 });
        }

        const response = await fetch("https://api.line.me/v2/bot/message/push", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${channelAccessToken}`,
            },
            body: JSON.stringify({
                to: eventData.source.userId,
                messages: [
                    {
                        type: "text",
                        text: "Hello, world1",
                    },
                    {
                        type: "text",
                        text: "Hello, world2",
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ message: "Error from LINE API", error: errorData }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ message: "Message sent successfully", data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}
