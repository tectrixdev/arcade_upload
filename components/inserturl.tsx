"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function insert(url: string) {
  const unixtime = Math.floor(Date.now() / 1000);
  await sql`INSERT INTO url (url, time) VALUES (${url}, ${unixtime})`;
}
