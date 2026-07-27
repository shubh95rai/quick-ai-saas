import { neon } from "@neondatabase/serverless";

// Create a sql connection to the database using the database url
export const sql = neon(process.env.DATABASE_URL);

// this sql function allows us to run sql queries on the database

export async function connectDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS creations (
      id SERIAL PRIMARY KEY,
      prompt TEXT NOT NULL,
      content TEXT NOT NULL,
      type TEXT NOT NULL,
      publish BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );`;

    console.log("✅ Successfully connected to the database!");
  } catch (error) {
    console.log("❌ Error connecting to the database: ", error.message);
    process.exit(1);
  }
}
