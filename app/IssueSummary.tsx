import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "./components";

interface Props {
  open: number;
  done: number;
  inProgress: number;
}

const IssueSummary = ({ open, done, inProgress }: Props) => {
  const statuses: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Done Issues", value: done, status: "DONE" },
  ];

  return (
    <Flex gap="4">
      {statuses.map(({ label, value, status }) => (
        <Card key={label}>
          <Flex direction="column" gap="2">
            <Link href={`/issues?status=${status}`}>{label}</Link>
            <Text size="5" className="font-medium">
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
