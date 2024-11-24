import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export async function GET(req: NextRequest) {
    //console.log("process.env.SENDGRID_API_KEY", process.env.SENDGRID_API_KEY);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    const res = sgMail.send({
        to: "onaga.ray@gmail.com",
        from: "ronaga@bridgesforpeace.com",
        subject: "Hello, world",
        text: "Hello, world",
    });
    console.log("res", res);
    return new NextResponse("Hello, this is the LINE API route" + process.env.SENDGRID_API_KEY + JSON.stringify(res), {
        status: 200,
    });
}

export async function POST(req: NextRequest) {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
        const res = sgMail.send({
            to: "onaga.ray@gmail.com",
            from: "ronaga@bridgesforpeace.com",
            subject: "Hello, world1",
            text: "Hello, world",
        });
        const body = await req.json();
        const { eventData } = body;

        if (!eventData) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 200 });
        }
        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
        const res2 = sgMail.send({
            to: "onaga.ray@gmail.com",
            from: "ronaga@bridgesforpeace.com",
            subject: "Hello, world2",
            text: JSON.stringify(eventData),
        });
        const res3 = sgMail.send({
            to: "onaga.ray@gmail.com",
            from: "ronaga@bridgesforpeace.com",
            subject: "Hello, world3",
            text: JSON.stringify(res2),
        });
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
