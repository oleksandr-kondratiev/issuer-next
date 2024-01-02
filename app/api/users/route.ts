import { NextApiRequest } from "next";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = async (_req: NextApiRequest) => {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return NextResponse.json(users, { status: 200 });
};
