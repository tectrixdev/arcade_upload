"use server";
import { neon } from "@neondatabase/serverless";

export default async function insert(url: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql`INSERT INTO url (url) VALUES (${url})`;
}
