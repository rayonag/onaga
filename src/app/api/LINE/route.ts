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
        const { prise } = body;
        const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

        const response = await fetch("https://api.line.me/v2/bot/message/push", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${channelAccessToken}`,
            },
            body: JSON.stringify({
                to: "Uec7f366c3f655ac9026b975b924a2b4d", // hard-coded user ID
                messages: [
                    {
                        type: "text",
                        text: `奥さんが${prise}を申請したよ。\nすごいね！大好きな奥さんに忘れずにご褒美をあげよう！`,
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
