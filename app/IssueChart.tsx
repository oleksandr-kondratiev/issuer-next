"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  done: number;
  inProgress: number;
}

const IssueChart = ({ open, done, inProgress }: Props) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={[
            { label: "Open Issues", value: open },
            { label: "In Progress Issues", value: inProgress },
            { label: "Done Issues", value: done },
          ]}
        >
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
