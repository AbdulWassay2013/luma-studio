import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("Missing DATABASE_URL environment variable. Please check your .env.local file.");
}

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql, schema });

/**
 * Test database connection - useful for debugging connection issues
 */
export async function testDatabaseConnection() {
    try {
        const result = await sql`SELECT 1 as connection_test`;
        return { success: true, message: "Database connection successful" };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            success: false,
            message: "Database connection failed",
            error: errorMessage,
        };
    }
}