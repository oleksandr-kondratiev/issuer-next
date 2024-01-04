import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssue from "./DeleteIssue";
import EditIssue from "./EditIssue";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

export const generateMetadata = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: `Issue Tracker - ${issue?.title}`,
    description: issue?.description,
  };
};

const IssueDetailsPage = async ({ params }: Props) => {
  const id = parseInt(params.id);

  if (typeof id !== "number") {
    notFound();
  }

  const issue = await prisma.issue.findUnique({ where: { id } });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="6">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <EditIssue issueId={issue.id} />
          <DeleteIssue issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
