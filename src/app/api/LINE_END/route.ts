import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { events } = req.body;

    if (!events || events.length === 0) {
        return res.status(400).json({ message: "No events found in request body" });
    }

    const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

    if (!channelAccessToken) {
        return res.status(500).json({ message: "Missing channel access token" });
    }

    try {
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
            return res.status(response.status).json({ message: "Error from LINE API", error: errorData });
        }

        const data = await response.json();
        return res.status(200).json({ message: "Message sent successfully", data });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export default handler;
