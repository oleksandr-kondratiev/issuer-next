import { Flex, Grid, Skeleton } from "@radix-ui/themes";

const LoadingDashboardPage = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <Skeleton className="h-16" />
        <Skeleton className="h-72" />
      </Flex>
      <Skeleton className="h-96" />
    </Grid>
  );
};

export default LoadingDashboardPage;
