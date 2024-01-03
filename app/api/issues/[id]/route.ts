import nextAuthOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/constants/validation-schemas.constants";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Route {
  params: { id: string };
}

export const PATCH = async (req: NextRequest, { params }: Route) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { assignedUserId, title, description } = body;

  if (assignedUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedUserId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  }

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedUserId },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
};

export const DELETE = async (_req: NextRequest, { params }: Route) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({ where: { id: issue.id } });

  return NextResponse.json({ success: true }, { status: 200 });
};
