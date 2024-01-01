import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
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
            <Table.ColumnHeaderCell>{title}</Table.ColumnHeaderCell>
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

export default IssuesPage;
