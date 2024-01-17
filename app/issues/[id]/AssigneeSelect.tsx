"use client";

import { ErrorMessage } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select, Text } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";

interface Props {
  issue: Issue;
}

const useUsers = () => {
  return useSWR<User[]>(
    ["users"],
    () => axios.get("/api/users").then((res) => res.data),
    {
      revalidateIfStale: false,
    }
  );
};

const patchIssueAssignedUser = async (
  issueId: string | number,
  userId: string
) => {
  try {
    await axios.patch(`/api/issues/${issueId}`, {
      assignedUserId: userId === "null" ? null : userId,
    });

    toast.success("Issue assigned user updated.");
  } catch (error) {
    toast.error("Not able to update issue assigned user.");
  }
};

const AssigneeSelect = ({ issue }: Props) => {
  const { data: users, error, isLoading } = useUsers();

  const assigneeUser = async (userId: string) => {
    await patchIssueAssignedUser(issue.id, userId);
  };

  return (
    <>
      <Text as="p" size="2">
        Assigned user:
      </Text>
      <Select.Root
        disabled={!!error || isLoading}
        defaultValue={issue.assignedUserId || "null"}
        onValueChange={assigneeUser}
      >
        <Select.Trigger />
        {error && <ErrorMessage>Not able to load users.</ErrorMessage>}
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassign</Select.Item>
            {users?.map(({ id, name }) => (
              <Select.Item key={id} value={id}>
                {name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
