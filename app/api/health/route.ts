import { NextResponse } from "next/server";
import { testDatabaseConnection } from "@/db/index";

export async function GET() {
    const dbTest = await testDatabaseConnection();

    return NextResponse.json({
        status: dbTest.success ? "healthy" : "unhealthy",
        database: dbTest,
        environment: {
            hasOpenAiKey: !!process.env.OPENAI_API_KEY,
            hasDatabaseUrl: !!process.env.DATABASE_URL,
            hasClerkKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
            hasImageKitKey: !!process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        },
        timestamp: new Date().toISOString(),
    });
}
