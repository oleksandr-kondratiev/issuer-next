import { issueSchema } from "@/app/validation-schemas.constants";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Route {
  params: { id: string };
}

export const PATCH = async (req: NextRequest, { params }: Route) => {
  const body = await req.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issues.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issues.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
};

export const DELETE = async (_req: NextRequest, { params }: Route) => {
  const issue = await prisma.issues.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issues.delete({ where: { id: issue.id } });

  return NextResponse.json({ success: true }, { status: 200 });
};
