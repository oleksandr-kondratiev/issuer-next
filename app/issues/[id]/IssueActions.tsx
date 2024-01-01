import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  issueId: number | string;
}

const IssueActions = ({ issueId }: Props) => {
  return (
    <Box>
      <Link href={`/issues/${issueId}/edit`}>
        <Button>
          <Pencil2Icon />
          Edit Issue
        </Button>
      </Link>
    </Box>
  );
};

export default IssueActions;
