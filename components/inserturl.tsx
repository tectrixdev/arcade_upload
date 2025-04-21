"use server";
import { neon } from "@neondatabase/serverless";
import { useState, useEffect } from "react";
export async function insert(url: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const rows2 = await sql`SELECT time FROM url ORDER BY id DESC LIMIT 1`;
  const response2 = rows2[0]?.time || null;
  const unixdate = Math.floor(Date.now() / 1000);
  const allowedtime = unixdate - 60;
  const latestime = response2;
  let allowed: boolean;
  if (latestime < allowedtime) {
    allowed = true;
  } else {
    allowed = false;
  }
  if (allowed == true) {
    const unixtime = Math.floor(Date.now() / 1000);
    await sql`INSERT INTO url (url, time) VALUES (${url}, ${unixtime})`;
    console.log("project uploaded successfully");
  } else {
    console.log(
      `project not uploaded because of cooldown of ${latestime - allowedtime}`
    );
  }
}
