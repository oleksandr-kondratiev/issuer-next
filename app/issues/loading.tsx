import { Skeleton, Table } from "@radix-ui/themes";
import React from "react";
import IssuesActions from "./IssuesActions";
import IssuesTable from "./IssuesTable";

const LoadingIssuePage = () => {
  return (
    <div>
      <IssuesActions />
      <IssuesTable>
        {[1, 2, 3, 4, 5].map((issue) => (
          <Table.Row key={issue}>
            <Table.ColumnHeaderCell>
              <Skeleton />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Skeleton />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Skeleton />
            </Table.ColumnHeaderCell>
          </Table.Row>
        ))}
      </IssuesTable>
    </div>
  );
};

export default LoadingIssuePage;
