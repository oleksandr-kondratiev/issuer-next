import Link from "@/app/components/Link";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssuesActions from "./IssuesActions";
import IssuesTable from "./IssuesTable";
import { Pagination } from "../components";

interface IssueListParams extends Record<string, unknown> {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
interface Props {
  searchParams: IssueListParams;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = ["title", "status", "createdAt"].includes(
    searchParams.orderBy
  )
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;

  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div>
      <IssuesActions />
      <IssuesTable searchParams={searchParams}>
        {issues.map(({ id, title, status, createdAt }) => (
          <Table.Row key={id}>
            <Table.ColumnHeaderCell>
              <Link href={`/issues/${id}`}>{title}</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <IssueStatusBadge status={status} />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {createdAt.toLocaleString()}
            </Table.ColumnHeaderCell>
          </Table.Row>
        ))}
      </IssuesTable>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemsCount={issueCount}
      />
    </div>
  );
};

export default IssuesPage;
