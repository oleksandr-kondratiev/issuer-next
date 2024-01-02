import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  issueId: number | string;
}

const EditIssue = ({ issueId }: Props) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button className="w-full">
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssue;
