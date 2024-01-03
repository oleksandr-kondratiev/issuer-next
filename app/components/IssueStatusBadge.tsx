import { normalizeString } from "@/app/helpers/string.helpers";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

interface Props {
  status: Status;
}

type BadgeColor = "orange" | "blue" | "green";

const getBadgeColor = (status: Status): BadgeColor => {
  switch (status) {
    case "OPEN":
      return "orange";
    case "IN_PROGRESS":
      return "blue";
    case "DONE":
      return "green";
  }
};

const IssueStatusBadge = ({ status }: Props) => {
  return <Badge color={getBadgeColor(status)}>{normalizeString(status)}</Badge>;
};

export default IssueStatusBadge;
