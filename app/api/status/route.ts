"use server";
import { neon } from "@neondatabase/serverless";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

let response: string;
const sql = neon(`${process.env.DATABASE_URL}`);
const rows2 = await sql`SELECT time FROM url ORDER BY id DESC LIMIT 1`;
const response2 = rows2[0]?.time || null;
const unixdate = Math.floor(Date.now() / 1000);
const allowedtime = unixdate - 120;
const latestime = response2;
let allowed: boolean;
if (latestime <= allowedtime) {
  allowed = true;
} else {
  allowed = false;
}
if (allowed == true) {
  response = `Ready to upload`;
} else {
  response = `Please wait ${latestime - allowedtime} seconds`;
}

export async function GET(request: Request) {
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });
}
