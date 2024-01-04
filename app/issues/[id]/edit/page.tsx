import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export const generateMetadata = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: `Issue Tracker - Edit ${issue?.title}`,
    description: issue?.description,
  };
};

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const id = parseInt(params.id);

  if (typeof id !== "number") {
    notFound();
  }

  const issue = await prisma.issue.findUnique({ where: { id } });

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
