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

const normalizeString = (string: string) => {
  return string
    .split("_")
    .map((word) => word.toLowerCase())
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const IssueStatusBadge = ({ status }: Props) => {
  return <Badge color={getBadgeColor(status)}>{normalizeString(status)}</Badge>;
};

export default IssueStatusBadge;
