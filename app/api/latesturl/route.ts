"use server";
import { neon } from "@neondatabase/serverless";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

const sql = neon(`${process.env.DATABASE_URL}`);
const rows = await sql`SELECT url FROM url ORDER BY id DESC LIMIT 1`;
const response = rows[0]?.url || null;
// latestime = response2
const rows2 = await sql`SELECT time FROM url ORDER BY id DESC LIMIT 1`;
const response2 = rows2[0]?.time || null;

const unixdate = Math.floor(Date.now() / 1000);

const allowedtime = unixdate - 120;
const latestime = response2;

if (latestime <= allowedtime) {
  console.log("allowed");
  console.log(latestime);
  console.log(allowedtime);
  console.log(allowedtime - latestime);
} else {
  console.log(`cooldown of ${latestime - allowedtime}`);
}

export async function GET(request: Request) {
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
