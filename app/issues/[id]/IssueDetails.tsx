import { IssueStatusBadge } from "@/app/components";
import { Issues } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

interface Props {
  issue: Issues;
}

const IssueDetails = ({ issue }: Props) => {
  return (
    <>
      <Heading as="h2">{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toLocaleDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
