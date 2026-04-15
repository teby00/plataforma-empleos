"use server";

import { auth } from "./auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function verifySession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
}
