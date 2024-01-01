import Link from "@/app/components/Link";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssuesActions from "./IssuesActions";
import IssuesTable from "./IssuesTable";

const IssuesPage = async () => {
  const issues = await prisma.issues.findMany();

  return (
    <div>
      <IssuesActions />
      <IssuesTable>
        {issues.map(({ id, title, status, createdAt }) => (
          <Table.Row key={id}>
            <Table.ColumnHeaderCell>
              <Link href={`/issues/${id}`}>{title}</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <IssueStatusBadge status={status} />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {createdAt.toLocaleDateString()}
            </Table.ColumnHeaderCell>
          </Table.Row>
        ))}
      </IssuesTable>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
