import { Box, Card, Flex, Heading, Skeleton, Text } from "@radix-ui/themes";

const LoadingIssueDetailsPage = () => {
  return (
    <Box className="max-w-xl">
      <Heading as="h2">
        <Skeleton className="w-6/12" />
      </Heading>
      <Flex gap="3" my="3">
        <Skeleton className="w-4/12" />
        <Text>
          <Skeleton className="w-4/12" />
        </Text>
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton className="w-full mb-2" />
        <Skeleton className="w-full mb-2" />
        <Skeleton className="w-full" />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailsPage;
