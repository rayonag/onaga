"use client";

import React, { useState } from "react";

const SendMessage = () => {
    const [to, setTo] = useState("");
    const [message1, setMessage1] = useState("");
    const [message2, setMessage2] = useState("");
    const [response, setResponse] = useState<any>("null");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const messages = [
            { type: "text", text: message1 },
            { type: "text", text: message2 },
        ];

        try {
            const res = await fetch("/api/route", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ to, messages }),
            });

            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error("Error sending message:", error);
            setResponse({ message: "Error sending message", error });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        To:
                        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Message 1:
                        <input type="text" value={message1} onChange={(e) => setMessage1(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Message 2:
                        <input type="text" value={message2} onChange={(e) => setMessage2(e.target.value)} />
                    </label>
                </div>
                <button type="submit">Send Message</button>
            </form>
            {response && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default SendMessage;
