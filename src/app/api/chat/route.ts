import { NextResponse } from "next/server";
import { AI_RESPONSES } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const query = (message || "").toLowerCase().trim();

    let matchedResponse = "";
    for (const [key, answer] of Object.entries(AI_RESPONSES)) {
      if (query.includes(key) || key.includes(query)) {
        matchedResponse = answer;
        break;
      }
    }

    if (!matchedResponse) {
      if (query.includes("price") || query.includes("rate") || query.includes("cost")) {
        matchedResponse = AI_RESPONSES["how do you price a project?"];
      } else if (query.includes("speed") || query.includes("performance") || query.includes("slow")) {
        matchedResponse = AI_RESPONSES["can you speed up my existing store?"];
      } else if (query.includes("shopify") || query.includes("headless") || query.includes("hydrogen")) {
        matchedResponse = AI_RESPONSES["what kind of shopify work do you take on?"];
      } else {
        matchedResponse = `Thanks for asking about "${message}". I focus on custom Shopify & Shopify Plus themes, complex integrations, and store performance turnarounds. Drop me a note directly at me@inacionakiti.com!`;
      }
    }

    return NextResponse.json({
      reply: matchedResponse,
      timestamp: new Date().toISOString(),
      location: "Cape Town (SAST UTC+2)",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
