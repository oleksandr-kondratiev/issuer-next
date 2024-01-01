import { Box, Skeleton } from "@radix-ui/themes";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton className="mb-4" />
      <Skeleton />
    </Box>
  );
};

export default LoadingNewIssuePage;
