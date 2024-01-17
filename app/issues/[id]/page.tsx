import prisma from "@/prisma/client";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssue from "./DeleteIssue";
import EditIssue from "./EditIssue";
import IssueDetails from "./IssueDetails";
import ShareIssue from "./ShareIssue";
import { cache } from "react";
import Head from "next/head";

interface Props {
  params: { id: string };
}

const fetchUser = cache(async (issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const id = parseInt(params.id);

  if (typeof id !== "number") {
    notFound();
  }

  const issue = await fetchUser(id);

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
            <DeleteIssue issueId={issue.id} />
            <ShareIssue issue={issue} />
          </Flex>
        </Flex>
      </Box>
    </Grid>
  );
};

export const generateMetadata = async ({ params }: Props) => {
  const issue = await fetchUser(parseInt(params.id));

  return (
    <>
      <Head>
        <title>{`Issue Tracker - ${issue?.title}`}</title>
        <meta name="description" content={issue?.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Issue Tracker - ${issue?.title}`} />
        <meta property="og:description" content={issue?.description} />
        <meta
          property="og:image"
          content="https://i.ytimg.com/vi/wnXA7rp8KJ4/maxresdefault.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content={`Issue Tracker - ${issue?.title}`}
        />
        <meta property="twitter:description" content={issue?.description} />
        <meta
          property="twitter:image"
          content="https://i.ytimg.com/vi/wnXA7rp8KJ4/maxresdefault.jpg"
        />

        {/* LinkedIn */}
        <meta property="og:title" content={`Issue Tracker - ${issue?.title}`} />
        <meta
          property="og:image"
          content="https://i.ytimg.com/vi/wnXA7rp8KJ4/maxresdefault.jpg"
        />
        <meta property="og:description" content={issue?.description} />
      </Head>
    </>
  );
};

export default IssueDetailsPage;
