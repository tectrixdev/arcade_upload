"use server";
import { neon } from "@neondatabase/serverless";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export async function GET(request: Request) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const rows = await sql`SELECT time FROM url ORDER BY id DESC LIMIT 1`;
  const response = rows[0]?.time || null;
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });
}
