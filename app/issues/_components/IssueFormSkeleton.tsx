import { Box, Button, Skeleton } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl space-y-8">
      <Box>
        <Skeleton className="mb-4 h-6" />
        <Skeleton className="h-96" />
      </Box>
      <Button>
        <Skeleton className="w-24" />
      </Button>
    </Box>
  );
};

export default IssueFormSkeleton;
