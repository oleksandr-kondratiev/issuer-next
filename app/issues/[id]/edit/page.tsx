import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";
import { cache } from "react";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const fetchIssue = cache(async (issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const EditIssuePage = async ({ params }: Props) => {
  const id = parseInt(params.id);

  if (typeof id !== "number") {
    notFound();
  }

  const issue = await fetchIssue(id);

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export const generateMetadata = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: `Issue Tracker - Edit ${issue?.title}`,
    description: issue?.description,
  };
};

export default EditIssuePage;
