"use client";

import { normalizeString } from "@/app/helpers/string.helpers";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const STATUSES: Status[] = ["DONE", "IN_PROGRESS", "OPEN"];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChangeQueryParams = (status: Status | "all") => {
    const params = new URLSearchParams();

    if (status !== "all") {
      params.append("status", status);
    }

    if (searchParams.get("orderBy")) {
      params.append("orderBy", searchParams.get("orderBy") as string);
    }

    const query = params.size ? `?${params.toString()}` : "";

    router.push(`/issues${query}`);
  };

  return (
    <Select.Root
      onValueChange={handleChangeQueryParams}
      defaultValue={searchParams.get("status") || "all"}
    >
      <Select.Trigger placeholder="Filter by status..." className="w-48" />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Item value="all">All statuses</Select.Item>
          {STATUSES.map((status) => (
            <Select.Item key={status} value={status}>
              {normalizeString(status)}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
