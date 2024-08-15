// app/api/manifest/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
    const referer = req.headers.get("referer") || req.url;
    let manifestPath = "";

    if (referer?.includes("/game/vocabs")) {
        manifestPath = path.join(process.cwd(), "public", "manifest/manifest-vocabs.json");
    } else if (referer?.includes("/kakeibo")) {
        manifestPath = path.join(process.cwd(), "public", "manifest/manifest-kakeibo.json");
    } else {
        return NextResponse.json({ error: "Manifest not found" }, { status: 404 });
    }

    const manifest = fs.readFileSync(manifestPath, "utf8");
    return new NextResponse(manifest, {
        headers: { "Content-Type": "application/json" },
    });
}
