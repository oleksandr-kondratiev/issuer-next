import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Avatar, Box, Card, Flex, Heading } from "@radix-ui/themes";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      assignedUser: true,
    },
  });

  return (
    <Card className="w-full">
      <Heading size="4" m="3" mb="5">
        Latest Issues
      </Heading>
      <Box mx="3">
        {issues.map(({ id, title, status, assignedUser }) => (
          <Flex gap="4" justify="between" key={id} mb="3">
            <Flex gap="4" align="center">
              <Avatar
                src={assignedUser?.image as string}
                fallback="?"
                size="2"
                referrerPolicy="no-referrer"
              />
              <Link href={`/issues/${id}`}>{title}</Link>
            </Flex>
            <IssueStatusBadge status={status} />
          </Flex>
        ))}
      </Box>
    </Card>
  );
};

export default LatestIssues;
