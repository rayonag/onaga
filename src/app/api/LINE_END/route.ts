import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import * as line from "@line/bot-sdk";

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
    const client = new line.messagingApi.MessagingApiClient({
        channelAccessToken: "QVoOGRhBELfvPm5AbscJ5XUsIxZlkG+4gqxp+21yTU4rZ3ppM+rkjTH42ZbfOjW+gTbLBsO1dylO6E9eI3golVmRqnpeBPiK4e1kP2Glu2vil9m04RNBPpeRZq0Sqy1kAE9yw1Sm2XBHsYbLsvP6PgdB04t89/1O/w1cDnyilFU=",
    });
    line.middleware({
        channelSecret: "9288af5cc951aaa9cd410f344f8b45a4",
    });
    // send reply message
    client.replyMessage({
        replyToken: "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
        messages: [
            {
                type: "text",
                text: "Hello, user",
            },
            {
                type: "text",
                text: "May I help you?",
            },
        ],
    });

    return new NextResponse("Hello, this is the LINE API route" + process.env.SENDGRID_API_KEY + JSON.stringify(res), {
        status: 200,
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { events } = body;

        if (!events || events.length === 0) {
            return NextResponse.json({ message: "No events found in request body" }, { status: 400 });
        }

        const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

        if (!channelAccessToken) {
            return NextResponse.json({ message: "Missing channel access token" }, { status: 500 });
        }

        const event = events[0];
        const userId = event.source.userId;

        const response = await fetch("https://api.line.me/v2/bot/message/push", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${channelAccessToken}`,
            },
            body: JSON.stringify({
                to: userId,
                messages: [
                    {
                        type: "text",
                        text: `Hello, your user ID is ${userId}`,
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ message: "Error from LINE API", error: errorData }, { status: response.status });
        }

        const data = await response.json();

        // sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
        // const res = sgMail.send({
        //     to: "onaga.ray@gmail.com",
        //     from: "ronaga@bridgesforpeace.com",
        //     subject: "Hello, world1",
        //     text: "Hello, world",
        // });
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
        // const res2 = sgMail.send({
        //     to: "onaga.ray@gmail.com",
        //     from: "ronaga@bridgesforpeace.com",
        //     subject: "Hello, world2",
        //     text: JSON.stringify(eventData),
        // });
        // const res3 = sgMail.send({
        //     to: "onaga.ray@gmail.com",
        //     from: "ronaga@bridgesforpeace.com",
        //     subject: "Hello, world3",
        //     text: JSON.stringify(res2),
        // });
        // const response = await fetch("https://api.line.me/v2/bot/message/push", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${channelAccessToken}`,
        //     },
        //     body: JSON.stringify({
        //         to: eventData.source.userId,
        //         messages: [
        //             {
        //                 type: "text",
        //                 text: "Hello, world1",
        //             },
        //             {
        //                 type: "text",
        //                 text: "Hello, world2",
        //             },
        //         ],
        //     }),
        // });

        // if (!response.ok) {
        //     const errorData = await response.json();
        //     return NextResponse.json({ message: "Error from LINE API", error: errorData }, { status: response.status });
        // }

        // const data = await response.json();
        return NextResponse.json({ message: "Message sent successfully", data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}
