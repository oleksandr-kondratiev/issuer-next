import prisma from "@/prisma/client";
import { Flex, Grid, Skeleton } from "@radix-ui/themes";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const IssueSummary = dynamic(() => import("./IssueSummary"), {
  ssr: false,
  loading: () => <Skeleton className="h-16" />,
});

const IssueChart = dynamic(() => import("./IssueChart"), {
  ssr: false,
  loading: () => <Skeleton className="h-72" />,
});

const LatestIssues = dynamic(() => import("./LatestIssues"), {
  ssr: false,
  loading: () => <Skeleton className="h-96" />,
});

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Issue Tracker Dashboard. Track your issues easily.",
};

const DashboardPage = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const done = await prisma.issue.count({ where: { status: "DONE" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const props = { open, done, inProgress };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...props} />
        <IssueChart {...props} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default DashboardPage;
