import prisma from "@/prisma/client";
import { Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueActions from "./IssueActions";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const id = parseInt(params.id);

  if (typeof id !== "number") {
    notFound();
  }

  const issue = await prisma.issues.findUnique({ where: { id } });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="6">
      <IssueDetails issue={issue} />
      <IssueActions issueId={issue.id} />
    </Grid>
  );
};

export default IssueDetailsPage;
