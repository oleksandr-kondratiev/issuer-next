import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssuesActions = () => {
  return (
    <Flex mb="4" justify="between" align="center">
      <Flex align="center" gap="3">
        <IssueStatusFilter />
      </Flex>
      <Button>
        <Link href="issues/new">Create New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssuesActions;
