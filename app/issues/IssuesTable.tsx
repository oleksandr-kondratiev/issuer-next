import { Issue } from "@prisma/client";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import classnames from "classnames";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  searchParams?: Record<string, unknown>;
}

const IssuesTable = ({ children, searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created At", value: "createdAt" },
  ];

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(({ label, value }) => (
            <Table.ColumnHeaderCell
              key={label}
              className={classnames({
                "hidden md:table-cell": value === "createdAt",
              })}
            >
              <Flex align="center">
                <Link
                  href={{
                    pathname: "/issues",
                    query: { ...searchParams, orderBy: value },
                  }}
                >
                  {label}
                </Link>
                <CaretSortIcon
                  className={classnames({
                    "inline ml-2 text-zinc-300": true,
                    "!text-zinc-900": value === searchParams?.orderBy,
                  })}
                />
              </Flex>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>{children}</Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;
