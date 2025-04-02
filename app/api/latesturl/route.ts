"use server";
import { neon } from "@neondatabase/serverless";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

const sql = neon(`${process.env.DATABASE_URL}`);
const rows = await sql`SELECT url FROM url ORDER BY id DESC LIMIT 1`;
const response = rows[0]?.url || null;

export async function GET(request: Request) {
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
