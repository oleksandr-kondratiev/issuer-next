import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesActions = () => {
  return (
    <div className="mb-6">
      <Button>
        <Link href="issues/new">Create New Issue</Link>
      </Button>
    </div>
  );
};

export default IssuesActions;
