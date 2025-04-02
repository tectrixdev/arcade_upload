"use server";
import { neon } from "@neondatabase/serverless";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const rows = await sql`SELECT url FROM url ORDER BY id DESC LIMIT 1`;
  return rows[0]?.url || null;
}
