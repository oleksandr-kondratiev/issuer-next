import nextAuthOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Route {
  params: { id: string };
}

export const POST = async (req: NextRequest, { params }: Route) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { lastVisited } = await req.json();

  if (!lastVisited) {
    return NextResponse.json({ error: "lastVisited is required" }, { status: 400 });
  };

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { lastVisited },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
};
