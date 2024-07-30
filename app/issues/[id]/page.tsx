import prisma from "@/prisma/client";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssue from "./DeleteIssue";
import EditIssue from "./EditIssue";
import IssueDetails from "./IssueDetails";
import ShareIssue from "./ShareIssue";
import { cache } from "react";
import DownloadIssue from "./DownloadIssue";

interface Props {
  params: { id: string };
}

const fetchIssue = cache(async (issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
    include: { assignedUser: true },
  })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const id = parseInt(params.id);

  if (typeof id !== "number") {
    notFound();
  }

  const issue = await fetchIssue(id);

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
          <Flex direction="column" gap="2">
            <AssigneeSelect issue={issue} />
          </Flex>
          <Flex direction="column" gap="2">
            <Text as="p" size="2">
              Actions:
            </Text>
            <EditIssue issueId={issue.id} />
            <DownloadIssue issue={issue} />
            <ShareIssue />
            <DeleteIssue issueId={issue.id} />
          </Flex>
        </Flex>
      </Box>
    </Grid>
  );
};

export const generateMetadata = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: `Issue Tracker - ${issue?.title}`,
    description: issue?.description,
    openGraph: {
      images: [{ url: "https://i.ytimg.com/vi/wnXA7rp8KJ4/maxresdefault.jpg" }],
    },
    metadataBase: new URL("https://issuer-next.vercel.app/"),
  };
};

export default IssueDetailsPage;
