"use client";

import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { useReportWebVitals } from "next/web-vitals";
import axios from "axios";

interface Props {
  issue: Issue;
}

const IssueDetails = ({ issue }: Props) => {
  useReportWebVitals(() => {
      const url = `/api/issues/${issue.id}/visited`;
      const body = { lastVisited: new Date().toISOString() };

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, JSON.stringify(body));
    } else {
      axios.post(url, body);
    }
  });

  return (
    <>
      <Heading as="h2">{issue.title}</Heading>
      <Flex gap="3" my="3" align="center">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toLocaleString()}</Text>
        {issue.lastVisited && (
          <Text size="1">(Last Visited: {issue.lastVisited.toLocaleString()})</Text>
        )}
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
